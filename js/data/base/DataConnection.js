define(
	[
		'../../util/InstanceStore',
		'../../base/EventObject',
		'../../base/Model',
		'../util/DataChannel',
		'../util/DataSourceModelBinder'
	],
	function(
		InstanceStore,
		EventObject,
		Model,
		Channel,
		DataSourceModelBinder
	) {




		var dataConnectionSource = {name:'dataConnectionSource'};

		function DataConnection(user,url,connectionType,dataFormat) {
			EventObject.apply(this);
			var clientModel = this._model = new Model();
			var sourceModel = new Model();

			var dataSourceModelBinder = new DataSourceModelBinder(dataConnectionSource,sourceModel,clientModel);

			if(url && connectionType && dataFormat) {
				var connection = this;
				var channel = this._channel = new Channel(url,connectionType,dataFormat);
				channel.onData(function(data) {
					dataSourceModelBinder.bindData(data);
				});
				channel.open(function() {
					connection._setConnected();
				});
				clientModel.$deepOnUpdated(function(updateObj,source) {
					if(source === user) {
						channel.send(updateObj);
					}
				});
				clientModel.$deepOnPinged(function(ping,source) {
					if(source === user) {
						channel.send(ping);
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






		return DataConnection;

	}
);