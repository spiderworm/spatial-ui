define(
	[
		'../base/Connection',
		'../util/comm'
	],
	function(
		Connection,
		comm
	) {

		function MockShipValuesConnection(user,url) {
			var instance = Connection.find(arguments);
			if(instance) {
				return instance;
			}
			Connection.add(this,arguments);

			Connection.apply(this,[]);

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
		MockShipValuesConnection.prototype = new Connection();

		return MockShipValuesConnection;

	}
);