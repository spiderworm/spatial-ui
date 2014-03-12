define(
	[
		'../base/MockService',
		'./Camera1GameplayMode'
	],
	function(
		MockService,
		Camera1GameplayMode
	) {

		function Camera1Service() {
			MockService.apply(this,['camera1']);

			this.setMode(new Camera1GameplayMode());
		}
		Camera1Service.prototype = new MockService();

		return Camera1Service;

	}
);