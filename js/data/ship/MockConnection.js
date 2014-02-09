define(
	[
		'./DataConnection',
		'../util/comm'
	],
	function(
		ShipValuesDataConnection,
		comm
	) {

		function MockShipValuesConnection(user,url) {
			var instance = MockShipValuesConnection.findInstance(arguments);
			if(instance) {
				return instance;
			}
			MockShipValuesConnection.addInstance(this,arguments);

			ShipValuesDataConnection.apply(this,[]);

			var connection = this;

			comm.ajax(
				url,
				function(response) {
					connection._model.overwrite(response);
					connection._setConnected();
					
					window.setInterval(
						function() {
							connection._model.weapons.ammo.torpedos++;
							connection._model.weapons.ammo.setUpdated();
						},
						1000
					);

				}
			);

		}
		MockShipValuesConnection.prototype = new ShipValuesDataConnection();

		ShipValuesDataConnection.extend(MockShipValuesConnection);

		return MockShipValuesConnection;

	}
);