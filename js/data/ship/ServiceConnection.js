define(
	[
		'./DataConnection',
		'../util/comm'
	],
	function(
		ShipValuesDataConnection,
		comm
	) {

		function ShipValuesServiceConnection(user,url) {
			var instance = ShipValuesServiceConnection.findInstance(arguments);
			if(instance) {
				return instance;
			}
			ShipValuesServiceConnection.addInstance(this,arguments);

			ShipValuesDataConnection.apply(this,[]);

			var connection = this;

			comm.ajax(
				url,
				function(response) {
					connection._model.overwrite(response);
					connection._setConnected();
				}
			);

		}
		ShipValuesServiceConnection.prototype = new ShipValuesDataConnection();

		ShipValuesDataConnection.extend(ShipValuesServiceConnection);

		return ShipValuesServiceConnection;

	}
);