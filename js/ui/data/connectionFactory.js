define(
	[
		'./MockDataConnection'
	],
	function(
		MockViewDataConnection
	) {


		function ViewDataConnectionFactory() {
			this.__connection = new MockViewDataConnection();
		}
		ViewDataConnectionFactory.prototype.getConnection = function() {
			return this.__connection;
		}

		var connectionFactory = new ViewDataConnectionFactory();
		return connectionFactory;

	}
);