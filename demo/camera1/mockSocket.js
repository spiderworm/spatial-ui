importScripts('../base/requireBootstrap.js');
requireBoostrap('../../js');

require(
	[
		'../demo/camera1/Camera1Service',
		'../demo/base/MockSocket'
	],
	function(
		Camera1Service,
		MockSocket
	) {

		var service = new Camera1Service();
		var socket = new MockSocket(service,'osc');

	}
);