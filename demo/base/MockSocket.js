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

		try {

		function MockSocket(service,dataFormat) {
			try {

				this._service = service;
				var interpreter = dataInterpreters[dataFormat];
				var channel = this._channel = new ServiceDataChannel(interpreter);
				
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

				var socket = this;
				service.outbox.onNew(function() {
					socket._checkMessages();
				});
				this._checkMessages();

			} catch(e) {
				console.info(e);
			}
		}
		MockSocket.prototype._checkMessages = function() {
			var packets = this._service.outbox.pullMessages();
			for(var i in packets) {
				this._channel.send(packets[i].data,packets[i].timestamp);
			}
		}


		} catch(e) {
			console.info(e);
		}

		return MockSocket;

	}
);