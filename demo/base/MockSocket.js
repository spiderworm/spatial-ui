define(
	[
		'base/EventObject',
		'./ServiceDataChannel',
		'./SiblingServiceConnection',
		'data/util/dataInterpreters'
	],
	function(
		EventObject,
		ServiceDataChannel,
		SiblingServiceConnection,
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


			var socket = this;
			self.addEventListener(
				'message',
				function(event) {
					if(event.data === "@@@mock-socket-connect@@@") {
						var otherService = new SiblingServiceConnection(event.ports[0],service);
					}
				},
				false
			);
			
			channel.sendRaw('@@@ready@@@');
			service.send();

		}

		return MockSocket;

	}
);