define(
	[
		'./DataConnection'
	],
	function(
		ShipUIDataConnection
	) {

		function ShipUIServiceConnection(user,url) {
			ShipUIDataConnection.apply(this,arguments);
		}
		ShipUIServiceConnection.prototype = new ShipUIDataConnection();

		ShipUIDataConnection.extend(ShipUIServiceConnection);

		return ShipUIServiceConnection;

	}
);