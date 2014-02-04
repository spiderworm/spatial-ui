define(
	[
		'../base/ConnectionFactory',
		'./MockConnection'
	],
	function(
		ConnectionFactory,
		MockConnection
	) {

		function ServiceConnection() {}




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