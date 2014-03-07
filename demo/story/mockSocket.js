importScripts('../util/requireBootstrap.js');
requireBoostrap('../../js');

require(
	[
		'../demo/story/StoryService',
		'../demo/util/MockSocket'
	],
	function(
		StoryService,
		MockSocket
	) {

		var service = new StoryService();
		var socket = new MockSocket(service,'osc');

	}
);