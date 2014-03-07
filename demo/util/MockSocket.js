define(
	[
		'base/EventObject',
		'./ServiceDataChannel',
		'data/util/dataInterpreters'
	],
	function(
		EventObject,
		ServiceDataChannel,
		dataInterpreters
	) {

		function MockSocket(service,dataFormat) {
			var interpreter = dataInterpreters[dataFormat];
			var channel = this._channel = new ServiceDataChannel(interpreter);
			service.onSend(function(data) {
				channel.send(data);
			});
			channel.onData(function(data) {
				service.setDataReceived(data);
			});
			channel.sendRaw('@@@ready@@@');
			service.send();
		}

		return MockSocket;

	}
);