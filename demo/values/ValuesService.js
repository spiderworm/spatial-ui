define(
	[
		'../base/MockService'
	],
	function(
		MockService
	) {

		function ValuesService() {
			MockService.apply(this);

			this.setData(
				{
					values: {
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
								torpedos: 0
							},
							phasers: {
								enabled: 1,
								frequency: "C"
							}
						},
						systems: {
							tubes: {
								1: {
									currentAmmo: "torpedos",
									loadedPercent: 0.5,
									fire: 0,
									keepLoaded: 0,
									autoFire: 0
								},
								2: {
									currentAmmo: 'big fat nuke',
									loadedPercent: 1,
									fire: 0,
									keepLoaded: 1,
									autoFire: 1
								}
							}
						}
					}
				}
			);

		}
		ValuesService.prototype = new MockService();

		return ValuesService;

	}
);