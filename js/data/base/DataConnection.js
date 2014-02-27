define(
	[
		'../../util/InstanceStore',
		'../../base/EventObject',
		'../../base/Model',
		'../DataChannel',
		'../DataSourceModelBuilder'
	],
	function(
		InstanceStore,
		EventObject,
		Model,
		Channel,
		DataSourceModelBuilder
	) {




		var dataConnectionSource = {name:'dataConnectionSource'};

		function DataConnection(user,url,connectionType,dataFormat) {
			EventObject.apply(this);
			if(url && connectionType && dataFormat) {

				var channel = this._channel = new Channel(url,connectionType,dataFormat);

				var dataSourceModelBuilder = new DataSourceModelBuilder(channel);
				var clientModel = this._model = dataSourceModelBuilder.getClientModel();

				var connection = this;
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