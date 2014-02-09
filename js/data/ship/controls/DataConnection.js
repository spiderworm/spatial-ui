define(
	[
		'../../base/DataConnection'
	],
	function(
		DataConnection
	) {

		function ShipControlsDataConnection(user,url,connectionType,dataFormat) {
			DataConnection.apply(this,[user,url,connectionType,dataFormat]);
		}
		ShipControlsDataConnection.prototype = new DataConnection();

		DataConnection.extend(ShipControlsDataConnection);



		return ShipControlsDataConnection;

	}
);