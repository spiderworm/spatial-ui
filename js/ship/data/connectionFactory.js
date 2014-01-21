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
		ShipDataConnectionFactory.prototype.getConnection = function(user,ship) {
			var mock = registry.get('mock');
			if(mock) {
				return new MockShipServiceConnection(user,ship);
			} else {
				return new ShipServiceConnection(user,ship);
			}
		}

		var connectionFactory = new ShipDataConnectionFactory();
		return connectionFactory;

	}
);