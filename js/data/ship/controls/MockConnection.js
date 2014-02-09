define(
	[
		'./DataConnection'
	],
	function(
		ShipControlsDataConnection
	) {

		function MockShipControlsDataConnection(user,url) {
			var instance = MockShipControlsDataConnection.findInstance(arguments);
			if(instance) {
				return instance;
			}
			MockShipControlsDataConnection.addInstance(this,arguments);

			ShipControlsDataConnection.apply(this,arguments);
		}
		MockShipControlsDataConnection.prototype = new ShipControlsDataConnection();

		ShipControlsDataConnection.extend(MockShipControlsDataConnection);

		return MockShipControlsDataConnection;

	}
);