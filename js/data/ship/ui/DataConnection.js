define(
	[
		'../../base/Connection',
		'../../util/comm'
	],
	function(
		DataConnection,
		comm
	) {

		function ShipUIDataConnection(user,url) {
			DataConnection.apply(this);

			if(url) {
				connection = this;

				comm.ajax(
					url,
					function(response) {
						connection._model.overwrite(response);
						connection._setConnected();
					}
				);
			}
		}
		ShipUIDataConnection.prototype = new DataConnection();

		DataConnection.extend(ShipUIDataConnection);

		return ShipUIDataConnection;

	}
);