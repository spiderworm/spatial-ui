define(
	[
		'./MockServiceConnection',
		'../../registry'
	],
	function(
		MockWeaponsServiceConnection,
		registry
	) {


		function WeaponsDataConnectionFactory() {}
		WeaponsDataConnectionFactory.prototype.getConnection = function(user,ship) {
			var mock = registry.get('mock');
			if(mock) {
				return new MockWeaponsServiceConnection(user,ship);
			} else {
				return new WeaponsServiceConnection(user,ship);
			}
		}

		var connectionFactory = new WeaponsDataConnectionFactory();
		return connectionFactory;

	}
);