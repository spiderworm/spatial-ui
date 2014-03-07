define(
	[
		'../base/MockService'
	],
	function(
		MockService
	) {

		function UIService() {
			MockService.apply(this);

			this.setData(
				{
					ui: {
						screens: {
							type: 'screen-group',
							index: 0,
							0: {
								index: 0,
								type: 'screen',
								label: 'helm',
								visualization: {
									type: 'visualization',
									index: 0,
									path: '/camera1'
								},
								panels: {
									type: 'panel-group',
									index: 1,
									panel1: {
										type: 'panel',
										index: 0,
										label: "engines",
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
								index: 1,
								type: 'screen',
								label: 'weapons',
								panels: {
									type: 'panel-group',
									index: 0,
									0: {
										type: 'panel',
										label: 'Torpedos',
										index: 0,
										x: 0,
										y: 0,
										z: 0,
										controls: {
											index: 0,
											type: 'control-group',
											0: {
												type: 'control',
												x: 0,
												y: 0,
												z: 1,
												path: '/controls/weapons/torpedos/stock'
											},
											1: {
												type: 'control',
												x: 0,
												y: .5,
												z: 1,
												path: '/controls/systems/tubes'
											},
											2: {
												type: 'control',
												x: 0,
												y: 2,
												z: 1,
												path: '/controls/engineering/energy/levels/tubes'
											}
										}
									},
									1: {
										type: 'panel',
										index: 1,
										label: 'Phasers',
										x: 0,
										y: 8,
										z: 2,
										controls: {
											type: 'control-group',
											index: 0,
											0: {
												type: 'control',
												index: 0,
												path: '/controls/weapons/phasers/switch'
											},
											1: {
												type: 'control',
												index: 1,
												path: '/controls/weapons/phasers/frequency'
											},
											2: {
												type: 'control',
												index: 2,
												path: '/controls/engineering/energy/levels/phasers'
											}
										}
									}
								}
							},
							2: {
								index: 2,
								type: 'screen',
								label: 'engineering'
							}
						}
					}
				}
			);

			/*
			setTimeout(function() {

				server.updateData(
					{
						ui: {
							screens: {
								3: {
									type: 'screen',
									index: 3,
									label: 'yoo-hoo'
								}
							}
						}
					}
				);

				server.send();

			}, 2000);



			setTimeout(function() {

				server.sendUpdate(
					{
						ui: {
							screens: {
								0: {
									panels: {
										type: 'panel-group',
										index: 0,
										0: {
											type: 'panel',
											index: 0,
											label: 'hey there',
											x: 10,
											y: 3,
											z: 5
										}
									}
								}
							}
						}
					}
				);


			}, 3000);
			*/

		}
		UIService.prototype = new MockService();

		return UIService;

	}
);