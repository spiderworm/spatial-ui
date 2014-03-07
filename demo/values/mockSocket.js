importScripts('../util/requireBootstrap.js');
requireBoostrap('../../js');

require(
	[
		'../demo/values/ValuesService',
		'../demo/util/MockSocket'
	],
	function(
		ValuesService,
		MockSocket
	) {

		var service = new ValuesService();
		var socket = new MockSocket(service,'osc');

	}
);