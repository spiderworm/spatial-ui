define(
	[
	],
	function(
	) {

		function DataConnection(model) {
			this._model = model;
		}
		DataConnection.prototype.getModel = function() {
			return this._model;
		}

		return DataConnection;

	}
);