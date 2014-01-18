define(
	[
		'../Model'
	],
	function(
		ShipModel
	) {

		function MockServiceConnection() {
			this._model = new ShipModel();

			var model = this._model;

			setInterval(function() {
				model.weapons.ammo.torpedos++;
				model.weapons.ammo.setUpdated();
			},10);

		}
		MockServiceConnection.prototype.getModel = function() {
			return this._model;
		}

		return MockServiceConnection;

	}
)