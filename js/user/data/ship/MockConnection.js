define(
	[
		'../../../base/Model',
		'../../../ship/data/connectionFactory'
	],
	function(
		Model,
		shipDataConnectionFactory
	) {

		function MockUserShipDataConnection(user) {

			var shipID = 'HI';

			var shipModel = shipDataConnectionFactory.getConnection(shipID).getModel();

			this._model = new Model({
				ship: shipModel,
				view: {
					screens: [
						{
							id: 'weapons',
							display: "Weapons",
							sections: [
								{
									id: 'one',
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
											]
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
											]
										}
									]
								}
							]
						},
						{
							id: 'engineering',
							display: "Engineering",
							sections: [
								{
									id: 'one',
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
											]
										},
										{
											display: 'Helm Power Levels',
											controls: [
												{
													path: 'engineering/energy/levels/impulse'
												}
											]
										}
									]
								}
							]
						},
						{
							id: 'helm',
							display: "Helm",
							sections: [
								{
									id: 'one',
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
											]
										}
									]
								}
							],
						}
					]
				}
			});

		}

		MockUserShipDataConnection.prototype.getModel = function() {
			return this._model;
		}


		return MockUserShipDataConnection;

	}
);