define(
	[
		'./DataConnection'
	],
	function(
		ShipUIDataConnection
	) {

		function MockShipUIDataConnection(user,url) {
			ShipUIDataConnection.apply(this,arguments);
		}
		MockShipUIDataConnection.prototype = new ShipUIDataConnection();

		ShipUIDataConnection.extend(MockShipUIDataConnection);

		return MockShipUIDataConnection;

	}
);