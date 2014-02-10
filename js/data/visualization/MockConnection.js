define(
	[
		'./DataConnection',
		'../../registry',
		'../../external/threex.keyboardstate'
	],
	function(
		VisualizationDataConnection,
		registry,
		KeyboardState
	) {

		var scale = registry.get('3D-scale');

		function MockVisualizationDataConnection(user) {
			VisualizationDataConnection.apply(this);
		}
		MockVisualizationDataConnection.prototype = new VisualizationDataConnection();
		MockVisualizationDataConnection.prototype.loadModel = function(url,callback) {
			var connection = this;

			VisualizationDataConnection.prototype.loadModel.apply(
				this,
				[
					url,
					function(model) {
						callback.apply(connection,[model]);

						model.$subscribeTo(function() {
							if(this.objects) {
								detectObjects(this.objects);
							}
						});
					}
				]
			);

		}



		VisualizationDataConnection.extend(MockVisualizationDataConnection);





		var moon, teaatis, ship;

		function detectObjects(objs) {
			objs.$each(function(objDefinition) {
				switch(objDefinition.id) {
					case "moon":
						moon = objDefinition;
					break;
					case "Teaatis":
						teaatis = objDefinition;
					break;
					case "myShip":
						ship = objDefinition;
					break;
				}
			});
		}



		var keyboard = new KeyboardState(document.querySelector('canvas'));

		var teaatisSize = scale * 6371000;
		var teaatisDistance = scale * 149600000000;
		var teaatisRads = .5;

		var moonDistance = scale * 38440000;
		var moonRads = 1;

		var shipRads = 0;
		var shipSpeed = .003;
		var shipDistance = teaatisSize + scale * 100000;
		var shipOrbit = true;

		function doAnimation() {
			if(keyboard.pressed('space')) {
				shipOrbit= false;
			}
			animateShip();
			animateTeaatis();
			animateMoon();
			requestAnimationFrame(doAnimation);
		}

		doAnimation();


		function animateShip() {
			if(ship) {
				if(shipOrbit) {
					if(teaatis) {
						shipRads += shipSpeed;

						ship.position.$update({
							x: teaatis.position.x + shipDistance * Math.cos(shipRads),
							y: teaatis.position.y + shipDistance * Math.sin(shipRads),
							z: teaatis.position.z
						});

						ship.rotation.$update({
							x:shipRads-Math.PI/2,
							y:-Math.PI/2,
							z:0,
							order: 'YXZ'
						});
					}
				} else {

					var vector = new THREE.Vector3(100000,0,0);

					var euler = new THREE.Euler(ship.rotation.x,ship.rotation.y,ship.rotation.z);

					vector.applyEuler(euler);

//					console.info(vector);


/*
					if(keyboard.pressed('W')) {
						dx = 10000;
					}
					if(keyboard.pressed('S')) {
						dx = -10000;
					}
					if(keyboard.pressed('D')) {
						dy = 10000;
					}
					if(keyboard.pressed('A')) {
						dy = -10000;
					}
*/

					ship.position.$update({
						x: ship.position.x + vector.z,
						y: ship.position.y + vector.x,
						z: ship.position.z + vector.y
					});



				}
			}

		}


		function animateTeaatis() {
			if(teaatis) {
				teaatis.rotation.x = 0;
				teaatis.rotation.y += .0002;
				teaatis.rotation.z = 0;
				teaatis.rotation.$setUpdated();

				teaatis.position.x = teaatisDistance * Math.cos(teaatisRads);
				teaatis.position.y = teaatisDistance * Math.sin(teaatisRads);
				teaatis.position.z = 0;
				teaatis.position.$setUpdated();
			}
		}


		function animateMoon() {

			if(moon && teaatis) {

				moon.position.x = teaatis.position.x + moonDistance * Math.cos(moonRads);
				moon.position.y = teaatis.position.y + moonDistance * Math.sin(moonRads);
				moon.position.z = teaatis.position.z;
				moon.position.$setUpdated();
			}
		}

		return MockVisualizationDataConnection;

	}
);