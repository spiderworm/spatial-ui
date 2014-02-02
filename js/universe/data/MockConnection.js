define(
	[
		'./viewportDataConnectionFactory'
	],
	function(
		viewportDataConnectionFactory
	) {

		function MockUniverseDataConnection(user) {}
		MockUniverseDataConnection.prototype.getViewportConnection = function(id) {
			return viewportDataConnectionFactory.getConnection(id);
		}


		return MockUniverseDataConnection;

	}
);