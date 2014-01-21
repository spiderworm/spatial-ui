define(
	[
		'../../base/data/ConnectionFactory',
		'./ServiceConnection',
		'./MockServiceConnection'
	],
	function(
		ConnectionFactory,
		WeaponsServiceConnection,
		MockWeaponsDataConnection
	) {


		function WeaponsDataConnectionFactory() {
			ConnectionFactory.apply(
				this,
				[
					WeaponsServiceConnection,
					MockWeaponsDataConnection
				]
			);
		}
		WeaponsDataConnectionFactory.prototype = new ConnectionFactory();

		var connectionFactory = new WeaponsDataConnectionFactory();
		return connectionFactory;

	}
);