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

var count = 0;


		var instances = new InstanceStore();

		function Extrapolator(sourceModel,clientModel) {
			var instance = instances.find([clientModel]) || this;
			if(instance !== this) {
				return instance;
			}
			instances.add(this,[clientModel]);

if(sourceModel.id === "myShip" && sourceModel.velocity) {
	//debugger;
	clientModel.$onUpdated(function(update,source) {
		if(count < 100 && window.doDebug) {
			count++;
			console.info(update,source);
		}
	});
}

			this._sourceModel = sourceModel;
			this._clientModel = clientModel;

			this._lastStamp = (new Date()).getTime();

			var extrapolator = this;
			function doTick() {
				requestAnimationFrame(doTick);
				extrapolator.__tick();
			}

			requestAnimationFrame(doTick);

			this.enable();
		}
		Extrapolator.prototype.enable = function() {
			var clientModel = this._clientModel;
			var sourceModel = this._sourceModel;

			var extrapolator = this;

			clientModel.$subscribeTo(
				'velocity',
				function(velocity) {

				}
			);

			clientModel.$subscribeTo(
				function() {
					this.$each(function(subModel,index) {
						if(subModel instanceof Model) {
							new Extrapolator(sourceModel[index],subModel);
						}
					});
				}
			);

		}

		Extrapolator.prototype.__tick = function() {
			var stamp = (new Date()).getTime();
			var seconds = (stamp - this._lastStamp)/1000;
			this._lastStamp = stamp;

			var model = this._clientModel;

			if(model.velocity && model.velocity instanceof Model) {

				switch(model.velocity.type) {
					case 'rotation':

						var halftime = seconds/2;
						var q1 = new CANNON.Quaternion();
						var q2 = new CANNON.Quaternion();
						var q3 = new CANNON.Quaternion();
						q3.set(model.x,model.y,model.z,model.w);

						q1.set(model.velocity.x, model.velocity.y, model.velocity.z, 0);
						q1.mult(q3,q2);
						q3.x += halftime * q2.x;
						q3.y += halftime * q2.y;
						q3.z += halftime * q2.z;
						q3.w += halftime * q2.w;
						q3.normalize();

						model.$update(
							{
								x: q3.x,
								y: q3.y,
								z: q3.z,
								w: q3.w
							},
							this
						);

					break;
					case 'linear':
					default:

						var update = {};

						var keys = model.velocity.$getKeys();
						for(var i in keys) {
							if(keys[i] !== "velocity") {
								update[keys[i]] = model[keys[i]] + seconds * model.velocity[keys[i]];
							}
						}

						model.$update(update,this);

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


		return Extrapolator;
	}
);
