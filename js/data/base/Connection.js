define(
	[
		'../../util/InstanceStore',
		'../../base/EventObject',
		'../base/DataConnectionModel'
	],
	function(
		InstanceStore,
		EventObject,
		DataConnectionModel
	) {

		function DataConnection(model) {
			EventObject.apply(this);
			this._model = model || new DataConnectionModel();
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


		var instances = new InstanceStore();

		DataConnection.find = function(signature) {
			return instances.find(signature);
		}
		DataConnection.add = function(instance,signature) {
			instances.add(instance,signature);
		}


		return DataConnection;

	}
);