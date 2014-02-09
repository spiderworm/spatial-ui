define(
	[
		'../../base/ConnectionFactory',
		'./MockConnection',
		'./ServiceConnection'
	],
	function(
		ConnectionFactory,
		MockConnection,
		ServiceConnection
	) {



		function UserShipDataConnectionFactory() {
			ConnectionFactory.apply(
				this,
				[
					ServiceConnection,
					MockConnection
				]
			);
		}
		UserShipDataConnectionFactory.prototype = new ConnectionFactory();



		var connectionFactory = new UserShipDataConnectionFactory();
		return connectionFactory;

	}
);