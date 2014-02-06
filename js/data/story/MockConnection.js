define(
	[
		'../base/DataConnectionModel',
		'../ship/connectionFactory',
		'../ship/controls/connectionFactory',
		'../ship/ui/connectionFactory',
		'../util/comm'
	],
	function(
		DataConnectionModel,
		shipValuesConnectionFactory,
		shipControlsConnectionFactory,
		shipUIConnectionFactory,
		comm
	) {

		function MockStoryDataConection(user,url) {
			this._user = user;
			this._model = new DataConnectionModel();

			var connection = this;
			comm.ajax(
				url,
				function(response) {
					connection._model.overwrite(response);
				}
			);
		}
		MockStoryDataConection.prototype.getModel = function() {}
		MockStoryDataConection.prototype.onConnected = function(callback) {
			callback();
		}
		MockStoryDataConection.prototype.isConnected = function() {
			return true;
		}
		MockStoryDataConection.prototype.getControlsConnection = function() {
			return shipControlsConnectionFactory.getConnection(
				this._user,
				this._model.connectionDefinitions.controls.url
			);
		}
		MockStoryDataConection.prototype.getShipValuesConnection = function() {
			return shipValuesConnectionFactory.getConnection(
				this._user,
				this._model.connectionDefinitions.values.url
			);
		}
		MockStoryDataConection.prototype.getShipUIConnection = function() {
			return shipUIConnectionFactory.getConnection(
				this._user,
				this._model.connectionDefinitions.ui.url
			);
		}

		return MockStoryDataConection;

	}
);