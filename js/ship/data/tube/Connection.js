define(
	[
		'../../../base/data/Connection'
	],
	function(
		DataConnection
	) {

		function TubeDataConnection(user,tube) {
			DataConnection.apply(this,[tube]);
		}
		TubeDataConnection.prototype = new DataConnection();

		return TubeDataConnection;

	}
);