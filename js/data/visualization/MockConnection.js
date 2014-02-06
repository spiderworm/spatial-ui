define(
	[
		'../base/Connection',
		'../base/DataConnectionModel',
		'../util/comm'
	],
	function(
		Connection,
		DataConnectionModel,
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





		var teaatisSize = 6371000;
		var teaatisDistance = 149600000000;

		var shipRads = 0;
		var shipSpeed = .003;
		var shipDistance = teaatisSize + 100000;

		function doAnimation() {
			animateShip();
			animateTeaatis();
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
				teaatis.rotation.y += .0002;
				teaatis.rotation.setSourceUpdated();
			}
		}


		return MockSceneDataConnection;

	}
);