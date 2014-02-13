define(
	[
		'../../util/InstanceStore',
		'../../base/EventObject',
		'../../base/Model',
		'../util/DataChannel',
		'../../util/modelExtrapolator'
	],
	function(
		InstanceStore,
		EventObject,
		Model,
		Channel,
		modelExtrapolator
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

				modelExtrapolator.enable(model);
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







		return DataConnection;

	}
);