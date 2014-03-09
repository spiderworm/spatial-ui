define(
	[
		'base/EventObject',
		'data/DataChannel',
		'./gameModes'
	],
	function(
		EventObject,
		DataChannel,
		gameModes
	) {

		function MockService(namespace) {
			EventObject.apply(this);
			this.namespace = namespace;
			this._serviceConnections = {};
			this._data = {};
			this._modes = {};
			this._story = null;
			this.mode = null;

			var service = this;
			this.subscribeToStory(function(storyService) {
				service._story = storyService;
				storyService.subscribeToModeID(function(id) {
					service.setModeByID(id);
				});
			});

			this.onModeChange(function(mode) {
				service.setData(mode ? mode.data : {});
				service.send();
			});
		}
		MockService.prototype = new EventObject();

		MockService.prototype.subscribeToStory = function(callback) {
			var handler = this.onServiceConnection(function(siblingService) {
				if(siblingService.namespace === "story") {
					callback(siblingService);
				}
			});
			if(this._serviceConnections['story']) {
				handler.fire([this._serviceConnections['story']]);
			}
			return handler;
		}

		MockService.prototype.onServiceConnection = function(callback) {
			return this._on('service-connection',callback);
		}

		MockService.prototype.addMode = function(mode) {
			this._modes[mode.id] = mode;
		}

		MockService.prototype.setMode = function(mode) {
			if(mode) {
				this.addMode(mode);
			}
			if(this.mode !== mode) {
				this.mode = mode;
				if(mode) {
					this._data = mode.data;
				} else {
					this._data = {};
				}
				this.sendClear();
				this.send();
				this._fire('mode-change',[mode]);
			}
		}

		MockService.prototype.setModeByID = function(modeID) {
			this.setMode(this._modes[modeID]);
		}

		MockService.prototype.setStoryModeID = function(modeID) {
			if(!this._story) {
				throw new Error('not connected to story');
			}
			this._story.setModeID(modeID);
		}

		MockService.prototype.subscribeToMode = function(callback) {
			var handler = this.onModeChange(callback);
			handler.fire([this.mode]);
			return handler;
		}

		MockService.prototype.onModeChange = function(callback) {
			return this._on('mode-change',callback);
		}

		MockService.prototype.onSend = function(callback) {
			return this._on('send',callback);
		}

		MockService.prototype.getData = function(path) {

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

		MockService.prototype.addServiceConnection = function(connection) {
			this._serviceConnections[connection.namespace] = connection;
			this._fire('service-connection',[connection]);
		}

		MockService.prototype.setData = function(data) {
			this._data = data;
		}

		MockService.prototype.updateData = function(a,b) {
			if(arguments.length === 1) {
				dataUtil.update(this._data,a);
			}
			if(arguments.length === 2) {
				dataUtil.updatePath(this._data,a,b);
			}
		}

		MockService.prototype.setDataReceived = function(data) {
			this._fire('data-received',[data]);
		}

		MockService.prototype.onDataReceived = function(a,b) {
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

		MockService.prototype.send = function() {
			this.__sendData(this._data);
		}

		MockService.prototype.sendClear = function() {
			this._fire('send',[{'@clear': 'ui'}]);
		}

		MockService.prototype.sendUpdate = function(update) {
			this.updateData(update);
			this.__sendData(update);
		}

		MockService.prototype.__sendData = function(data) {
			this._fire('send',[data]);
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















		return MockService;

	}
);