define(
	[
		'../../../base/Model',
		'../../ship/controls/connectionFactory'
	],
	function(
		Model,
		shipDataConnectionFactory
	) {

		function MockUserShipDataConnection(user) {

			this._model = new Model({
				screens: [
					{
						id: 'weapons',
						display: "Weapons",
						panels: [
							{
								display: 'Torpedos',
								controls: [
									{
										path: 'weapons/torpedos/stock'
									},
									{
										path: 'systems/tubes'
									},
									{
										path: 'engineering/energy/levels/tubes'
									}
								],
								x: 0,
								y: 0,
								z: 1
							},
							{
								display: 'Phasers',
								controls: [
									{
										path: 'weapons/phasers/switch'
									},
									{
										path: 'weapons/phasers/frequency'
									},
									{
										path: 'engineering/energy/levels/phasers'
									}
								],
								x: 0,
								y: 8,
								z: 2
							},
							{
								display: 'a test',
								controls: [
								],
								x: 0,
								y: 14,
								z: 3
							},
							{
								display: 'another test',
								controls: [
								],
								x: 7,
								y: 14,
								z: 4
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
										path: 'engineering/energy/levels/phasers'
									},
									{
										path: 'engineering/energy/levels/tubes'
									}
								],
								x: 0,
								y: 0,
								z: 5
							},
							{
								display: 'Helm Power Levels',
								controls: [
									{
										path: 'engineering/energy/levels/impulse'
									}
								],
								x: 9,
								y: 0,
								z: 6
							}
						]
					},
					{
						id: 'helm',
						display: "Helm",
						panels: [
							{
								display: 'stuff',
								controls: [
									{
										path: 'helm/impulse'
									},
									{
										path: 'engineering/energy/levels/impulse'
									}
								],
								x: 0,
								y: 0,
								z: 7
							}
						]
					}
				]
			});

		}

		MockUserShipDataConnection.prototype.getModel = function() {
			return this._model;
		}


		return MockUserShipDataConnection;

	}
);