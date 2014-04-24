define(
	[
		'../base/MockService',
		'../base/gameModes',
		'./UIStartupMode',
		'./UIGameplayMode',
		'./UIGameMasterMode'
	],
	function(
		MockService,
		gameModes,
		UIStartupMode,
		UIGameplayMode,
		UIGameMasterMode
	) {

		function UIService() {
			MockService.apply(this,['ui']);

			var service = this;

			var startupMode = new UIStartupMode();
			service.onDataReceived("/ui/mode",function(mode) {
				if(mode === UIGameplayMode.id) {
					service.setStoryModeID(UIGameplayMode.id);
				} else if(mode === UIGameMasterMode.id) {
					console.info('test');
					service.setStoryModeID(UIGameMasterMode.id);
				}
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