define(
	[
		'../base/Model',
		'../external/ammo',
		'../external/cannon'
	],
	function(
		Model,
		Ammo,
		CANNON
	) {

		function Extrapolator() {
			this._lastStamp = (new Date()).getTime();

			this._models = [];

			var extrapolator = this;
			function doTick() {
				requestAnimationFrame(doTick);
				extrapolator.__tick();
			}

			requestAnimationFrame(doTick);
		}
		Extrapolator.prototype.enable = function(model) {

			if(model.__extrapolating) {
				return;
			}

			model.__extrapolating = true;

			var extrapolator = this;

			model.$subscribeTo(
				'velocity',
				function(velocity) {
					if(velocity) {
						extrapolator.__add(model);
					} else {
						extrapolator.__remove(model);
					}
				}
			);

			model.$subscribeTo(
				function() {
					this.$each(function(subModel) {
						if(subModel instanceof Model) {
							extrapolator.enable(subModel);
						}
					});
				}
			);

		}

		Extrapolator.prototype.__add = function(model) {
			if(model.velocity instanceof Model && this._models.indexOf(model) === -1) {
				this._models.push(model);
			}
		}

		Extrapolator.prototype.__remove = function(model) {
			var i = this._models.indexOf(model);
			if(i !== -1) {
				this._models.splice(i,1);
			}
		}

		Extrapolator.prototype.__tick = function() {
			var stamp = (new Date()).getTime();
			var seconds = (stamp - this._lastStamp)/1000;
			this._lastStamp = stamp;
			for(var i in this._models) {
				this.__tickModel(this._models[i],seconds);
			}
		}

		Extrapolator.prototype.__tickModel = function(model,seconds) {
			if(model.velocity && model.velocity instanceof Model) {
				switch(model.velocity.type) {
					case 'quaternion':

						var angleAxis = quatToAngleAxis(model.velocity);
						var velQuat = angleAxisToQuat({angle: angleAxis.angle * seconds *1, axis: angleAxis.axis});
						normalize(velQuat);
						var newQuat = multiplyQuaternions(model,velQuat);
						copyQuaternion(model,newQuat);

					break;
					case 'eulerYPR':




						var w = new CANNON.Quaternion();
						var wq = new CANNON.Quaternion();
						var angularVelo = model.velocity;
						var quat = new CANNON.Quaternion();
						quat.set(model.x,model.y,model.z,model.w);
						var half_dt = seconds/2;
						var quatNormalize = true;
						var quatNormalizeFast = false;


						w.set(angularVelo.x, angularVelo.y, angularVelo.z, 0);
						w.mult(quat,wq);
						quat.x += half_dt * wq.x;
						quat.y += half_dt * wq.y;
						quat.z += half_dt * wq.z;
						quat.w += half_dt * wq.w;
						if(quatNormalize){
							if(quatNormalizeFast){
								quat.normalizeFast();
							} else {
								quat.normalize();
							}
						}


						model.x = quat.x;
						model.y = quat.y;
						model.z = quat.z;
						model.w = quat.w;

					break;
					case 'linear':
					default:
						var keys = model.velocity.$getKeys();
						for(var i in keys) {
							if(keys[i] !== "velocity") {
								model[keys[i]] += seconds * model.velocity[keys[i]];
							}
						}
					break;
				}
			}
		}





		function quatToAngleAxis(quat) {
			var angle, x=0, y=0, z=0;

			if (quat.w > 1) normalize(quat);
			angle = 2 * Math.acos(quat.w);
			var s = Math.sqrt(1-quat.w*quat.w);
			if (s === 0) {
				x = quat.x;
				y = quat.y;
				z = quat.z;
			} else {
				x = quat.x / s;
				y = quat.y / s;
				z = quat.z / s;
			}
			return {
				angle: angle,
				axis: {x: x,y: y,z: z}
			};
		}

		function angleAxisToQuat(angleAxis) {
			return {
				x: Math.sin(angleAxis.angle/2)*angleAxis.axis.x,
				y: Math.sin(angleAxis.angle/2)*angleAxis.axis.y,
				z: Math.sin(angleAxis.angle/2)*angleAxis.axis.z,
				w: Math.cos(angleAxis.angle/2)
			};
		}

		function multiplyQuaternions(a,b) {
			return {
				x: a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y,
				y: a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z,
				z: a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x,
				w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z
			};
		}

		function copyQuaternion(dest,source) {
			dest.x = source.x;
			dest.y = source.y;
			dest.z = source.z;
			dest.w = source.w;
		}


		function normalize(quat) {
			var magnitude = Math.sqrt((quat.x*quat.x)+(quat.y*quat.y)+(quat.z*quat.z)+(quat.w*quat.w));
			quat.x = quat.x/magnitude;
			quat.y = quat.y/magnitude;
			quat.z = quat.z/magnitude;
			quat.w = quat.w/magnitude;
		}


		var extrapolator = new Extrapolator();

		return extrapolator;
	}
);
