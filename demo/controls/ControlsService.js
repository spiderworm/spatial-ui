define(
	[
		'../base/MockService',
		'./ControlsGameplayMode'
	],
	function(
		MockService,
		ControlsGameplayMode
	) {

		function ControlsService() {
			MockService.apply(this,['controls']);
			this.setMode(new ControlsGameplayMode());
		}
		ControlsService.prototype = new MockService();

		return ControlsService;

	}
);