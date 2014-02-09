define(
	[
		'../base/ConnectionFactory',
		'./MockConnection',
		'./ServiceConnection'
	],
	function(
		ConnectionFactory,
		MockConnection,
		ServiceConnection
	) {



		function UniverseDataConnectionFactory() {
			ConnectionFactory.apply(
				this,
				[
					ServiceConnection,
					MockConnection
				]
			);
		}
		UniverseDataConnectionFactory.prototype = new ConnectionFactory();



		var connectionFactory = new UniverseDataConnectionFactory();
		return connectionFactory;

	}
);