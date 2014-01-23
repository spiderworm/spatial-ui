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

		function MockServiceConnection(shipID) {
			var instance = instances.find(arguments);
			if(instance) {
				return instance;
			}
			instances.add(this,arguments);

			var model = this._model = new Model({
				controls: {
					'helm/impulse': {
						label: 'impulse engines',
						description: 'impulse engines provide traditional Newtonian movement around space',
						min: 0,
						max: 100,
						dataPath: 'helm/impulse'
					},
					'engineering/energy/levels/impulse': {
						label: 'impulse energy levels',
						description: 'power provided to the impulse engines (manufacturer recommended level: 100)',
						min: 0,
						max: 200,
						dataPath: 'engineering/energy/levels/impulse'
					},
					'engineering/energy/levels/tubes': {
						label: 'tube energy levels',
						description: 'power provided to the tubes (manufacturer recommended level: 100)',
						min: 0,
						max: 200,
						dataPath: 'engineering/energy/levels/tubes'
					},
					'engineering/energy/levels/phasers': {
						label: 'phasers energy levels',
						description: 'power provided to the phasers (manufacturer recommended level: 100)',
						min: 0,
						max: 200,
						dataPath: 'engineering/energy/levels/phasers'
					},
					'weapons/torpedos/stock': {
						label: 'torpedos',
						description: 'current stock of torpedos',
						outputOnly: true,
						dataPath: 'weapons/ammo/torpedos'
					},
					'weapons/phasers/switch': {
						label: 'phasers',
						description: 'enable/disable phasers',
						button: true,
						allowedValues: [true,false],
						valuesMap: [
							{
								value: true,
								label: 'enabled'
							},
							{
								value: false,
								label: 'disabled'
							}
						],
						dataPath: 'weapons/phasers/enabled'
					},
					'weapons/phasers/frequency': {
						label: 'phasers frequency',
						description: 'set phasers frequency',
						allowedValues: ['A','B','C','D'],
						dataPath: 'weapons/phasers/frequency'
					}
				},
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
		MockServiceConnection.prototype.getModel = function() {
			return this._model;
		}

		return MockServiceConnection;

	}
);