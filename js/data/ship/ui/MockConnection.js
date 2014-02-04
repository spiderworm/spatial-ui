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

			var model = this._model = new Model({
				screens: []
			});

			setTimeout(
				function() {
				
					model.screens.push(
						{
							id: 'weapons',
							display: "Weapons",
							panels: [
								{
									display: 'Torpedos',
									controls: [
										'weapons/torpedos/stock',
										'systems/tubes',
										'engineering/energy/levels/tubes'
									],
									x: 0,
									y: 0,
									z: 1
								},
								{
									display: 'Phasers',
									controls: [
										'weapons/phasers/switch',
										'weapons/phasers/frequency',
										'engineering/energy/levels/phasers'
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
						}
					);

					model.screens.push(
						{
							id: 'engineering',
							display: "Engineering",
							panels: [
								{
									display: 'Weapon Power Levels',
									controls: [
										'engineering/energy/levels/phasers',
										'engineering/energy/levels/tubes'
									],
									x: 0,
									y: 0,
									z: 5
								},
								{
									display: 'Helm Power Levels',
									controls: [
										'engineering/energy/levels/impulse'
									],
									x: 9,
									y: 0,
									z: 6
								}
							]
						}
					);

					setTimeout(

						function() {

							model.screens.push(
								{
									id: 'helm',
									display: "Helm",
									panels: [
										{
											display: 'stuff',
											controls: [
												'helm/impulse',
												'engineering/energy/levels/impulse'
											],
											x: 0,
											y: 0,
											z: 7
										}
									]
								}
							);

							model.screens.setUpdated();

						},
						5000
					);

					model.screens.setUpdated();

				},
				0
			);

		}

		MockUserShipDataConnection.prototype.getModel = function() {
			return this._model;
		}


		return MockUserShipDataConnection;

	}
);