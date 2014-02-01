define(
	[
		'../../base/data/ConnectionFactory',
		'./MockConnection'
	],
	function(
		ConnectionFactory,
		MockConnection
	) {


		function ServiceConnection() {}




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