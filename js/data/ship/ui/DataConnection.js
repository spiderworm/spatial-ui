define(
	[
		'../../base/DataConnection'
	],
	function(
		DataConnection
	) {

		function ShipUIDataConnection(user,url,type,format) {
			DataConnection.apply(this,[user,url,type,format]);
		}
		ShipUIDataConnection.prototype = new DataConnection();

		DataConnection.extend(ShipUIDataConnection);

		return ShipUIDataConnection;

	}
);