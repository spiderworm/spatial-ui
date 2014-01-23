define(
	[
		'../Model',
		'../../util/InstanceStore',
		'../../ship/data/connectionFactory'
	],
	function(
		WeaponsModel,
		InstanceStore,
		shipDataConnectionFactory
	) {

		var instances = new InstanceStore();

		function MockServiceConnection(user,ship) {
			var instance = instances.find(arguments);
			if(instance) {
				return instance;
			}
			instances.add(this,arguments);

			this._user = user;
			this._ship = ship;

			var shipConnection = shipDataConnectionFactory.getConnection(user,ship);

			this._model = shipConnection.getModel().weapons;

			var model = this._model;

			setInterval(function() {
				model.ammo.torpedos++;
				model.ammo.setUpdated();
			},1000);

		}
		MockServiceConnection.prototype.getModel = function() {
			return this._model;
		}
		MockServiceConnection.prototype.setPhaserFrequency = function(frequency) {
			this._model.phasers.frequency = frequency;
			this._model.phasers.setUpdated();
		}
		MockServiceConnection.prototype.enablePhasers = function() {
			this._model.phasers.enabled = true;
			this._model.phasers.setUpdated();
		}
		MockServiceConnection.prototype.disablePhasers = function() {
			this._model.phasers.enabled = false;
			this._model.phasers.setUpdated();
		}

		return MockServiceConnection;

	}
)