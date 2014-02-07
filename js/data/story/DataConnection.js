define(
	[
		'../base/Connection',
		'../ship/connectionFactory',
		'../ship/controls/connectionFactory',
		'../ship/ui/connectionFactory',
		'../util/comm'
	],
	function(
		Connection,
		shipValuesConnectionFactory,
		shipControlsConnectionFactory,
		shipUIConnectionFactory,
		comm
	) {

		function DataConnection(user,url) {
			Connection.apply(this);
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
		DataConnection.prototype = new Connection();
		DataConnection.prototype.getControlsConnection = function() {
			return shipControlsConnectionFactory.getConnection(
				this._user,
				this._model.connectionDefinitions.controls.url
			);
		}
		DataConnection.prototype.getShipValuesConnection = function() {
			return shipValuesConnectionFactory.getConnection(
				this._user,
				this._model.connectionDefinitions.values.url
			);
		}
		DataConnection.prototype.getShipUIConnection = function() {
			return shipUIConnectionFactory.getConnection(
				this._user,
				this._model.connectionDefinitions.ui.url
			);
		}

		return DataConnection;

	}
);