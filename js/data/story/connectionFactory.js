define(
	[
		'../base/ConnectionFactory',
		'./ServiceConnection',
		'./MockConnection'
	],
	function(
		ConnectionFactory,
		ServiceConnection,
		MockConnection
	) {


		function StoryDataConnectionFactory() {
			ConnectionFactory.apply(
				this,
				[
					ServiceConnection,
					MockConnection
				]
			);
		}
		StoryDataConnectionFactory.prototype = new ConnectionFactory();



		var connectionFactory = new StoryDataConnectionFactory();
		return connectionFactory;

	}
);