define(
	[
		'../base/Connection',
		'../base/DataConnectionModel',
		'../util/comm',
		'../../registry'
	],
	function(
		Connection,
		DataConnectionModel,
		comm,
		registry
	) {

		var scale = registry.get('3D-scale');

		function MockSceneDataConnection(user) {
			Connection.apply(this);
		}
		MockSceneDataConnection.prototype = new Connection();
		MockSceneDataConnection.prototype.loadModel = function(url,callback) {
			var connection = this;
			comm.ajax(
				url,
				function(response) {

					response = connection.__scaleResponse(response);

					var model = new DataConnectionModel(response);
					callback.apply(connection,[model]);

					model.subscribeTo(function() {
						if(this.objects) {
							detectObjects(this.objects);
						}
					});

				}
			);
		}
		MockSceneDataConnection.prototype.__scaleResponse = function(response) {
			if(response.position) {
				response.position.x *= scale;
				response.position.y *= scale;
				response.position.z *= scale;
			}

			if(response.hasOwnProperty('scale')) {
				response.scale *= scale;
			}

			if(response.hasOwnProperty('geometry') && !response.hasOwnProperty('scale')) {
				response.scale = scale;
			}

			if(response.objects) {
				for(var i=0; i<response.objects.length; i++) {
					response.objects[i] = this.__scaleResponse(response.objects[i]);
				}
			}

			return response;
		}


		var moon, teaatis, ship;

		function detectObjects(objs) {
			for(var i=0; i<objs.length; i++) {
				switch(objs[i].id) {
					case "moon":
						moon = objs[i];
					break;
					case "Teaatis":
						teaatis = objs[i];
					break;
					case "myShip":
						ship = objs[i];
					break;
				}
			}
		}





		var teaatisSize = scale * 6371000;
		var teaatisDistance = scale * 149600000000;
		var teaatisRads = .5;

		var moonDistance = scale * 384400000;
		var moonRads = 1;

		var shipRads = 0;
		var shipSpeed = .003;
		var shipDistance = teaatisSize + scale * 100000;

		function doAnimation() {
			animateShip();
			animateTeaatis();
			animateMoon();
			requestAnimationFrame(doAnimation);
		}

		doAnimation();


		function animateShip() {

			if(moon && teaatis && ship) {
				shipRads += shipSpeed;

				ship.position.sourceUpdate({
					x: teaatis.position.x + shipDistance * Math.cos(shipRads),
					y: teaatis.position.y + shipDistance * Math.sin(shipRads),
					z: teaatis.position.z
				});

				ship.rotation.sourceUpdate({
					x:0,
					y:0,
					z:shipRads
				});
			}

		}


		function animateTeaatis() {
			if(teaatis) {
				teaatis.rotation.x = 0;
				teaatis.rotation.y += .0002;
				teaatis.rotation.z = 0;
				teaatis.rotation.setSourceUpdated();

				teaatis.position.x = teaatisDistance * Math.cos(teaatisRads);
				teaatis.position.y = teaatisDistance * Math.sin(teaatisRads);
				teaatis.position.z = 0;
				teaatis.position.setSourceUpdated();
			}
		}


		function animateMoon() {

			if(moon && teaatis) {

				moon.position.x = teaatis.position.x + moonDistance * Math.cos(moonRads);
				moon.position.y = teaatis.position.y + moonDistance * Math.sin(moonRads);
				moon.position.z = teaatis.position.z;
				moon.position.setSourceUpdated();
			}
		}

		return MockSceneDataConnection;

	}
);