define(
	[
		'../../base/ConnectionFactory',
		'./MockConnection'
	],
	function(
		ConnectionFactory,
		MockConnection
	) {


		function ServiceConnection() {}




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