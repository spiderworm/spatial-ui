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
		MockServiceConnection.prototype.setKeepLoaded = function(tube,keepLoaded) {
			tube.keepLoaded = keepLoaded ? true : false;
			tube.setUpdated();
			if(tube.keepLoaded) {
				this.__updateTubeLoading(tube);
			}
		}
		MockServiceConnection.prototype.setTubeAutoFire = function(tube,autoFire) {
			tube.autoFire = autoFire ? true : false;
			tube.setUpdated();
		}
		MockServiceConnection.prototype.loadTube = function(tube,ammo) {
			tube.targetAmmo = ammo;
			this.__updateTubeLoading(tube);
		}
		MockServiceConnection.prototype.unloadTube = function(tube) {
			tube.targetAmmo = null;
			if(tube.keepLoaded) {
				tube.keepLoaded = false;
				tube.setUpdated();
			}
			this.__updateTubeLoading(tube);
		}
		MockServiceConnection.prototype.__updateTubeLoading = function(tube) {

			function load() {
				if(!tube.targetAmmo) {
					return;
				}
				if(tube.targetAmmo === tube.currentAmmo && tube.loadedPercent === 1) {
					return;
				}
				if(!tube.currentAmmo) {
					tube.currentAmmo = tube.targetAmmo;
				}
				tube.loadedPercent += tube.loadSpeed;
				if(tube.loadedPercent > 1) {
					tube.loadedPercent = 1;
				}
				tube.setUpdated();
			}

			function unload() {
				if(!tube.currentAmmo) {
					return;
				}
				tube.loadedPercent -= tube.loadSpeed;
				if(tube.loadedPercent < 0) {
					tube.loadedPercent = 0;
				}
				if(tube.loadedPercent === 0) {
					tube.currentAmmo = null;
				}
				tube.setUpdated();
			}

			if(tube.__loadTimeout) {
				clearTimeout(tube.__loadTimeout);
			}

			if(tube.targetAmmo && tube.targetAmmo === tube.currentAmmo && tube.loadedPercent === 1) {
				return;
			}

			if(!tube.targetAmmo && !tube.currentAmmo) {
				return;
			}

			if(tube.targetAmmo) {
				load();
			} else {
				unload();
			}

			var connection = this;
			tube.__loadTimeout = setTimeout(
				function() {
					connection.__updateTubeLoading(tube);
				}
			);
		}

		return MockServiceConnection;

	}
)