define(
	[
		'../../util/InstanceStore',
		'../base/DataConnectionModel'
	],
	function(
		InstanceStore,
		DataConnectionModel
	) {

		var instances = new InstanceStore();

		function MockUserDataConnection(user) {
			var instance = instances.find(arguments);
			if(instance) {
				return instance;
			}
			instances.add(this,arguments);
			this._shipModel = new DataConnectionModel();
		}
		MockUserDataConnection.prototype.getShip = function() {
			return this._shipModel;
		}

		return MockUserDataConnection;

	}
);