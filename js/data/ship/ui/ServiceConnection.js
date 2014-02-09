define(
	[
		'./DataConnection'
	],
	function(
		ShipUIDataConnection
	) {

		function ShipUIServiceConnection(user,url,type,format) {
			ShipUIDataConnection.apply(this,arguments);
		}
		ShipUIServiceConnection.prototype = new ShipUIDataConnection();

		ShipUIDataConnection.extend(ShipUIServiceConnection);

		return ShipUIServiceConnection;

	}
);