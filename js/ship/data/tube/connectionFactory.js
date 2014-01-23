define(
	[
		'../../../base/data/ConnectionFactory',
		'./ServiceConnection',
		'./MockConnection'
	],
	function(
		DataConnectionFactory,
		TubeServiceConnection,
		MockTubeDataConnection
	) {


		function TubeDataConnectionFactory() {
			DataConnectionFactory.apply(
				this,
				[
					TubeServiceConnection,
					MockTubeDataConnection
				]
			);
		}
		TubeDataConnectionFactory.prototype = new DataConnectionFactory();


		var connectionFactory = new TubeDataConnectionFactory();
		return connectionFactory;
	}
)