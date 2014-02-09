define(
	[
		'../base/DataConnection'
	],
	function(
		DataConnection
	) {

		function ShipValuesDataConnection(user,url,connectionType,dataFormat) {
			DataConnection.apply(this,[user,url,connectionType,dataFormat]);
		}
		ShipValuesDataConnection.prototype = new DataConnection();

		DataConnection.extend(ShipValuesDataConnection);

		return ShipValuesDataConnection;

	}
);