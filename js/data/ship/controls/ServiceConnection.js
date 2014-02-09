define(
	[
		'./DataConnection'
	],
	function(
		ShipControlsDataConnection
	) {

		function ShipControlsServiceConnection(user,url,connectionType,dataFormat) {
			var instance = ShipControlsServiceConnection.findInstance(arguments);
			if(instance) {
				return instance;
			}
			ShipControlsServiceConnection.addInstance(this,arguments);

			ShipControlsDataConnection.apply(this,[user,url,connectionType,dataFormat]);
		}
		ShipControlsServiceConnection.prototype = new ShipControlsDataConnection();

		ShipControlsDataConnection.extend(ShipControlsServiceConnection);

		return ShipControlsServiceConnection;

	}
);