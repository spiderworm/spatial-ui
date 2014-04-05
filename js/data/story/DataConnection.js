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
			DataConnection.apply(this,['story',user,url,connectionType,dataFormat]);

			this._channel.sendRaw('/@connect story');

			this.__connections = {};
			this._resultModel = new Model();

			this._user = user;
			var storyConnection = this;

			this._model.$subscribeTo('story',function(story) {
				if(story) {

					story.$subscribeTo('connectionDefinitions',function(definitions) {
						if(definitions) {

							definitions.$subscribeTo(function() {

								var keys = this.$getKeys();
								for(var i in keys) {
									if(this[keys[i]].url) {
										storyConnection.__addConnection(
											keys[i],
											this[keys[i]].url,
											this[keys[i]].type,
											this[keys[i]].format
										);
									}
								}

							});

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
			if(!this.__connections[key]) {
				this.__connections[key] = new DataConnection(key,this._user,url,type,format);

				this.__connections[key]._channel.sendRaw('/@connect ' + key);
				var story = this;
				this.__connections[key].getModel().$subscribeTo(
					key,
					function(subModel) {
						story._resultModel[key] = subModel;
						story._resultModel.$setUpdated();
					}
				);
			}
		}

		return StoryDataConnection;

	}
);