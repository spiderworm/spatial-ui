define(
	[
		'./MockDataConnection',
		'../../registry'
	],
	function(
		MockViewDataConnection,
		registry
	) {


		function ViewDataConnectionFactory() {
		}
		ViewDataConnectionFactory.prototype.getConnection = function(user) {
			var mock = registry.get('mock');
			if(mock) {
				return new MockViewDataConnection(user);
			}
		}

		var connectionFactory = new ViewDataConnectionFactory();
		return connectionFactory;

	}
);