importScripts('../../../js/external/require.js');

require.config({
	baseUrl: '../../../js/'
});

require(
	[
		'../demo-resources/services/util/MockWebSocketServer',
		'data/util/dataInterpreters'
	],
	function(
		MockWebSocketServer,
		interpreters
	) {

		var server = new MockWebSocketServer(interpreters.json);

		server.setData({
			"connectionDefinitions": {
				"controls": {
					"url": "demo-resources/services/controls.json",
					"type": "ajax",
					"format": "json"
				},
				"values": {
					"url": "demo-resources/services/values/websocket.osc.js",
					"type": "mock-websocket",
					"format": "osc"
				},
				"ui": {
					"url": "demo-resources/services/ui/websocket.osc.js",
					"type": "mock-websocket",
					"format": "osc"
				},
				"camera1": {
					"url": "demo-resources/services/visualization/camera1/websocket.json.js",
					"type": "mock-websocket",
					"format": "json"
				},
				"physics": {
					"url": "demo-resources/services/physics/websocket.json.js",
					"type": "mock-websocket",
					"format": "json"
				}
			}
		});

		server.send();

	}
);