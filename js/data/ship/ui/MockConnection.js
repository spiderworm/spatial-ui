define(
	[
		'../../base/Connection',
		'../../util/comm'
	],
	function(
		Connection,
		comm
	) {

		function MockShipUIDataConnection(user,url) {
			Connection.apply(this);

			connection = this;

			comm.ajax(
				url,
				function(response) {
					connection._model.overwrite(response);
					connection._setConnected();
				}
			);
		}
		MockShipUIDataConnection.prototype = new Connection();


		return MockShipUIDataConnection;

	}
);