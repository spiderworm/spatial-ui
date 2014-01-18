define(
	[
		'./MockServiceConnection'
	],
	function(
		MockWeaponsServiceConnection
	) {


		function WeaponsDataConnectionFactory() {}
		WeaponsDataConnectionFactory.prototype.getConnection = function(mock) {
			if(!mock) {
				if(!this._connection) {
					this._connection = new WeaponsServiceConnection();
				}
				return this._connection;
			} else {
				if(!this._mockConnection) {
					this._mockConnection = new MockWeaponsServiceConnection();
				}
				return this._mockConnection;
			}
		}

		var connectionFactory = new WeaponsDataConnectionFactory();
		return connectionFactory;

	}
);