importScripts('../base/requireBootstrap.js');
requireBoostrap('../../js');

require(
	[
		'../demo/values/ValuesService',
		'../demo/base/MockSocket'
	],
	function(
		ValuesService,
		MockSocket
	) {

		var service = new ValuesService();
		var socket = new MockSocket(service,'osc');

	}
);