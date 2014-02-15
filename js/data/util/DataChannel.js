define(
	[
		'../../base/EventObject',
		'../util/comm',
		'./MockSocket',
		'./dataInterpreters'
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
		}
		DataChannelBase.prototype = new EventObject();
		DataChannelBase.prototype.open = function(callback) {
			throw new Error('not implemented');
		}
		DataChannelBase.prototype.send = function(obj) {
			this._send(
				this._interpreter.stringify(obj)
			);
		}
		DataChannelBase.prototype.onData = function(callback) {
			return this._on('data-received',callback);
		}
		DataChannelBase.prototype.onOpened = function(callback) {
			return this._on('opened',callback);
		}
		DataChannelBase.prototype._setOpened = function() {
			this._fire('opened');
		}
		DataChannelBase.prototype._handleRaw = function(raw) {
			var data = this._interpreter.interpret(raw);
			this._fire('data-received',[data]);
		}
		DataChannelBase.prototype._send = function(raw) {
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










		function WebSocketDataChannel(url,interpreter) {
			DataChannelBase.apply(this,[url,interpreter]);
			this.__socket = null;
		}
		WebSocketDataChannel.prototype = new DataChannelBase();
		WebSocketDataChannel.prototype.SocketConstructor = WebSocket;
		WebSocketDataChannel.prototype.open = function(callback) {
			if(!this.__socket) {
				this.__socket = new this.SocketConstructor(
					this._url,
					"test"
				);
				this.__socket.binaryType = "arraybuffer";
				var channel = this;
				this.__socket.onopen = function() {
					callback();
					channel._setOpened();
				}
				this.__socket.onmessage = function (event) {
					channel._handleRaw(event.data);
				}
			}
		}
		WebSocketDataChannel.prototype._send = function(raw) {
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