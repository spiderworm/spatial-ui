define(
	[
		'./MockServer'
	],
	function(
		MockServer
	) {
		
		function MockSocket(url,nothing) {
			this.__server = new MockServer(url);
			var socket = this;
			this.__server.onReady(function() {
				if(!socket.readyState !== 1) {
					socket.readyState = 1;
					socket.onopen();
				}
			});
			this.__server.onMessage(function(msg) {
				socket.onmessage({data:msg});
			});
		}
		MockSocket.prototype.readyState = 0;
		MockSocket.prototype.onopen = function() {}
		MockSocket.prototype.onmessage = function() {}
		MockSocket.prototype.send = function(text) {
			this.__server.sendMessage(text);
		}

		return MockSocket;
	}
);