define(
	[
		'../../util/InstanceStore',
		'../../base/EventObject',
		'../../base/Model',
		'../util/DataChannel',
		'../../util/modelExtrapolator',
		'../util/DataSourceModelBinder'
	],
	function(
		InstanceStore,
		EventObject,
		Model,
		Channel,
		modelExtrapolator,
		DataSourceModelBinder
	) {




		var dataConnectionSource = {};
		var dataSourceModelBinder = new DataSourceModelBinder(dataConnectionSource);

		function DataConnection(user,url,connectionType,dataFormat) {
			EventObject.apply(this);
			var model = this._model = new Model();
			if(url && connectionType && dataFormat) {
				var connection = this;
				var channel = this._channel = new Channel(url,connectionType,dataFormat);
				channel.onData(function(data) {
					dataSourceModelBinder.bind(data,model);
				});
				channel.open(function() {
					connection._setConnected();
				});
				model.$deepOnUpdated(function(updateObj,source) {
					if(source !== dataConnectionSource) {
						channel.send(updateObj);
					}
				});
				model.$deepOnPinged(function(ping,source) {
					if(source !== dataConnectionSource) {
						channel.send(ping);
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