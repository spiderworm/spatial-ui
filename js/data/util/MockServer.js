define(
	[
		'../../base/EventObject',
		'../../util/InstanceStore'
	],
	function(
		EventObject,
		InstanceStore
	) {

		var instances = new InstanceStore();

		function MockServer(url) {
			var instance = instances.find(arguments);
			if(instance) {
				return instance;
			}
			instances.add(this,arguments);

			EventObject.apply(this);
			this._ready = false;
			var worker = this.__worker = new Worker(url);
			var server = this;
			this.__worker.addEventListener(
				'message',
				function(e) {
					if(!server._ready && e.data === "@@@ready@@@") {
						server._ready = true;
						server._fire('ready');
					} else {
						server._fire('message-ready',[e.data]);
					}
				}
			);
		}
		MockServer.prototype = new EventObject();
		MockServer.prototype.onReady = function(callback) {
			var handler = this._on('ready',callback);
			if(this._ready) {
				handler.fire();
			}
			return handler;
		}
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