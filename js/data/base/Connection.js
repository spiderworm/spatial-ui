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