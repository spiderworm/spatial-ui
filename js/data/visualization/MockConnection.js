define(
	[
		'../base/Connection',
		'../../base/Model',
		'../util/comm'
	],
	function(
		Connection,
		Model,
		comm
	) {

		function MockSceneDataConnection(user) {
			Connection.apply(this);
		}
		MockSceneDataConnection.prototype = new Connection();
		MockSceneDataConnection.prototype.loadModel = function(url,callback) {
			var connection = this;
			comm.ajax(
				url,
				function(response) {
					var model = new Model(response);
					callback.apply(connection,[model]);

					var rads = 0;
					var speed = .01;
					var distance = 6371000 + 100000;

					function animateShip() {

						if(model.objects) {
							var planetModel = model.objects[1];
							var shipModel = model.objects[2];

							rads += speed;

							shipModel.position.x = planetModel.position.x + distance * Math.cos(rads);
							shipModel.position.y = planetModel.position.y + distance * Math.sin(rads);
							shipModel.position.z = planetModel.position.z;
							shipModel.rotation.x = 0;
							shipModel.rotation.y = 0;
							shipModel.rotation.z = rads;

							shipModel.position.setUpdated();
							shipModel.rotation.setUpdated();

						}

						requestAnimationFrame( animateShip );

					}

					animateShip();

				}
			);
		}


		return MockSceneDataConnection;

	}
);