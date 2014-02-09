define(
	[
		'../base/Connection',
		'../ship/connectionFactory',
		'../ship/controls/connectionFactory',
		'../ship/ui/connectionFactory',
		'../util/comm'
	],
	function(
		DataConnection,
		shipValuesConnectionFactory,
		shipControlsConnectionFactory,
		shipUIConnectionFactory,
		comm
	) {

		function StoryDataConnection(user,url) {
			DataConnection.apply(this);
			if(user && url) {
				this._user = user;

				var connection = this;
				comm.ajax(
					url,
					function(response) {
						connection._model.overwrite(response);
						connection._setConnected();
					}
				);
			}
		}
		StoryDataConnection.prototype = new DataConnection();
		StoryDataConnection.prototype.getControlsConnection = function() {
			return shipControlsConnectionFactory.getConnection(
				this._user,
				this._model.connectionDefinitions.controls.url
			);
		}
		StoryDataConnection.prototype.getShipValuesConnection = function() {
			return shipValuesConnectionFactory.getConnection(
				this._user,
				this._model.connectionDefinitions.values.url
			);
		}
		StoryDataConnection.prototype.getShipUIConnection = function() {
			return shipUIConnectionFactory.getConnection(
				this._user,
				this._model.connectionDefinitions.ui.url
			);
		}

		DataConnection.extend(StoryDataConnection);

		return StoryDataConnection;

	}
);