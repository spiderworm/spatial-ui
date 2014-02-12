define(
	[
		'../base/DataConnection',
		'../../base/Model'
	],
	function(
		DataConnection,
		Model
	) {

		function StoryDataConnection(user,url) {
			DataConnection.apply(this,[user,url,'websocket','json']);

			this.__connections = {};
			this._resultModel = new Model();

			this._user = user;
			var story = this;

			this._model.$subscribeTo('connectionDefinitions',function(definitions) {
				if(definitions) {

					var keys = definitions.$getKeys();
					for(var i in keys) {
						story.__addConnection(
							keys[i],
							definitions[keys[i]].url,
							definitions[keys[i]].type,
							definitions[keys[i]].format
						);
					}

				}
			});

		}
		StoryDataConnection.prototype = new DataConnection();
		StoryDataConnection.prototype.getModel = function() {
			return this._resultModel;
		}
		StoryDataConnection.prototype.__addConnection = function(key,url,type,format) {
			this.__connections[key] = new DataConnection(this._user,url,type,format);
			var story = this;
			this.__connections[key].getModel().$subscribeTo(
				key,
				function(subModel) {
					story._resultModel[key] = subModel;
					story._resultModel.$setUpdated();
				}
			);
		}

		return StoryDataConnection;

	}
);