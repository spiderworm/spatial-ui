define(
	[
		'../../util/InstanceStore',
		'../../base/EventObject',
		'../../base/Model'
	],
	function(
		InstanceStore,
		EventObject,
		Model
	) {

		function DataConnection(model) {
			EventObject.apply(this);
			this._model = model || new Model();
		}
		DataConnection.prototype = new EventObject();
		DataConnection.prototype.getModel = function() {
			return this._model;
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