define(
	[
		'../../base/Model'
	],
	function(
		Model
	) {

		function MockStoryDataConection(user,url) {

			this._model = new Model();

		}
		MockStoryDataConection.prototype.getModel = function() {}
		MockStoryDataConection.prototype.onConnected = function(callback) {
			callback();
		}
		MockStoryDataConection.prototype.isConnected = function() {
			return true;
		}


		return MockStoryDataConection;

	}
);