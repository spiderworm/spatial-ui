define(
	[
		'../../base/EventObject',
		'./ConnectControlsModel',
		'./ConnectValuesModel',
		'../../data/story/connectionFactory'
	],
	function(
		EventObject,
		ControlsModel,
		ValuesModel,
		storyConnectionFactory
	) {

		function StoryConnectView(user){
			EventObject.apply(this);

			this.__storyConnection = null;
			this.__controlsModel = new ControlsModel();
			this.__valuesModel = new ValuesModel();

			var view = this;

			var handler = this.__valuesModel.onUpdated(function() {
				if(this.url && this.url.length > 0) {
					view.__storyConnection = storyConnectionFactory.getConnection(user,this.url);
					view.__storyConnection.onConnected(function() {
						view._fire('story-connected',[view.__storyConnection]);
					});
				}
			});

			if(this.__valuesModel.autoConnect) {
				handler.fire();
			}

		}
		StoryConnectView.prototype = new EventObject();
		StoryConnectView.prototype.onConnected = function(callback) {
			var handler = this._on('story-connected',callback);
			if(this.__storyConnection && this.__storyConnection.isConnected()) {
				handler.fire([this.__storyConnection]);
			}
		}
		StoryConnectView.prototype.getControlsModel = function() {
			return 	this.__controlsModel;
		}
		StoryConnectView.prototype.getValuesModel = function() {
			return 	this.__valuesModel;
		}


		return StoryConnectView;

	}
);