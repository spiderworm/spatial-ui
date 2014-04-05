define(
	[
		'../base/MockService',
		'../base/gameModes',
		'./StoryStartupMode',
		'./StoryGameplayMode'
	],
	function(
		MockService,
		gameModes,
		StoryStartupMode,
		StoryGameplayMode
	) {

		function StoryService() {
			MockService.apply(this,['story']);
			this.setMode(new StoryStartupMode());
			this.addMode(new StoryGameplayMode());
		}
		StoryService.prototype = new MockService();

		return StoryService;

	}
);