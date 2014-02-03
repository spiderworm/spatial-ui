define(
	[
		'../../registry',
		'./MockConnection'
	],
	function(
		registry,
		MockShipServiceConnection
	) {


		function ShipValuesConnectionFactory() {
			this.__connections = [];
		}
		ShipValuesConnectionFactory.prototype.getConnection = function(shipID) {
			var mock = registry.get('mock');
			if(mock) {
				return new MockShipServiceConnection(shipID);
			} else {
				return new ShipServiceConnection(shipID);
			}
		}

		var connectionFactory = new ShipValuesConnectionFactory();
		return connectionFactory;

	}
);