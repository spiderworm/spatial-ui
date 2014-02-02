define(
	[
		'../../util/InstanceStore',
		'../../base/Model'
	],
	function(
		InstanceStore,
		Model
	) {

		var instances = new InstanceStore();

		function MockUserDataConnection(user) {
			var instance = instances.find(arguments);
			if(instance) {
				return instance;
			}
			instances.add(this,arguments);
			this._shipModel = new Model();
		}
		MockUserDataConnection.prototype.getShip = function() {
			return this._shipModel;
		}

		return MockUserDataConnection;

	}
);