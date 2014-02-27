define(
	[
		'../DataConnection',
		'../../base/Model',
		'../../registry'
	],
	function(
		DataConnection,
		Model,
		registry
	) {

		function StoryDataConnection(user,url,connectionType,dataFormat) {
			DataConnection.apply(this,[user,url,connectionType,dataFormat]);

			this.__connections = {};
			this._resultModel = new Model();

			this._user = user;
			var storyConnection = this;

			this._model.$subscribeTo('story',function(story) {
				if(story) {
					story.$subscribeTo('connectionDefinitions',function(definitions) {
						if(definitions) {

							var keys = definitions.$getKeys();
							for(var i in keys) {
								if(definitions[keys[i]].url) {
									storyConnection.__addConnection(
										keys[i],
										definitions[keys[i]].url,
										definitions[keys[i]].type,
										definitions[keys[i]].format
									);
								}
							}

						}
					});
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