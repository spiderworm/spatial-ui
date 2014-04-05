define(
	[
		'../base/EventObject',
		'./util/comm',
		'./util/MockSocket',
		'./util/dataInterpreters'
	],
	function(
		EventObject,
		comm,
		MockSocket,
		dataInterpreters
	) {






		function DataChannelBase(url,interpreter) {
			EventObject.apply(this);
			this._url = url;
			this._interpreter = interpreter;
			this._outbox = [];
		}
		DataChannelBase.prototype = new EventObject();
		DataChannelBase.prototype.open = function(callback) {
			throw new Error('not implemented');
		}
		DataChannelBase.prototype.isOpen = function() {
			throw new Error('not implemented');
		}
		DataChannelBase.prototype.send = function(obj) {
			this.sendRaw(
				this._interpreter.stringify(obj)
			);
		}
		DataChannelBase.prototype.sendRaw = function(raw) {
			this._outbox.push(raw);
			this._sendNext();
		}
		DataChannelBase.prototype.onData = function(callback) {
			return this._on('data-received',callback);
		}
		DataChannelBase.prototype.onOpened = function(callback) {
			return this._on('opened',callback);
		}
		DataChannelBase.prototype._setOpened = function() {
			this._fire('opened');
			this._sendNext();
		}
		DataChannelBase.prototype._handleRaw = function(raw) {
			var servicePacket = this._interpreter.interpret(raw);
			this._fire('data-received',[servicePacket.data,servicePacket.timestamp]);
		}
		DataChannelBase.prototype._sendNext = function() {
			if(this.isOpen() && this._outbox.length > 0) {
				var raw = this._outbox.shift();
				this._sendNow(raw);
				this._sendNext();
			}
		}
		DataChannelBase.prototype._sendNow = function(raw) {
			throw new Error('not implemented');
		}







		function AJAXDataChannel(url,interpreter) {
			DataChannelBase.apply(this,[url,interpreter]);
		}
		AJAXDataChannel.prototype = new DataChannelBase();
		AJAXDataChannel.prototype.open = function(callback) {
			var channel = this;
			comm.ajax(
				this._url,
				function(raw) {
					channel._setOpened();
					callback();
					channel._handleRaw(raw);
				}
			);
		}
		AJAXDataChannel.prototype.isOpen = function() {
			return false;
		}
		AJAXDataChannel.prototype._sendNow = function() {
			throw new Error('sending over an AJAXDataChannel is totally not supported, dude');
		}










		function WebSocketDataChannel(url,interpreter) {
			var WebServer;
			if (typeof(global) !== 'undefined')
			{
				try { WebServer = requirejs('common/data/WebServer'); }
				catch (error) {}
			}

			if (WebServer && url.indexOf(WebServer.ip) >= 0)
			{
				// use local connection instead of web socket
			}
			else
			{
				DataChannelBase.apply(this,[url,interpreter]);
				this.__socket = null;
			}
		}
		WebSocketDataChannel.prototype = new DataChannelBase();
		WebSocketDataChannel.prototype.SocketConstructor = WebSocket;
		WebSocketDataChannel.prototype.open = function(callback) {
			if(!this.__socket) {
				console.log("WebSocket: " + this._url + ", " + this._interpreter.wsProtocol);
				var socket = this.__socket = new this.SocketConstructor(
					this._url, this._interpreter.wsProtocol
				);
				socket.binaryType = "arraybuffer";

				var channel = this;

				socket.onopen = function() {
					callback();
					channel._setOpened();
				}
				socket.onmessage = function (event) {
					channel._handleRaw(event.data);
				}
				socket.onerror = function (event) {
					console.log("WS Channel error: ", event);
				}
			}
		}
		WebSocketDataChannel.prototype.isOpen = function() {
			return this.__socket && this.__socket.readyState === 1;
		}
		WebSocketDataChannel.prototype._sendNow = function(raw) {
			this.__socket.send(raw);
		}





		function MockWebSocketDataChannel(url,interpreter) {
			WebSocketDataChannel.apply(this,[url,interpreter]);
		}
		MockWebSocketDataChannel.prototype = new WebSocketDataChannel();
		MockWebSocketDataChannel.prototype.SocketConstructor = MockSocket;








		function DataChannel(url,connectionType,dataFormat) {
			var interpreter = dataInterpreters.json;
			if(dataFormat === "osc") {
				interpreter = dataInterpreters.osc;
			}
			if(connectionType.toLowerCase() === "ajax") {
				return new AJAXDataChannel(url,interpreter);
			}
			if(connectionType.toLowerCase() === "websocket") {
				return new WebSocketDataChannel(url,interpreter);
			}
			if(connectionType.toLowerCase() === "mock-websocket") {
				return new MockWebSocketDataChannel(url,interpreter);
			}
			throw new Error('invalid connection type');
		}


		return DataChannel;

	}
);