define(
	[
		'../Model',
		'../../util/InstanceStore'
	],
	function(
		ShipModel,
		InstanceStore
	) {

		var instances = new InstanceStore();

		function MockServiceConnection(user,ship) {
			var instance = instances.find(arguments);
			if(instance) {
				return instance;
			}
			instances.add(this,arguments);

			this._model = ship;
		}
		MockServiceConnection.prototype.getModel = function() {
			return this._model;
		}

		return MockServiceConnection;

	}
)