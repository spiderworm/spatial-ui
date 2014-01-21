define(
	[
		'../../base/data/ConnectionFactory',
		'./ServiceConnection',
		'./MockDataConnection'
	],
	function(
		DataConnectionFactory,
		EngineeringServiceConnection,
		MockEngineeringDataConnection
	) {

		function EngineeringDataConnectionFactory() {
			DataConnectionFactory.apply(
				this,
				[
					EngineeringServiceConnection,
					MockEngineeringDataConnection
				]
			);
		}
		EngineeringDataConnectionFactory.prototype = new DataConnectionFactory();



		var connectionFactory = new EngineeringDataConnectionFactory();
		return connectionFactory;
	}
)