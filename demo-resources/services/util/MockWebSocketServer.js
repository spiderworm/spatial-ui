define(
	[

	],
	function(

	) {

		function MockWebSocketServer(interpreter){
			this._interpreter = interpreter;

			var server = this;

			self.addEventListener(
				'message',
				function(event) {
					var result = interpreter.interpret(event.data);
					console.info('message received');
					server.updateData(result);
				},
				false
			);
		}

		MockWebSocketServer.prototype.getData = function() {

			function clone(data) {
				var result = {};
				for(var i in data) {
					if(data.hasOwnProperty(i)) {
						if(typeof data[i] === "object") {
							result[i] = clone(data[i]);
						} else {
							result[i] = data[i];
						}
					}
				}
				return result;
			}

			return clone(this._data);
		}

		MockWebSocketServer.prototype.setData = function(data) {
			this._data = data;
		}

		MockWebSocketServer.prototype.updateData = function(update) {

			function delve(target,update) {
				for(var i in update) {
					if(update.hasOwnProperty(i)) {
						if(typeof update[i] === "object") {
							if(typeof target[i] !== "object") {
								target[i] = {};
							}
							delve(target[i],update[i]);
						} else {
							target[i] = update[i];
						}
					}
				}
			}

			delve(this._data,update);

		}

		MockWebSocketServer.prototype.send = function() {
			this.__sendData(this._data);
		}

		MockWebSocketServer.prototype.sendUpdate = function(update) {
			this.updateData(update);
			this.__sendData(update);
		}

		MockWebSocketServer.prototype.__sendData = function(data) {
			var message = this._interpreter.stringify(data);
			if(message instanceof Array) {
				for(var i in message) {
					self.postMessage(message[i].serialize());
				}
			} else {
				self.postMessage(message);
			}
		}


		return MockWebSocketServer;

	}
);