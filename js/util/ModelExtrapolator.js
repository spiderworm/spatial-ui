define(
	[
		'../base/Model',
		'../external/ammo',
		'../external/cannon',
		'../util/InstanceStore'
	],
	function(
		Model,
		Ammo,
		CANNON,
		InstanceStore
	) {



		function clone(val) {
			switch(typeof val) {
				case "object":
					if(val === null) {
						return val;
					}
					var result = {};
					if(val instanceof Model) {
						val.$each(function(subval,index) {
							result[index] = clone(subval);
						});
					} else {
						for(var index in val) {
							result[index] = clone(val[index]);
						}
					}
					return result;
				break;
				default:
					return val;
				break;
			}
		}



		var instances = new InstanceStore();

		function Extrapolator(sourceModel,targetModel) {

			var instance = instances.find([targetModel]) || this;
			if(instance !== this) {
				return instance;
			}
			instances.add(this,[targetModel]);

			this._sourceModel = sourceModel;
			this._targetModel = targetModel;

			this._lastStamp = (new Date()).getTime();

			this._smoothing = {};

			var extrapolator = this;

			sourceModel.$subscribeTo(function() {
				extrapolator._lastStamp = (new Date()).getTime();
				var smoothing = {};
				this.$each(function(val,key) {
					if(!targetModel.$hasKey(key)) {
						targetModel[key] = clone(val);
					}
					if(typeof val === "number") {
						var smooth = parseFloat(val-targetModel[key]);
						if(!isNaN(smooth) && smooth !== 0) {
							smoothing[key] = smooth;
						}
					} else if(typeof val !== "object" || val === null) {
						targetModel[key] = val;
					}
				});
				extrapolator._smoothing = smoothing;
				targetModel.$setUpdated(null,extrapolator);
			});

			function doTick() {
				requestAnimationFrame(doTick);
				extrapolator.__tick();
			}

			requestAnimationFrame(doTick);

			targetModel.$subscribeTo(
				function() {
					this.$each(function(subModel,index) {
						if(subModel instanceof Model && sourceModel.$hasKey(index)) {
							new Extrapolator(sourceModel[index],subModel);
						}
					});
				}
			);

		}
		Extrapolator.prototype.__tick = function() {
			var stamp = (new Date()).getTime();
			var seconds = (stamp - this._lastStamp)/1000;

			var extrapolator = this;

			var update = {};

			if(this._targetModel.velocity && this._targetModel.velocity instanceof Model) {

				switch(this._targetModel.velocity.type) {
					case 'rotation':

						var halftime = seconds/2;
						var q1 = new CANNON.Quaternion();
						var q2 = new CANNON.Quaternion();
						var q3 = new CANNON.Quaternion();
						q3.set(this._targetModel.x,this._targetModel.y,this._targetModel.z,this._targetModel.w);

						q1.set(this._targetModel.velocity.x, this._targetModel.velocity.y, this._targetModel.velocity.z, 0);
						q1.mult(q3,q2);
						q3.x += halftime * q2.x;
						q3.y += halftime * q2.y;
						q3.z += halftime * q2.z;
						q3.w += halftime * q2.w;
						q3.normalize();

						update = {
							x: q3.x,
							y: q3.y,
							z: q3.z,
							w: q3.w
						};

					break;
					case 'linear':
					default:

						var keys = this._targetModel.velocity.$getKeys();
						for(var i in keys) {
							if(keys[i] !== "velocity") {
								update[keys[i]] = this._targetModel[keys[i]] + seconds * this._targetModel.velocity[keys[i]];
							}
						}

					break;
				}
			}

				for(var key in this._smoothing) {
					var amt = this._smoothing[key] * 1/30;
					this._smoothing[key] -= amt;
					if(!update.hasOwnProperty(key)) {
						update[key] = this._targetModel[key] || 0;
					}
					update[key] += amt;
				}


			this._targetModel.$update(update,this);

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


		return Extrapolator;
	}
);
