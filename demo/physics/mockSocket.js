importScripts('../util/requireBootstrap.js');
requireBoostrap('../../js');

require(
	[
		'../demo/physics/PhysicsService',
		'../demo/util/MockSocket'
	],
	function(
		PhysicsService,
		MockSocket
	) {

		var service = new PhysicsService();
		var socket = new MockSocket(service,'osc');

	}
);