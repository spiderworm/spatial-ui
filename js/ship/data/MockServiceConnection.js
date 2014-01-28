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
						valueMap: [
							{
								value: true,
								display: 'enabled'
							},
							{
								value: false,
								display: 'disabled'
							}
						],
						dataPath: 'weapons/phasers/enabled'
					},
					'weapons/phasers/frequency': {
						label: 'phasers frequency',
						description: 'set phasers frequency',
						allowedValues: ['A','B','C','D'],
						dataPath: 'weapons/phasers/frequency'
					},
					'systems/tubes': {
						label: 'tubes',
						description: 'stuff',
						subControls: [
							'systems/tubes/1',
							'systems/tubes/2'
						]
					},
					'systems/tubes/1': {
						label: 'tube 1',
						inlineControls: [
							{
								dataPath: 'systems/tubes/1/currentAmmo',
								outputOnly: true
							},
							{
								dataPath: 'systems/tubes/1/loadedPercent',
								outputOnly: true
							},
							{
								dataPath: 'systems/tubes/1/fire',
								button: true,
								allowedValues: [true,false],
								display: 'fire'
							},
							{
								label: 'auto fire',
								dataPath: 'systems/tubes/1/autoFire',
								checkbox: true,
								allowedValues: [true,false]
							}
						],
						subControls: [
							{
								inlineControls: [
									{
										allowedValues: [null,'torpedos'],
										valueMap: [
											{
												value: null,
												display: 'none'
											}
										]
									},
									{
										button: true,
										allowedValues: [true,false],
										dataPath: 'systems/tubes/1/load',
										display: 'load'
									},
									{
										button: true,
										allowedValues: [true,false],
										dataPath: 'systems/tubes/1/unload',
										display: 'unload'
									},
									{
										checkbox: true,
										allowedValues: [true,false],
										dataPath: 'systems/tubes/1/keepLoaded',
										label: 'keep loaded'
									}
								]
							}
						]
					},
					'systems/tubes/2': {
						label: 'tube 2',
						inlineControls: [
							{
								dataPath: 'systems/tubes/2/currentAmmo',
								outputOnly: true
							},
							{
								dataPath: 'systems/tubes/2/loadedPercent',
								outputOnly: true
							},
							{
								dataPath: 'systems/tubes/2/fire',
								button: true,
								allowedValues: [true,false],
								display: 'fire'
							},
							{
								label: 'auto fire',
								dataPath: 'systems/tubes/2/autoFire',
								checkbox: true,
								allowedValues: [true,false]
							}
						],
						subControls: [
							{
								inlineControls: [
									{
										allowedValues: [null,'torpedos'],
										valueMap: [
											{
												value: null,
												display: 'none'
											}
										]
									},
									{
										button: true,
										allowedValues: [true,false],
										dataPath: 'systems/tubes/2/load',
										display: 'load'
									},
									{
										button: true,
										allowedValues: [true,false],
										dataPath: 'systems/tubes/2/unload',
										display: 'unload'
									},
									{
										checkbox: true,
										allowedValues: [true,false],
										dataPath: 'systems/tubes/2/keepLoaded',
										label: 'keep loaded'
									}
								]
							}
						]
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
				},
				systems: {
					tubes: {
						1: {
							currentAmmo: 'torpedo',
							loadedPercent: .5,
							fire: false
						},
						2: {
							currentAmmo: 'nuke',
							loadedPercent: 1,
							fire: false
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
		MockServiceConnection.prototype.getModel = function() {
			return this._model;
		}

		return MockServiceConnection;

	}
);