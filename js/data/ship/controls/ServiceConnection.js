define(
	[
		'./DataConnection'
	],
	function(
		ShipControlsDataConnection
	) {

		function ShipControlsServiceConnection(user,url) {
			var instance = ShipControlsServiceConnection.findInstance(arguments);
			if(instance) {
				return instance;
			}
			ShipControlsServiceConnection.addInstance(this,arguments);

			ShipControlsDataConnection.apply(this,arguments);
		}
		ShipControlsServiceConnection.prototype = new ShipControlsDataConnection();

		ShipControlsDataConnection.extend(ShipControlsServiceConnection);

		return ShipControlsServiceConnection;

	}
);