define(
	[
		'../../base/EventObject'
	],
	function(
		EventObject
	) {

		function MockServer(url) {
			EventObject.apply(this);
			var worker = this.__worker = new Worker(url);
			var server = this;
			this.__worker.addEventListener(
				'message',
				function(e) {
					server._fire('message-ready',[e.data]);
				}
			);
		}
		MockServer.prototype = new EventObject();
		MockServer.prototype.onMessage = function(callback) {
			return this._on('message-ready',callback);
		}
		MockServer.prototype.sendMessage = function(msg) {
			if(msg instanceof Array) {
				for(var i in msg) {
					this.__worker.postMessage(msg[i].serialize());
				}
			} else {
				this.__worker.postMessage(msg);
			}
		}

		return MockServer;

	}
);