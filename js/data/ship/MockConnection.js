define(
	[
		'../base/Connection',
		'../../base/Model',
		'../util/comm'
	],
	function(
		Connection,
		Model,
		comm
	) {

		function MockShipValuesConnection(user,url) {
			var instance = Connection.find(arguments);
			if(instance) {
				return instance;
			}
			Connection.add(this,arguments);

			var model = this._model = new Model();

			Connection.apply(this,[model]);

			var connection = this;

			comm.ajax(
				url,
				function(response) {
					model.overwrite(response);
					connection._setConnected();
					
					window.setInterval(
						function() {
							model.weapons.ammo.torpedos++;
							model.weapons.ammo.setUpdated();
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