define(
	[
		'../base/MockService',
		'external/cannon'
	],
	function(
		MockService,
		CANNON
	) {

		function PhysicsService() {
			MockService.apply(this);

			var physicsTickMS = 1000/30;
			var serviceSendMS = 1000/20;

			var gravitationalConstant = 6.674e-17;
			var gravitationalConstant = 6.674e-19;
			var gravitationalConstant = 0;

			var shipSize = 1000;
			var shipPosition = new CANNON.Vec3(8993129000, 0, 0);
			var shipVelocity = new CANNON.Vec3(0, 0, 0);
			var shipMass = 10000;

			var teaatisSize = 1.2742e7;
			var teaatisMass = 5.97219e+24;
			var teaatisPosition = new CANNON.Vec3(9000000000, 0, 0);
			var teaatisVelocity = new CANNON.Vec3(0, 0, 0);
			var teaatisRotationVector = new CANNON.Vec3(0, 1, 0);
			var teaatisRotationAmount = Math.PI/2;
			var teaatisRotation = new CANNON.Quaternion(
				teaatisRotationVector.x*Math.sin(teaatisRotationAmount/2),
				teaatisRotationVector.y*Math.sin(teaatisRotationAmount/2),
				teaatisRotationVector.z*Math.sin(teaatisRotationAmount/2),
				Math.cos(teaatisRotationAmount/2)
			);
			var teaatisSpin = new CANNON.Vec3(0,.005,0);

			var sunSize = 1.391e9;
			var sunPosition = new CANNON.Vec3(0,0,0);
			var sunMass =  1.98892e+30;

			var moonSize = 100000;
			var moonPosition = new CANNON.Vec3(3844000000, 0, 0);
			var moonMass = 10000000;


			function PhysicsSystem() {
				var system = new CANNON.World();
				system.solver.iterations = 20;
				system.solver.tolerance = 0;
				system.gravity.set(0,0,0);
				system.broadphase = new CANNON.NaiveBroadphase();
				system.defaultContactMaterial.contactEquationStiffness = 1e20;
				system.defaultContactMaterial.contactEquationRegularizationTime = 1;
				return system;
			}


			function PhysicsSun() {
				var shape = new CANNON.Sphere(sunSize/2);
				var body = new CANNON.RigidBody(sunMass,shape);
				body.angularVelocity.set(0,0,0);
				body.position.set(sunPosition.x,sunPosition.y,sunPosition.z);
				return body;
			}

			function PhysicsShip() {
				var shape = new CANNON.Sphere(shipSize);
				var body = new CANNON.RigidBody(shipMass,shape);
				body.angularVelocity.set(0,0,0);
				body.position.set(shipPosition.x,shipPosition.y,shipPosition.z);
				body.addEventListener('collide',function() { console.info('collision'); });
				return body;
			}

			function PhysicsTeaatis() {
				var shape = new CANNON.Sphere(teaatisSize/2);
				var body = new CANNON.RigidBody(teaatisMass,shape);
				body.angularVelocity.set(teaatisSpin.x,teaatisSpin.y,teaatisSpin.z);
				body.position.set(teaatisPosition.x,teaatisPosition.y,teaatisPosition.z);
				body.quaternion.set(teaatisRotation.x,teaatisRotation.y,teaatisRotation.z,teaatisRotation.w);
				return body;
			}





			function SolarSystem(physics) {
				this.physics = new PhysicsSystem();

				this.__objects = [];

				this.__lastStamp = (new Date()).getTime();

				var system = this;
				function doPhysics() {
					system.__tick();
				}

				setInterval(doPhysics,physicsTickMS);
			}
			SolarSystem.prototype.add = function(obj) {
				this.__objects.push(obj);
				this.physics.add(obj.body);
			}
			SolarSystem.prototype.__tick = function() {			
				var stamp = (new Date()).getTime();
				var secs = (stamp - this.__lastStamp)/1000;
				this.__lastStamp = stamp;

				var gravityWells = [];
				for(var i in this.__objects) {
					gravityWells.push(this.__objects[i].getGravityWell());
				}
				for(i in this.__objects) {
					this.__objects[i].applyGravityWells(gravityWells);
					this.__objects[i].tick(secs);
				}

				this.physics.step(secs);

				for(var i in this.__objects) {
					this.__objects[i].update(secs);
				}

			}


			function SystemObject(body,id) {
				this.body = body;
				this.id = id;
			}
			SystemObject.prototype.update = function(seconds) {
				var update = {position: {velocity: {}}, rotation: {velocity: {}}};

				update.position.x = this.body.position.x;
				update.position.y = this.body.position.y;
				update.position.z = this.body.position.z;

				update.position.velocity.x = this.body.velocity.x;
				update.position.velocity.y = this.body.velocity.y;
				update.position.velocity.z = this.body.velocity.z;

				update.rotation.x = this.body.quaternion.x;
				update.rotation.y = this.body.quaternion.y;
				update.rotation.z = this.body.quaternion.z;
				update.rotation.w = this.body.quaternion.w;

				update.rotation.velocity.x = this.body.angularVelocity.x;
				update.rotation.velocity.y = this.body.angularVelocity.y;
				update.rotation.velocity.z = this.body.angularVelocity.z;

				this.__sendUpdate(update);
			}
			SystemObject.prototype.getGravityWell = function() {
				var well = {};
				well.source = this;
				well.position = this.body.position;
				well.mass = this.body.mass;
				return well;
			}
			SystemObject.prototype.applyGravityWells = function(wells) {
				var myPosition = this.body.position;
				var myMass = this.body.mass;
				for(var i in wells) {
					if(wells[i].source === this) {
						continue;
					}

					var dist2 = Math.pow(wells[i].position.x - myPosition.x,2) + Math.pow(wells[i].position.y - myPosition.y,2) + Math.pow(wells[i].position.z - myPosition.z,2);
					var force = gravitationalConstant * myMass * wells[i].mass / dist2;
					var impulse = new CANNON.Vec3(
						force * (wells[i].position.x - myPosition.x/dist2),
						force * (wells[i].position.y - myPosition.y/dist2),
						force * (wells[i].position.z - myPosition.z/dist2)
					);

					if(dist2 === 0) {
						console.info(this.id + " " + wells[i].source.id);
						console.info(this.body.position.x + " " + this.body.position.y + " " + this.body.position.z);
						console.info(wells[i].source.body.position.x + " " + wells[i].source.body.position.y + " " + wells[i].source.body.position.z);
					}

					this.body.applyImpulse(impulse,myPosition);

				}
			}
			SystemObject.prototype.getPosition = function() {
				return this.body.position;
			}
			SystemObject.prototype.getRotation = function() {
				return this.body.quaternion;
			}
			SystemObject.prototype.tick = function() {}
			SystemObject.prototype.__sendUpdate = function() {
				throw new Error('not implemented');
			}




			function Sun() {
				SystemObject.apply(this,[new PhysicsSun(),"sun"]);
			}
			Sun.prototype = new SystemObject();
			Sun.prototype.__sendUpdate = function(update) {
				service.updateData({physics: {bodies: {sun: update}}});
			}


			function Teaatis() {
				SystemObject.apply(this,[new PhysicsTeaatis(),"Teaatis"]);
			}
			Teaatis.prototype = new SystemObject();
			Teaatis.prototype.__sendUpdate = function(update) {
				service.updateData({physics: {bodies: {Teaatis: update}}});
			}


			function Ship() {
				SystemObject.apply(this,[new PhysicsShip(),"ship"]);
			}
			Ship.prototype = new SystemObject();
			Ship.prototype.tick = function(seconds) {
				this.__tickPitch(seconds);
				this.__tickYaw(seconds);
				this.__tickRoll(seconds);
				this.__tickPosition(seconds);
			}
			Ship.prototype.__tickPosition = function(seconds) {
				var throttle = service.getData('/physics/values/thrusters/forward');
				var thrust = throttle * this.body.mass * seconds * 1000;
				if(thrust !== 0) {
					var impulseEuler = new CANNON.Vec3(0,0,thrust);

					//console.info('impulse start ' + impulseEuler.x + ' ' + impulseEuler.y + ' ' + impulseEuler.z);

					var orientationQuat = this.body.quaternion;
					var orientationMatrix = quatToMatrix(orientationQuat);

					//console.info('orientation matrix ' + orientationMatrix.elements[0] + ' ' + orientationMatrix.elements[1] + ' ' + orientationMatrix.elements[2] + ' ' + orientationMatrix.elements[3] + ' ' + orientationMatrix.elements[4] + ' ' + orientationMatrix.elements[5] + ' ' + orientationMatrix.elements[6] + ' ' + orientationMatrix.elements[7] + ' ' + orientationMatrix.elements[8]);

					impulseEuler = orientationMatrix.vmult(impulseEuler);
					//console.info('impulse ' + impulseEuler.x + ' ' + impulseEuler.y + ' ' + impulseEuler.z);

					this.body.applyImpulse(
						impulseEuler,
						this.body.position
					);
				}
			}
			Ship.prototype.__tickPitch = function(seconds) {
				var values = service.getData('/physics/values');
				var impulse = new CANNON.Vec3(0,0,0);
				var point = new CANNON.Vec3(0,0,0);

				impulse.y = values.thrusters.pitch.throttle*this.body.mass*seconds;

				point.x = this.body.position.x;
				point.y = this.body.position.y;
				point.z = this.body.position.z + 10;

				this.body.applyImpulse(impulse,point);

				impulse.y = -impulse.y;

				point.z = this.body.position.z - 10;

				this.body.applyImpulse(impulse,point);
			}
			Ship.prototype.__tickYaw = function(seconds) {
				var values = service.getData('/physics/values');
				var impulse = new CANNON.Vec3(0,0,0);
				var point = new CANNON.Vec3(0,0,0);

				impulse.z = values.thrusters.yaw.throttle*this.body.mass*seconds;

				point.x = this.body.position.x + 10;
				point.y = this.body.position.y;
				point.z = this.body.position.z;

				this.body.applyImpulse(impulse,point);

				impulse.z = -impulse.z;

				point.x = this.body.position.x - 10;
				this.body.applyImpulse(impulse,point);
			}
			Ship.prototype.__tickRoll = function(seconds) {
				var values = service.getData('/physics/values');
				var impulse = new CANNON.Vec3(0,0,0);
				var point = new CANNON.Vec3(0,0,0);

				impulse.y = values.thrusters.roll.throttle*this.body.mass*seconds;

				point.x = this.body.position.x + 10;
				point.y = this.body.position.y;
				point.z = this.body.position.z;

				this.body.applyImpulse(impulse,point);

				impulse.y = -impulse.y;

				point.x = this.body.position.x - 10;
				this.body.applyImpulse(impulse,point);
			}
			Ship.prototype.__sendUpdate = function(update) {
				service.updateData({physics: {bodies: {myShip: update}}});
			}



			var system = new SolarSystem();


			var sun = new Sun();
			system.add(sun);


			var teaatis = new Teaatis();
			system.add(teaatis);


			var ship = new Ship();
			system.add(ship);



			var service = this;

			this.onDataReceived(function(data) {
				service.updateData(data);
			});

			this.onDataReceived('/physics/values/thrusters/kill',function(msg) {
				switch(msg) {
					case "forward":
						service.updateData('/physics/values/thrusters/forward',0);
					break;
					case "x":
						service.updateData('/physics/values/thrusters/pitch/throttle',0);
					break;
					case "y":
						service.updateData('/physics/values/thrusters/yaw/throttle',0);
					break;
					case "z":
						service.updateData('/physics/values/thrusters/roll/throttle',0);
					break;
				}
			});

			this.setData({
				"physics": {
					"values": {
						"thrusters": {
							"forward": 0,
							"pitch": {
								throttle: 0,
								stablize: 1
							},
							"yaw": {
								throttle: 0,
								stablize: 1
							},
							"roll": {
								throttle: 0,
								stablize: 1
							}
						}
					},
					"bodies": {
						"moon": {
							"position": {
								"x": teaatisPosition.x,
								"y": teaatisPosition.y,
								"z": teaatisPosition.z,
								"velocity": {
									"x": 0,
									"y": 0,
									"z": 0
								}
							},
							"rotation": {
								"x": teaatisRotation.x,
								"y": teaatisRotation.y,
								"z": teaatisRotation.z,
								"w": teaatisRotation.w,
								"velocity": {
									"type": "rotation",
									"x": 0,
									"y": 0,
									"z": 0
								}
							}
						},
						"sun": {
							"position": {
								"x": sunPosition.x,
								"y": sunPosition.y,
								"z": sunPosition.z,
								"velocity": {
									"x": 0,
									"y": 0,
									"z": 0
								}
							},
							"rotation": {
								"x": 0,
								"y": 0,
								"z": 0,
								"w": 0,
								"velocity": {
									"type": "rotation",
									"x": 0,
									"y": 0,
									"z": 0
								}
							}
						},
						"Teaatis": {
							"position": {
								"x": teaatisPosition.x,
								"y": teaatisPosition.y,
								"z": teaatisPosition.z,
								"velocity": {
									"x": 0,
									"y": 0,
									"z": 0
								}
							},
							"rotation": {
								"id": "teaatis",
								"x": 0,
								"y": 0,
								"z": 0,
								"w": 0,
								"velocity": {
									"type": "rotation",
									"x": 0,
									"y": 0,
									"z": 0
								}
							}
						},
						"myShip": {
							"position": {
								"x": shipPosition.x,
								"y": shipPosition.y,
								"z": shipPosition.z,
								"velocity": {
									"x": 0,
									"y": 0,
									"z": 0
								}
							},
							"rotation": {
								"x": 0,
								"y": 0,
								"z": 0,
								"w": 0,
								"velocity": {
									"type": "rotation",
									"x": 0,
									"y": 0,
									"z": 0
								}
							}
						}
					}
				}
			});

			function send() {
				service.send();
			}

			send();

			setInterval(send,serviceSendMS);







			function quatToEular(quat) {
				var x,y,z;
				var s = -2 * (quat.y*quat.z + quat.w*quat.x);
				if (Math.abs(s) > .99999999) {
					x = s * Math.PI/2;
					y = Math.atan2(-quat.x*quat.z - quat.w*quat.y, .5 - quat.y*quat.y - quat.z*quat.z);
					z = 0;
				} else {
					x = Math.asin(s);
					y = Math.atan2(quat.x*quat.z - quat.w*quat.y, .5 - quat.x*quat.x - quat.y*quat.y);
					z = Math.atan2(quat.x*quat.y - quat.w*quat.z, .5 - quat.x*quat.x - quat.z*quat.z);
				}
				return new CANNON.Vec3(x,y,z);
			}

			function eularToQuat(euler) {
				return new CANNON.Quaternion(
					-(Math.sin(euler.x/2) * Math.cos(euler.y/2) * Math.cos(euler.z/2)) +
					-(Math.cos(euler.x/2) * Math.sin(euler.y/2) * Math.sin(euler.z/2)),
					(Math.cos(euler.x/2) * Math.sin(euler.y/2) * Math.cos(euler.z/2)) +
					-(Math.sin(euler.x/2) * Math.cos(euler.y/2) * Math.sin(euler.z/2)),
					(Math.cos(euler.x/2) * Math.cos(euler.y/2) * Math.sin(euler.z/2)) +
					-(Math.sin(euler.x/2) * Math.sin(euler.y/2) * Math.cos(euler.z/2)),
					(Math.cos(euler.x/2) * Math.cos(euler.y/2) * Math.cos(euler.z/2)) +
					(Math.sin(euler.x/2) * Math.sin(euler.y/2) * Math.sin(euler.z/2))
				);
			}

			function quatToMatrix(q) {
				return new CANNON.Mat3(
					[
						1-(2*q.y*q.y)-(2*q.z*q.z),
						(2*q.x*q.y)+(2*q.w*q.z),
						(2*q.x*q.z)-(2*q.w*q.y),
						(2*q.x*q.y)-(2*q.w*q.z),
						1-(2*q.x*q.x)-(2*q.z*q.z),
						(2*q.y*q.z)+(2*q.w*q.x),
						2*(q.x*q.z)+2*(q.y*q.w),
						2*(q.y*q.z)-2*(q.w*q.x),
						1-2*(q.x*q.x)-2*(q.y*q.y)
					]
				);
			}


		}
		PhysicsService.prototype = new MockService();

		return PhysicsService;

	}
);