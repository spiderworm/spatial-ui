define(
	[
		'../Model'
	],
	function(
		WeaponsModel
	) {

		function MockServiceConnection() {
			this._model = new WeaponsModel();
		}
		MockServiceConnection.prototype.getModel = function() {
			return this._model;
		}

		return MockServiceConnection;

	}
)