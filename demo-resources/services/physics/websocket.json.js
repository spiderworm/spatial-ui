importScripts('../../../js/external/require.js');


require.config({
	baseUrl: '../../../js/'
});

require(
	[
		'../demo-resources/services/util/MockWebSocketServer',
		'data/util/dataInterpreters',
		'external/ammo'
	],
	function(
		MockWebSocketServer,
		interpreters
	) {

		//var gravitationalConstant = 6.674e-11;
		var gravitationalConstant = 1e+3;
		var gravitationalConstant = 0;

		var shipSize = 1000;
		var shipPosition = new Ammo.btVector3(5200000000, 0, 0);
		var shipVelocity = new Ammo.btVector3(0, 0, 0);
		var shipMass = 10000;

		var teaatisSize = 1.2742e7;
		var teaatisMass = 5.97219e+24;
		var teaatisPosition = new Ammo.btVector3(9000000000, 0, 0);
		var teaatisVelocity = new Ammo.btVector3(0, 0, 0);
		var teaatisRotation = new Ammo.btQuaternion(0,1,0,1);
		var teaatisSpin = new Ammo.btVector3(0,.3,0);

		var sunSize = 1.391e9;
		var sunPosition = new Ammo.btVector3(0,0,0);
		var sunMass =  1.98892e+30;

		var moonSize = 100000;
		var moonPosition = new Ammo.btVector3(3844000000, 0, 0);
		var moonMass = 10000000;


		function AmmoSystem() {
			var collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
			var dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
			var overlappingPairCache = new Ammo.btDbvtBroadphase();
			var solver = new Ammo.btSequentialImpulseConstraintSolver();
			var system = new Ammo.btDiscreteDynamicsWorld( dispatcher, overlappingPairCache, solver, collisionConfiguration );
			system.setGravity(new Ammo.btVector3(0, 0, 0));
			return system;
		}


		function AmmoSun() {
			var startTransform = new Ammo.btTransform();
			startTransform.setIdentity();
			startTransform.setOrigin(sunPosition);
			var localInertia = new Ammo.btVector3(0, 0, 0);
			var shape = new Ammo.btBoxShape(new Ammo.btVector3( sunSize/2, sunSize/2, sunSize/2 ));
			shape.calculateLocalInertia( sunMass, localInertia );
			var motionState = new Ammo.btDefaultMotionState( startTransform );
			var rbInfo = new Ammo.btRigidBodyConstructionInfo( sunMass, motionState, shape, localInertia );
			var body = new Ammo.btRigidBody( rbInfo );
			body.setActivationState(4);
			return body;
		}

		function AmmoShip() {
			var startTransform = new Ammo.btTransform();
			startTransform.setIdentity();
			startTransform.setOrigin(shipPosition);
			var localInertia = new Ammo.btVector3(0, 0, 0);
			var shape = new Ammo.btBoxShape(new Ammo.btVector3( shipSize/2, shipSize/2, shipSize/2 ));
			shape.calculateLocalInertia( shipMass, localInertia );
			var motionState = new Ammo.btDefaultMotionState( startTransform );
			var rbInfo = new Ammo.btRigidBodyConstructionInfo( shipMass, motionState, shape, localInertia );
			var body = new Ammo.btRigidBody( rbInfo );
			body.setActivationState(4);
			body.setLinearVelocity(shipVelocity);
			return body;
		}

		function AmmoTeaatis() {
			var startTransform = new Ammo.btTransform();
			startTransform.setIdentity();
			startTransform.setOrigin(teaatisPosition);
			startTransform.setRotation(teaatisRotation);
			var localInertia = new Ammo.btVector3(0,0,0);
			var shape = new Ammo.btSphereShape(teaatisSize/2);
			shape.calculateLocalInertia( teaatisMass, localInertia );
			var motionState = new Ammo.btDefaultMotionState( startTransform );
			var rbInfo = new Ammo.btRigidBodyConstructionInfo( teaatisMass, motionState, shape, localInertia );
			var body = new Ammo.btRigidBody( rbInfo );
			body.setActivationState(4);
			body.setLinearVelocity(teaatisVelocity);
			body.setAngularVelocity(teaatisSpin);
			return body;
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

		var lastOrientation, lastAngularVelocity;















		function SolarSystem(physics) {
			this.physics = new AmmoSystem();

			this.__objects = [];

			this.__lastStamp = (new Date()).getTime();

			var system = this;
			function doPhysics() {
				system.__tick();
			}

			setInterval(doPhysics,1000);
		}
		SolarSystem.prototype.add = function(obj) {
			this.__objects.push(obj);
			this.physics.addRigidBody(obj.body);
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
				this.__objects[i].tick();
			}

			this.physics.stepSimulation(secs, 5);

			for(var i in this.__objects) {
				this.__objects[i].update(secs);
			}

		}


		function SystemObject(body,id) {
			this.body = body;
			this.id = id;
			this.__transform = new Ammo.btTransform();
		}
		SystemObject.prototype.update = function(seconds) {
			var update = {position: {velocity: {}}, rotation: {velocity: {}}};

			var vector = this.getPosition();
			update.position.x = vector.x();
			update.position.y = vector.y();
			update.position.z = vector.z();

			var vector = this.body.getInterpolationLinearVelocity();
			update.position.velocity.x = vector.x();
			update.position.velocity.y = vector.y();
			update.position.velocity.z = vector.z();

			var vector = this.getRotation();
			update.rotation.x = vector.x();
			update.rotation.y = vector.y();
			update.rotation.z = vector.z();
			update.rotation.w = vector.w();

			var euler = this.body.getAngularVelocity();
			update.rotation.velocity.x = euler.x();
			update.rotation.velocity.y = euler.y();
			update.rotation.velocity.z = euler.z();

			if(this.id === "Teaatis") {
				lastOrientation = update.rotation;
				lastAngularVelocity = update.rotation.velocity;
			}

			this.__sendUpdate(update);
		}
		SystemObject.prototype.getGravityWell = function() {
			var well = {};
			well.source = this;
			well.position = this.getPosition();
			well.mass = 1/this.body.getInvMass();
			return well;
		}
		SystemObject.prototype.applyGravityWells = function(wells) {
			var myPosition = this.getPosition();
			var myMass = 1/this.body.getInvMass();
			for(var i in wells) {
				if(wells[i].source === this) {
					continue;
				}

				var dist2 = myPosition.distance2(wells[i].position);
				var force = gravitationalConstant * myMass * wells[i].mass / dist2
				var vector = new Ammo.btVector3(
					force * (wells[i].position.x() - myPosition.x())/dist2,
					force * (wells[i].position.y() - myPosition.y())/dist2,
					force * (wells[i].position.z() - myPosition.z())/dist2
				);

				this.body.applyCentralImpulse(vector);

			}
		}
		SystemObject.prototype.getPosition = function() {
			this.body.getMotionState().getWorldTransform(this.__transform);
			return this.__transform.getOrigin();
		}
		SystemObject.prototype.getRotation = function() {
			this.body.getMotionState().getWorldTransform(this.__transform);
			return this.__transform.getRotation();
		}
		SystemObject.prototype.tick = function() {}
		SystemObject.prototype.__sendUpdate = function() {
			throw new Error('not implemented');
		}




		function Sun() {
			SystemObject.apply(this,[new AmmoSun(),"sun"]);
		}
		Sun.prototype = new SystemObject();
		Sun.prototype.__sendUpdate = function(update) {
			server.updateData({physics: {bodies: {sun: update}}});
		}


		function Teaatis() {
			SystemObject.apply(this,[new AmmoTeaatis(),"Teaatis"]);
		}
		Teaatis.prototype = new SystemObject();
		Teaatis.prototype.__sendUpdate = function(update) {
			server.updateData({physics: {bodies: {Teaatis: update}}});
		}


		function Ship() {
			SystemObject.apply(this,[new AmmoShip(),"ship"]);
		}
		Ship.prototype = new SystemObject();
		Ship.prototype.tick = function() {
			var values = server.getData().physics.values;
			var rotVector = this.body.getOrientation().getAxis();
			this.body.applyCentralForce(new Ammo.btVector3(
				rotVector.x() * values.impulse*1000,
				rotVector.y() * values.impulse*1000,
				rotVector.z() * values.impulse*1000
			));
			this.body.applyTorque(new Ammo.btVector3(
				values.thrusters.pitch*1000,
				values.thrusters.yaw*1000,
				values.thrusters.roll*1000
			));
		}
		Ship.prototype.__sendUpdate = function(update) {
			server.updateData({physics: {bodies: {myShip: update}}});
		}



		var system = new SolarSystem();


		var sun = new Sun();
		system.add(sun);


		var teaatis = new Teaatis();
		system.add(teaatis);


		var ship = new Ship();
		system.add(ship);








		var server = new MockWebSocketServer(interpreters.json);

		server.setData({
			"physics": {
				"values": {
					"impulse": 0,
					"thrusters": {
						"pitch": 0,
						"yaw": 0,
						"roll": 0
					}
				},
				"bodies": {
					"moon": {
						"position": {
							"x": teaatisPosition.x(),
							"y": teaatisPosition.y(),
							"z": teaatisPosition.z(),
							"velocity": {
								"x": 0,
								"y": 0,
								"z": 0
							}
						},
						"rotation": {
							"x": teaatisRotation.x(),
							"y": teaatisRotation.y(),
							"z": teaatisRotation.z(),
							"w": teaatisRotation.w(),
							"velocity": {
								"type": "eulerYPR",
								"x": 0,
								"y": 0,
								"z": 0,
								"w": 0
							}
						}
					},
					"sun": {
						"position": {
							"x": 0,
							"y": 0,
							"z": 0,
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
								"type": "eulerYPR",
								"x": 0,
								"y": 0,
								"z": 0,
								"w": 0
							}
						}
					},
					"Teaatis": {
						"position": {
							"x": 0,
							"y": 0,
							"z": 0,
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
								"type": "eulerYPR",
								"x": 0,
								"y": 0,
								"z": 0,
								"w": 0
							}
						}
					},
					"myShip": {
						"position": {
							"id": "myShip",
							"x": 0,
							"y": 0,
							"z": 0,
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
								"type": "eulerYPR",
								"x": 0,
								"y": 0,
								"z": 0,
								"w": 0
							}
						}
					}
				}
			}
		});



		function send() {
			server.send();
		}

		send();

		setInterval(send,1000);





	}
);