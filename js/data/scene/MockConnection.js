define(
	[
		'../visualization/camera/connectionFactory'
	],
	function(
		cameraDataConnectionFactory
	) {

		function MockSceneDataConnection(user) {}
		MockSceneDataConnection.prototype.getCameraConnection = function(id) {
			return cameraDataConnectionFactory.getConnection(id);
		}


		return MockSceneDataConnection;

	}
);