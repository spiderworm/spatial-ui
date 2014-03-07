importScripts('../util/requireBootstrap.js');
requireBoostrap('../../js');

require(
	[
		'../demo/ui/UIService',
		'../demo/util/MockSocket'
	],
	function(
		UIService,
		MockSocket
	) {

		var service = new UIService();
		var socket = new MockSocket(service,'osc');

	}
);