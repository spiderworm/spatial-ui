define(
	[
		'base/EventObject'
	],
	function(
		EventObject
	) {

		function MockWebSocketServer(interpreter){
			EventObject.apply(this);
			this._interpreter = interpreter;

			var server = this;

			self.addEventListener(
				'message',
				function(event) {
					var result = interpreter.interpret(event.data);
					console.info('message received: ' + JSON.stringify(result));
					server._fire('data-received',[result]);
				},
				false
			);
		}
		MockWebSocketServer.prototype = new EventObject();

		MockWebSocketServer.prototype.getData = function(path) {

			if(!path) {
				return dataUtil.clone(this._data);
			} else {

				var value = dataUtil.getValue(this._data,path);

				if(value && typeof value === "object") {
					return dataUtil.clone(value);
				} else {
					return value;
				}
			}

		}

		MockWebSocketServer.prototype.setData = function(data) {
			this._data = data;
		}

		MockWebSocketServer.prototype.updateData = function(a,b) {
			if(arguments.length === 1) {
				dataUtil.update(this._data,a);
			}
			if(arguments.length === 2) {
				dataUtil.updatePath(this._data,a,b);
			}
		}

		MockWebSocketServer.prototype.onDataReceived = function(a,b) {
			var callback = function() {};

			if(arguments.length === 1) {
				callback = a;
			} else if(arguments.length > 1) {
				var path = a;
				callback = function(data) {
					if(dataUtil.dataHasProp(data,path)) {
						b(dataUtil.getValue(data,path))
					}
				}
			}

			return this._on('data-received',callback);
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










		var dataUtil = {
			dataHasProp: function(data,path) {
				var result = this.delve(data,path);
				return result && result.data.hasOwnProperty(result.prop);
			},
			getValue: function(data,path) {
				var result = this.delve(data,path);
				if(result && result.data.hasOwnProperty(result.prop)) {
					return result.data[result.prop];
				}
			},
			update: function(data,update) {

				function delve(data,update) {
					for(var i in update) {
						if(update.hasOwnProperty(i)) {
							if(typeof update[i] === "object") {
								if(typeof data[i] !== "object") {
									data[i] = {};
								}
								delve(data[i],update[i]);
							} else {
								data[i] = update[i];
							}
						}
					}
				}

				delve(data,update);

			},
			updatePath: function(data,path,value) {

				var prop = path;
				var paths = path.split('/');

				while(paths.length > 0) {
					path = paths.shift();
					if(path !== "") {
						prop = path;
						if(paths.length !== 0) {
							if(!data[path]) {
								data[path] = {};
							}
							data = data[path];
						}
					}
				}

				data[prop] = value;

			},
			delve: function(data,path) {

				var prop = path;
				var paths = path.split('/');
				while(paths.length > 0) {
					path = paths.shift();
					if(path !== "") {
						prop = path;
						if(paths.length !== 0) {
							if(data[path]) {
								data = data[path];
							} else {
								return undefined;
							}
						}
					}
				}

				return {data: data, prop: prop};

			},
			clone: function(data) {
				if(data && typeof data === "object") {
					var result = {};
					for(var i in data) {
						if(data.hasOwnProperty(i)) {
							if(typeof data[i] === "object") {
								result[i] = this.clone(data[i]);
							} else {
								result[i] = data[i];
							}
						}
					}
					return result;
				}
				return data;
			}
		};



		return MockWebSocketServer;

	}
);