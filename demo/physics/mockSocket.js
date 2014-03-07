importScripts('../base/requireBootstrap.js');
requireBoostrap('../../js');

require(
	[
		'../demo/physics/PhysicsService',
		'../demo/base/MockSocket'
	],
	function(
		PhysicsService,
		MockSocket
	) {

		var service = new PhysicsService();
		var socket = new MockSocket(service,'osc');

	}
);