define(
	[
		'../../util/InstanceStore',
		'../../base/EventObject',
		'../../base/Model',
		'../util/DataChannel'
	],
	function(
		InstanceStore,
		EventObject,
		Model,
		Channel
	) {

		var dataConnectionSource = {};

		function DataConnection(user,url,connectionType,dataFormat) {
			EventObject.apply(this);
			var model = this._model = new Model();
			if(url && connectionType && dataFormat) {
				var connection = this;
				var channel = this._channel = new Channel(url,connectionType,dataFormat);
				channel.onData(function(data) {
					model.$update(data,dataConnectionSource);
				});
				channel.open(function() {
					connection._setConnected();
				});
				model.$deepOnUpdated(function(updateObj,source) {
					if(source !== dataConnectionSource) {
						channel.send(updateObj);
					}
				});
			}
		}
		DataConnection.prototype = new EventObject();
		DataConnection.prototype.getModel = function() {
			return this._model;
		}
		DataConnection.prototype.onConnected = function(callback) {
			return this._on('connected',callback);
		}
		DataConnection.prototype._setConnected = function() {
			this._fire('connected',[this]);
		}




		DataConnection.findInstance = function(signature) {
			return this.__instances.find(signature);
		}
		DataConnection.addInstance = function(instance,signature) {
			this.__instances.add(instance,signature);
		}
		DataConnection.extend = function(Constructor) {
			Constructor.findInstance = DataConnection.findInstance;
			Constructor.addInstance = DataConnection.addInstance;
			Constructor.extend = DataConnection.extend;
			Constructor.__instances = new InstanceStore();
		}

		DataConnection.extend(DataConnection);

		return DataConnection;

	}
);