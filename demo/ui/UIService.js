define(
	[
		'../base/MockService',
		'../base/gameModes',
		'./UIStartupMode',
		'./UIGameplayMode'
	],
	function(
		MockService,
		gameModes,
		UIStartupMode,
		UIGameplayMode
	) {

		function UIService() {
			MockService.apply(this,['ui']);

			var service = this;

			var startupMode = new UIStartupMode();
			startupMode.onDone(function() {
				service.setStoryModeID(UIGameplayMode.id);
			});
			this.addMode(startupMode);
			this.addMode(new UIGameplayMode());
		}
		UIService.prototype = new MockService();
		UIService.prototype.setMode = function(mode) {
			MockService.prototype.setMode.apply(this,arguments);
		}

		return UIService;

	}
);