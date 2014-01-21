define(
	[
		'../../util/InstanceStore',
		'../../ship/Model'
	],
	function(
		InstanceStore,
		ShipModel
	) {

		var instances = new InstanceStore();

		function MockUserDataConnection(user) {
			var instance = instances.find(arguments);
			if(instance) {
				return instance;
			}
			instances.add(this,arguments);
			this._shipModel = new ShipModel();
		}
		MockUserDataConnection.prototype.getShip = function() {
			return this._shipModel;
		}

		return MockUserDataConnection;

	}
);