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




		function ViewportDataConnectionFactory() {
			ConnectionFactory.apply(
				this,
				[
					ServiceConnection,
					MockConnection
				]
			);
		}
		ViewportDataConnectionFactory.prototype = new ConnectionFactory();



		var connectionFactory = new ViewportDataConnectionFactory();
		return connectionFactory;

	}
);