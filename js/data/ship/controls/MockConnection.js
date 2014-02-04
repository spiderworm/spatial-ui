define(
	[
		'../../../base/Model',
		'../../base/Connection',
		'../../util/comm'
	],
	function(
		Model,
		Connection,
		comm
	) {

		function MockServiceConnection(user,url) {
			var instance = Connection.find(arguments);
			if(instance) {
				return instance;
			}
			Connection.add(this,arguments);

			Connection.apply(this);

			var connection = this;
			comm.ajax(
				url,
				function(response) {
					connection._model.overwrite(response);
					connection._setConnected();
				}
			);

		}
		MockServiceConnection.prototype = new Connection();

		return MockServiceConnection;

	}
);