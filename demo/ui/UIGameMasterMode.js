define(
	[
		'../base/ServiceMode'
	],
	function(
		ServiceMode
	) {

		function UIGameMasterMode() {
			ServiceMode.apply(this);
			this.setData(
				{
					ui: {
						screens: {
							type: 'screen-group',
							0: {
								type: 'screen',
								label: 'helm',
								visualization: {
									type: 'visualization',
									path: '/camera1'
								},
								panels: {
									type: 'panel-group',
									panel1: {
										type: 'panel',
										label: "engines",
										x: 0,
										y: 0,
										z: 1,
										width: 10,
										height: 8,
										controls: {
											type: 'control-group',
											steering: {
												type: "control",
												x: 0,
												y: 0,
												z: 1,
												width: 8,
												height: 5.75,
												path: "/controls/helm/steering"
											}
										}
									}
								}
							},
							1: {
								type: 'screen',
								label: 'weapons',
								panels: {
									type: 'panel-group',
									0: {
										type: 'panel',
										label: 'Torpedos',
										x: 0,
										y: 0,
										z: 0,
										controls: {
											type: 'control-group',
											0: {
												type: 'control',
												x: 0,
												y: 0,
												z: 1,
												width: 3,
												height: .5,
												path: '/controls/weapons/torpedos/stock'
											},
											1: {
												type: 'control',
												x: 0,
												y: 1,
												z: 1,
												width: 3,
												height: .5,
												path: '/controls/systems/tubes'
											},
											2: {
												type: 'control',
												x: 0,
												y: 4,
												z: 1,
												width: 12,
												height: .5,
												path: '/controls/engineering/energy/levels/tubes'
											}
										}
									},
									1: {
										type: 'panel',
										label: 'Phasers',
										x: 0,
										y: 8,
										z: 2,
										width: 3,
										height: .5,
										controls: {
											type: 'control-group',
											0: {
												type: 'control',
												path: '/controls/weapons/phasers/switch',
												x: 0,
												y: 3,
												z: 1,
												width: 3,
												height: .5
											},
											1: {
												type: 'control',
												path: '/controls/weapons/phasers/frequency',
												x: 0,
												y: 4,
												z: 1,
												width: 3,
												height: .5
											},
											2: {
												type: 'control',
												path: '/controls/engineering/energy/levels/phasers',
												x: 0,
												y: 5,
												z: 1,
												width: 3,
												height: .5
											}
										}
									}
								}
							},
							2: {
								type: 'screen',
								label: 'engineering'
							}
						}
					}
				}
			);


		}
		UIGameMasterMode.id = "gamemaster";
		UIGameMasterMode.prototype = new ServiceMode();
		UIGameMasterMode.prototype.constructor = UIGameMasterMode;

		return UIGameMasterMode;

	}
);