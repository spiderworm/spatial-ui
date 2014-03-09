define(
	[
		'../base/ServiceMode'
	],
	function(
		ServiceMode
	) {

		function StoryGameplayMode() {
			ServiceMode.apply(this);
			this.data = {
				"story": {
					"connectionDefinitions": {
						"controls": {
							"url": "demo/controls/mockSocket.js",
							"type": "mock-websocket",
							"format": "osc"
						},
						"values": {
							"url": "demo/values/mockSocket.js",
							"type": "mock-websocket",
							"format": "osc"
						},
						"ui": {
							"url": "demo/ui/mockSocket.js",
							"type": "mock-websocket",
							"format": "osc"
						},
						"camera1": {
							"url": "demo/camera1/mockSocket.js",
							"type": "mock-websocket",
							"format": "osc"
						},
						"physics": {
							"url": "demo/physics/mockSocket.js",
							"type": "mock-websocket",
							"format": "osc"
						}
					}
				}
			};
		}
		StoryGameplayMode.id = "gameplay";
		StoryGameplayMode.prototype = new ServiceMode();
		StoryGameplayMode.prototype.constructor = StoryGameplayMode;

		return StoryGameplayMode;

	}
);