importScripts('../base/requireBootstrap.js');
requireBoostrap('../../js');

require(
	[
		'../demo/story/StoryService',
		'../demo/base/MockSocket'
	],
	function(
		StoryService,
		MockSocket
	) {

		var service = new StoryService();
		var socket = new MockSocket(service,'osc');

	}
);