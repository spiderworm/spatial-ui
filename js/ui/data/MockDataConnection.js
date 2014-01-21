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

		function MockViewDataConnection(user) {

			var instance = instances.find(arguments);
			if(instance) {
				return instance;
			}
			instances.add(this,arguments);

			this._model = new Model(
				{
					screens: [
						{
							id: 'weapons',
							display: "Weapons",
							panels: [
								{
									display: 'Torpedos',
									controls: [
										{
											path: 'jsx!weapons/ui/TorpedoStockControl'
										},
										{
											path: 'jsx!weapons/ui/TubesControl'
										},
										{
											path: 'jsx!engineering/ui/TubesEnergyLevelControl'
										}
									]
								},
								{
									display: 'Phasers',
									controls: [
										{
											path: 'jsx!weapons/ui/PhasersSwitchControl'
										},
										{
											path: 'jsx!weapons/ui/PhasersFrequencyControl'
										},
										{
											path: 'jsx!engineering/ui/PhasersEnergyLevelControl'
										}
									]
								}
							]
						},
						{
							id: 'engineering',
							display: "Engineering",
							panels: [
								{
									display: 'Weapon Power Levels',
									controls: [
										{
											path: 'jsx!engineering/ui/PhasersEnergyLevelControl'
										}
									]
								}
							]
						},
						{
							id: 'helm',
							display: "Helm",
							panels: []
						}
					]
				}
			);

		}

		MockViewDataConnection.prototype.getModel = function() {
			return this._model;
		}



		return MockViewDataConnection;
	}

);