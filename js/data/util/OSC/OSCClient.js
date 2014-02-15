define(
	[
		'./OSCMessage'
	],
	function define_OSCClient(OSCMessage)
	{
		function log()
		{
			//console.log.apply(console, Array.prototype.slice.call(arguments));
		}

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
		{ log(error.message); }

		OSCClient.prototype.onMessage = function onMessage(connection, buffer)
		{
			try
			{
				var message = new OSCMessage(buffer);
				if (message.address === "/pong")
					{ return; }
				else if (message.address === "/ping")
					{ return this.sendMessage(new OSCMessage("/pong")); }

				log("Client received: " + message.toString());
				this.receiver.receiveMessage(message);
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
			this.socket = new WebSocket(url);
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
			//log(event);
			log("c - received " + len(event.data) + " bytes.");
			this.inbox.buffers.push(event.data);
			this.inbox.total += len(event.data);
			log("c - now have " + this.inbox.total + " bytes.");

			if (this.inbox.buffers.length == 1)
			{
				this.inbox.expected = sz(this.inbox.buffers[0]);
			}

			var needed = this.inbox.expected + 4;
			while (this.inbox.buffers.length > 0 && this.inbox.total >= needed)
			{
				log("c - extracting " + needed + " bytes.");
				needed -= 4;
				this.inbox.buffers[0] = this.inbox.buffers[0].slice(4);
				var buffer = new ArrayBuffer(needed);
				var view  = new Uint8Array(buffer);
				var offset = 0;

				while (needed > 0)
				{
					if (needed >= len(this.inbox.buffers[0]))
					{
						var b = this.inbox.buffers.shift();
						needed -= len(b);
						view.set(b, offset);
						offset += len(b);
					}
					else
					{
						var b = this.inbox.buffers[0];
						this.inbox.buffers[0] = b.slice(needed);
						view.set(b.slice(0,needed), offset);
						offset += needed;
						needed = 0;
					}
				}

				this.onMessageCB(this, buffer);
				this.inbox.total -= 4 + len(buffer);

				log("c - now have " + this.inbox.total + " bytes");
				if (this.inbox.buffers.length > 0)
				{
					this.inbox.expected = sz(this.inbox.buffers[0]);
					needed = this.inbox.expected + 4;
				}
			}
		}

		WebSocketConnection.prototype.send = function send(buffer)
		{
			var sz = new DataView(new ArrayBuffer(4));
			sz.setUint32(0, len(buffer), false);
			log("c -> " + (len(buffer) + 4) + " bytes");
			log(buffer);
			//if (!(buffer instanceof ArrayBuffer))
			//	{ buffer = new ArrayBuffer(buffer); }

			this.socket.send(sz.buffer);			
			this.socket.send(buffer);
		}

		return OSCClient;
	}
);