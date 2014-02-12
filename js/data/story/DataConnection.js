define(
	[
		'../base/DataConnection',
		'../../base/Model',
		'../util/comm'
	],
	function(
		DataConnection,
		Model,
		comm
	) {

		function StoryDataConnection(user,url) {
			DataConnection.apply(this);
			if(user && url) {
				this._user = user;
				var story = this;

				var connections = this.__connections = {};

				comm.ajax(
					url,
					function(response) {
						if(response.connectionDefinitions) {
							for(var key in connections) {
								delete connections[key];
							}
							for(var key in response.connectionDefinitions) {
								story.__addConnection(
									key,
									response.connectionDefinitions[key].url,
									response.connectionDefinitions[key].type,
									response.connectionDefinitions[key].format
								);
							}
							story._setConnected();
						} else {
							console.error('could not connect');
						}
					}
				);
			}
		}
		StoryDataConnection.prototype = new DataConnection();
		StoryDataConnection.prototype.__addConnection = function(key,url,type,format) {
			this.__connections[key] = new DataConnection(this._user,url,type,format);
			var story = this;
			this.__connections[key].getModel().$subscribeTo(
				key,
				function(subModel) {
					story._model[key] = subModel;
					story._model.$setUpdated();
				}
			);
		}

		return StoryDataConnection;

	}
);