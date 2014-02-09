define(
	[
		'../base/ConnectionFactory',
		'./MockConnection',
		'./ServiceConnection'
	],
	function(
		ConnectionFactory,
		MockShipValuesServiceConnection,
		ShipValuesServiceConnection
	) {


		function ShipValuesConnectionFactory() {
			ConnectionFactory.apply(
				this,
				[
					ShipValuesServiceConnection,
					MockShipValuesServiceConnection
				]
			);
		}
		ShipValuesConnectionFactory.prototype = new ConnectionFactory();

		var connectionFactory = new ShipValuesConnectionFactory();
		return connectionFactory;

	}
);