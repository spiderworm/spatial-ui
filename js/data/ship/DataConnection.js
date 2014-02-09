define(
	[
		'../base/Connection'
	],
	function(
		DataConnection
	) {

		function ShipValuesDataConnection(user,url) {
			DataConnection.apply(this);
		}
		ShipValuesDataConnection.prototype = new DataConnection();

		DataConnection.extend(ShipValuesDataConnection);

		return ShipValuesDataConnection;

	}
);