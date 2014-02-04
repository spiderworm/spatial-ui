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




		function ControlsConnectionFactory() {
			ConnectionFactory.apply(
				this,
				[
					ServiceConnection,
					MockConnection
				]
			);
		}
		ControlsConnectionFactory.prototype = new ConnectionFactory();



		var connectionFactory = new ControlsConnectionFactory();
		return connectionFactory;

	}
);