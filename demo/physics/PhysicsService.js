define(
	[
		'../base/MockService',
		'external/cannon',
		'./PhysicsGameplayMode'
	],
	function(
		MockService,
		CANNON,
		PhysicsGameplayMode
	) {

		function PhysicsService() {
			MockService.apply(this,['physics']);
			this.setMode(new PhysicsGameplayMode());
		}
		PhysicsService.prototype = new MockService();

		return PhysicsService;

	}
);