define(
	[
		'./DataConnection'
	],
	function(
		ShipUIDataConnection
	) {

		function MockShipUIDataConnection(user,url,type,format) {
			ShipUIDataConnection.apply(this,arguments);
		}
		MockShipUIDataConnection.prototype = new ShipUIDataConnection();

		ShipUIDataConnection.extend(MockShipUIDataConnection);

		return MockShipUIDataConnection;

	}
);