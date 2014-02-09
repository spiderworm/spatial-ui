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