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
		MockEngineeringDataConnection.prototype.setPhasersEnergyLevel = function(level) {
				this._energyLevels.phasers = level;
				this._energyLevels.setUpdated();
		}


		return MockEngineeringDataConnection;
		
	}
);