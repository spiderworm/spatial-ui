define(
	[
		'base/EventObject'
	],
	function(
		EventObject
	) {


		function ServiceDataChannel(interpreter) {
			EventObject.apply(this);
			this._interpreter = interpreter;
			this._outbox = [];

			var channel = this;
			self.addEventListener(
				'message',
				function(event) {
					channel._handleRaw(event.data);
				},
				false
			);
		}
		ServiceDataChannel.prototype = new EventObject();
		ServiceDataChannel.prototype.send = function(obj,timestamp) {
			this.sendRaw(
				this._interpreter.stringify(obj,timestamp)
			);
		}
		ServiceDataChannel.prototype.sendRaw = function(raw) {
			self.postMessage(raw);
		}
		ServiceDataChannel.prototype.onData = function(callback) {
			return this._on('data-received',callback);
		}
		ServiceDataChannel.prototype._handleRaw = function(raw) {
			var servicePacket = this._interpreter.interpret(raw);
			this._fire('data-received',[servicePacket.data,servicePacket.timestamp]);
		}



		return ServiceDataChannel;

	}
);