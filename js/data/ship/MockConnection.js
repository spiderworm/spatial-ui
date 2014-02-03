define(
	[
		'../../base/Model',
		'../../util/InstanceStore'
	],
	function(
		Model,
		InstanceStore
	) {

		var instances = new InstanceStore();

		function MockShipValuesConnection(shipID) {
			var instance = instances.find(arguments);
			if(instance) {
				return instance;
			}
			instances.add(this,arguments);

			var model = this._model = new Model({
				helm: {
					impulse: 10
				},
				engineering: {
					energy: {
						levels: {
							impulse: 150,
							tubes: 100,
							phasers: 25
						}
					}
				},
				weapons: {
					ammo: {
						torpedos: 15
					},
					phasers: {
						enabled: true,
						frequency: 'C'
					}
				},
				systems: {
					tubes: {
						1: {
							currentAmmo: 'torpedo',
							loadedPercent: .5,
							fire: false,
							keepLoaded: false,
							autoFire: false
						},
						2: {
							currentAmmo: 'nuke',
							loadedPercent: 1,
							fire: false,
							keepLoaded: true,
							autoFire: true
						}
					}
				}
			});

			window.setInterval(
				function() {
					model.weapons.ammo.torpedos++;
					model.weapons.ammo.setUpdated();
				},
				1000
			);

		}
		MockShipValuesConnection.prototype.getModel = function() {
			return this._model;
		}

		return MockShipValuesConnection;

	}
);