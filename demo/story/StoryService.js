define(
	[
		'../base/MockService'
	],
	function(
		MockService
	) {

		function StoryService() {
			MockService.apply(this);

			this.setData({
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
			});

		}
		StoryService.prototype = new MockService();

		return StoryService;

	}
);