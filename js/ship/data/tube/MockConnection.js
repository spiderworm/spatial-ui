define(
	[
		'./Connection',
		'../../../util/InstanceStore'
	],
	function(
		TubeDataConnection,
		InstanceStore
	) {

		var instances = new InstanceStore();

		function MockTubeDataConnection(user,tube) {
			var instance = instances.find(arguments);
			if(instance) {
				return instance;
			}
			instances.add(this,arguments);

			TubeDataConnection.apply(this,[user,tube]);

			var connection = this;

			tube.onUpdated(
				function() {

					if(tube.autoFire && tube.currentAmmo && tube.loadedPercent === 1) {
						connection.fire();
					}

				}
			);
		}
		MockTubeDataConnection.prototype = new TubeDataConnection();
		MockTubeDataConnection.prototype.setAutoFire = function(autoFire) {
			this._model.autoFire = autoFire ? true : false;
			this._model.setUpdated();
		}
		MockTubeDataConnection.prototype.setKeepLoaded = function(keepLoaded) {
			this._model.keepLoaded = keepLoaded ? true : false;
			this._model.setUpdated();
		}
		MockTubeDataConnection.prototype.load = function(ammo) {
			this._model.targetAmmo = ammo;
			this.__updateLoading();
		}
		MockTubeDataConnection.prototype.unload = function() {
			this._model.targetAmmo = null;
			if(this._model.keepLoaded) {
				this._model.keepLoaded = false;
				this._model.setUpdated();
			}
			this.__updateLoading();
		}
		MockTubeDataConnection.prototype.fire = function() {
			if(this._model.currentAmmo && this._model.loadedPercent === 1) {
				this._model.currentAmmo = null;
				this._model.loadedPercent = 0;
				if(!this._model.keepLoaded) {
					this._model.targetAmmo = null;
				}
				this._model.setUpdated();
				this.__updateLoading();
			}
		}
		MockTubeDataConnection.prototype.__updateLoading = function(tube) {

			var tube = this._model;

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
					connection.__updateLoading();
				}
			);
		}

		return MockTubeDataConnection;

	}
);