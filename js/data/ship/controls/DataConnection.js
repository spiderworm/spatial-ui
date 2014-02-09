define(
	[
		'../../base/Connection',
		'../../util/comm'
	],
	function(
		DataConnection,
		comm
	) {

		function ShipControlsDataConnection(user,url) {
			DataConnection.apply(this);

			if(user && url) {

				var connection = this;
				comm.ajax(
					url,
					function(response) {
						connection._model.overwrite(response);
						connection._setConnected();
					}
				);
			
			}

		}
		ShipControlsDataConnection.prototype = new DataConnection();

		DataConnection.extend(ShipControlsDataConnection);



		return ShipControlsDataConnection;

	}
);