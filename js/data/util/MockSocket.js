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
			this.__server.onMessage(function(msg) {
				if(!socket.__isOpen) {
					socket.__isOpen = true;
					socket.onopen();
				}
				socket.onmessage({data:msg});
			});
		}
		MockSocket.prototype.onopen = function() {}
		MockSocket.prototype.onmessage = function() {}
		MockSocket.prototype.send = function(text) {
			this.__server.sendMessage(text);
		}

		return MockSocket;
	}
);