define(
	[
		'./Connection',
		'../../util/InstanceStore'
	],
	function(
		EngineeringDataConnection,
		InstanceStore
	) {
		
		var instances = new InstanceStore();

		function MockEngineeringDataConnection(user,ship) {
			var instance = instances.find(arguments);
			if(instance) {
				return instance;
			}
			instances.add(this,arguments);

			EngineeringDataConnection.apply(this,[user,ship]);
		}
		MockEngineeringDataConnection.prototype = new EngineeringDataConnection();
		MockEngineeringDataConnection.prototype.setSystemEnergyLevel = function(system,level) {
				this._model.energy.levels[system] = level;
				this._model.energy.levels.setUpdated();
		}

		return MockEngineeringDataConnection;
		
	}
);