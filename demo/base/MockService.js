define(
	[
		'base/EventObject',
		'data/DataChannel'
	],
	function(
		EventObject,
		DataChannel
	) {

		function MockService(namespace) {
			EventObject.apply(this);
			this._data = {};
		}
		MockService.prototype = new EventObject();

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