if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
	[
		'./OSCMessage'
	],
	function define_OSCClient(OSCMessage)
	{
		var log = function(){};
		log = console.log.bind(console, '| OSCClient | ');

		var len = function len(b) 
		{
			if (typeof(b.byteLength) === 'undefined')
				{ return b.length; }
			else
				{ return b.byteLength; }
		}

		var sz = function sz(b)
		{
			if (typeof(b.readUInt32BE) !== 'undefined')
				{ return b.readUInt32BE(0); }
			else if (b instanceof ArrayBuffer)
				{ return (new DataView(b)).getUint32(0, false); }
			else
				{ throw new Error("buffer not a buffer"); }
		}

		function OSCClient(config, receiver)
		{
			this._timeFix = 0;
			this.receiver = receiver;
			if (config.type == 'udp')
			{

			}
			else if (config.type == 'websocket')
			{
				this.connection = new WebSocketConnection(config.url,
					this.onError.bind(this),
					this.onMessage.bind(this));
			}

			if (config.keepalive > 0)
			{
				setInterval((function ()
				{
					this.connection.send((new OSCMessage("/ping")).serialize());
				}).bind(this), config.keepalive);
			}

			this.__defineGetter__('ready', (function getReady()
				{ return this.connection.isReady; }).bind(this));
		}

		OSCClient.prototype.onError = function onError(error)
		{ log(error); }

		OSCClient.prototype.onMessage = function onMessage(connection, buffer)
		{
			try
			{
				log("onMessage:", buffer);
				var message = new OSCMessage(buffer);
				if (message.address === "/pong")
				{
					var timestamp = message.getParameterValue(0);
					if (timestamp)
					{
						this._timeFix = new Date().getTime() - timestamp;
					}
					log("pong: " + message.toString() + " ~ " + this._timeFix);
					return;
				}
				else if (message.address === "/ping")
					{ return this.sendMessage(new OSCMessage("/pong")); }
				
				log("Client received: " + message.toString());

				if (message.buffer)
				{
					var dispatch = (function dispatch(a)
					{
						for (var i = 0; i < a.length; ++i)
							{ this.receiver.receiveMessage(a[i]); }
					}).bind(this, message.buffer);

					var now = new Date().getTime();
					var time = message.timestamp;
					if (time == null || time == 0 || ((time + this._timeFix) <= now))
					{
						dispatch();
					}
					else
					{
						setTimeout(dispatch, (time + this._timeFix) - now);
					}
				}
				else
				{
					this.receiver.receiveMessage(message);
				}
			}
			catch (err)
			{ this.onError(err); }
		}

		OSCClient.prototype.sendMessage = function sendMessage(message)
		{
			this.connection.send(message.serialize());
		}

		function UDPConnection(host, inPort, outPort)
		{
			this.isReady = false;
		}

		function WebSocketConnection(url, onError, onMessage)
		{
			var WebSocket;
			if (typeof(window) === 'undefined')
			{
				WebSocket = require('ws');
				//len = function (b) { return b.length; }
			}
			else
			{
				WebSocket = window.WebSocket;
				//len = function (b) { return b.byteLength; }
			}

			this.onMessageCB = onMessage;
			this.isReady = false;

			log("Websocket client connecting to: " + url);
			this.socket = new WebSocket(url, 'osc');
			this.socket.binaryType = "arraybuffer";

			this.inbox = {
				expected: null,
				total: 0,
				buffers: []
			}
			this.socket.addEventListener('error', function (error)
				{ onError(error); });
			this.socket.addEventListener('message', this.onMessage.bind(this));
			this.socket.addEventListener('open', (function ()
			{
				log("Client opened websocket connection.");
				this.isReady = true;
			}).bind(this));
		}

		WebSocketConnection.prototype.onMessage = function onMessage(event)
		{
			this.onMessageCB(this, (new Uint8Array(event.data)).buffer);
		}

		WebSocketConnection.prototype.send = function send(buffer)
		{
			if (this.socket.readyState != 1)
			{
				log("Cannot send, socket not open: " + this.socket.readyState);
				return;
			}
			
			this.socket.send(buffer);
		}

		return OSCClient;
	}
);