define(
	[
		'./DataConnection',
		'../util/comm'
	],
	function(
		ShipValuesDataConnection,
		comm
	) {

		function ShipValuesServiceConnection(user,url,connectionType,dataFormat) {
			var instance = ShipValuesServiceConnection.findInstance(arguments);
			if(instance) {
				return instance;
			}
			ShipValuesServiceConnection.addInstance(this,arguments);

			ShipValuesDataConnection.apply(this,[user,url,connectionType,dataFormat]);
		}
		ShipValuesServiceConnection.prototype = new ShipValuesDataConnection();

		ShipValuesDataConnection.extend(ShipValuesServiceConnection);

		return ShipValuesServiceConnection;

	}
);