define(
	[
		'../base/ServiceMode'
	],
	function(
		ServiceMode
	) {

		function StoryStartupMode() {
			ServiceMode.apply(this);
			this.data = {
				"story": {
					"connectionDefinitions": {
						"ui": {
							"url": "demo/ui/mockSocket.js",
							"type": "mock-websocket",
							"format": "osc"
						}
					}
				}
			};
		}
		StoryStartupMode.id = "startup";
		StoryStartupMode.prototype = new ServiceMode();
		StoryStartupMode.prototype.constructor = StoryStartupMode;

		return StoryStartupMode;
	}
);