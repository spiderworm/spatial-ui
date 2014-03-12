define(
	[
		'../../js/base/EventObject',
		'../../js/data/DataChannel',
		'../../js/util/now',
		'./ServicePiece'
	],
	function(
		EventObject,
		DataChannel,
		now,
		ServicePiece
	) {

		function MockService(namespace) {
			ServicePiece.apply(this);
			this.namespace = namespace;
			this._serviceConnections = {};
			this._modes = {};
			this._modeHandlers = [];
			this._story = null;
			this.mode = null;

			var service = this;
			this.subscribeToStory(function(storyService) {
				service._story = storyService;
				storyService.subscribeToModeID(function(id) {
					service.setModeByID(id);
				});
			});
		}
		MockService.prototype = new ServicePiece();

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
				while(this._modeHandlers[0]) {
					var handler = this._modeHandlers.shift();
					handler.off();
				}
				if(mode) {
					var service = this;
					var handler = mode.outbox.onNew(function() {
						var packets = mode.outbox.pullMessages();
						service.outbox.add(packets);
					});
					this._modeHandlers.push(handler);
					handler.fire();

					handler = this.onDataReceived(function(data) {
						mode.setDataReceived(data);
					});
					this._modeHandlers.push(handler);

					this.mode = mode;
					this.sendClear();
					mode.send();
				}
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

		MockService.prototype.addServiceConnection = function(connection) {
			this._serviceConnections[connection.namespace] = connection;
			this._fire('service-connection',[connection]);
		}





		return MockService;

	}
);