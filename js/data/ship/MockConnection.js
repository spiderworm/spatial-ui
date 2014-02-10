define(
	[
		'./DataConnection',
		'../util/comm'
	],
	function(
		ShipValuesDataConnection,
		comm
	) {

		function MockShipValuesConnection(user,url,connectionType,dataFormat) {
			var instance = MockShipValuesConnection.findInstance(arguments);
			if(instance) {
				return instance;
			}
			MockShipValuesConnection.addInstance(this,arguments);

			ShipValuesDataConnection.apply(this,[user,url,connectionType,dataFormat]);
		}
		MockShipValuesConnection.prototype = new ShipValuesDataConnection();

		ShipValuesDataConnection.extend(MockShipValuesConnection);

		return MockShipValuesConnection;

	}
);