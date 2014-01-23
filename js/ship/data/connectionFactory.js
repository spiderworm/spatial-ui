define(
	[
		'../../registry',
		'./MockServiceConnection'
	],
	function(
		registry,
		MockShipServiceConnection
	) {


		function ShipDataConnectionFactory() {
			this.__connections = [];
		}
		ShipDataConnectionFactory.prototype.getConnection = function(shipID) {
			var mock = registry.get('mock');
			if(mock) {
				return new MockShipServiceConnection(shipID);
			} else {
				return new ShipServiceConnection(shipID);
			}
		}

		var connectionFactory = new ShipDataConnectionFactory();
		return connectionFactory;

	}
);