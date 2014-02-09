define(
	[
		'./DataConnection'
	],
	function(
		ShipControlsDataConnection
	) {

		function MockShipControlsDataConnection(user,url,connectionType,dataFormat) {
			var instance = MockShipControlsDataConnection.findInstance(arguments);
			if(instance) {
				return instance;
			}
			MockShipControlsDataConnection.addInstance(this,arguments);

			ShipControlsDataConnection.apply(this,[user,url,connectionType,dataFormat]);
		}
		MockShipControlsDataConnection.prototype = new ShipControlsDataConnection();

		ShipControlsDataConnection.extend(MockShipControlsDataConnection);

		return MockShipControlsDataConnection;

	}
);