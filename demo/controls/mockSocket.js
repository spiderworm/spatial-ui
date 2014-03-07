importScripts('../util/requireBootstrap.js');
requireBoostrap('../../js');

require(
	[
		'../demo/controls/ControlsService',
		'../demo/util/MockSocket'
	],
	function(
		ControlsService,
		MockSocket
	) {

		var service = new ControlsService();
		var socket = new MockSocket(service,'osc');

	}
);