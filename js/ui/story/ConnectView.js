define(
	[
		'../../base/EventObject',
		'./ConnectViewModel',
		'../../data/story/DataConnection'
	],
	function(
		EventObject,
		ControlsModel,
		DataConnection
	) {

		function StoryConnectView(user){
			EventObject.apply(this);

			this.__storyConnection = null;
			this.__model = new ControlsModel();

			var view = this;

			var handler = this.__model.values.$onUpdated(function() {
				if(this.url && this.url.length > 0) {
					view.__storyConnection = new DataConnection(user,this.url);
					view.__storyConnection.onConnected(function() {
						view._fire('story-connected',[view.__storyConnection]);
					});
				}
			});

			if(this.__model.values.autoConnect) {
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
		StoryConnectView.prototype.getModel = function() {
			return 	this.__model;
		}


		return StoryConnectView;

	}
);