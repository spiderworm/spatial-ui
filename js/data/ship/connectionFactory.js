define(
	[
		'../base/ConnectionFactory',
		'./MockConnection'
	],
	function(
		ConnectionFactory,
		MockShipServiceConnection
	) {


		function ServiceConnection() {}

		function ShipValuesConnectionFactory() {
			ConnectionFactory.apply(
				this,
				[
					ServiceConnection,
					MockShipServiceConnection
				]
			);
		}
		ShipValuesConnectionFactory.prototype = new ConnectionFactory();

		var connectionFactory = new ShipValuesConnectionFactory();
		return connectionFactory;

	}
);