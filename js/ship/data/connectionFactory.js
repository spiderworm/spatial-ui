define(
	[
		'./MockServiceConnection'
	],
	function(
		MockShipServiceConnection
	) {


		function ShipDataConnectionFactory() {
			this.__connections = [];
		}
		ShipDataConnectionFactory.prototype.getConnection = function(ship,mock) {
			var connections = this.__findShipConnections(ship);
			if(mock) {
				if(!connections.mock) {
					connections.mock = new MockShipServiceConnection();
				}
				return connections.mock;
			} else {
				if(!connections.connection) {
					connections.connection = new MockShipServiceConnection();
				}
				return connections.connection;
			}
		}
		ShipDataConnectionFactory.prototype.__findShipConnections = function(ship) {
			for(var i=0; i<this.__connections.length; i++) {
				if(this.__connections[i].ship === ship) {
					return this.__connections[i];
				}
			}
			var connections = {
				ship: ship,
				mock: null,
				connection: null
			};
			this.__connections.push(connections);
			return connections;
		}

		var connectionFactory = new ShipDataConnectionFactory();
		return connectionFactory;

	}
);