define(
	[
		'../base/EventObject',
		'../data/user/connectionFactory',
		'../base/Model',
		'../ui/user/StoryConnectionUIModel',
		'../data/story/connectionFactory'
	],
	function(
		EventObject,
		userDataConnectionFactory,
		Model,
		StoryConnectionUIModel,
		storyConnectionFactory
	) {

		function User(){
			EventObject.apply(this);

			this.__storyConnection = null;
			this.__storyConnectionUIModel = new StoryConnectionUIModel();

			var user = this;

			this.__storyConnectionUIModel.subscribeTo(function() {
				if(this.url && this.url.length > 0) {
					user.__storyConnection = storyConnectionFactory.getConnection(user,this.url);
					user.__storyConnection.onConnected(function() {
						user._fire('story-connected',[user.__storyConnection]);
					});
				}
			});

		}
		User.prototype = new EventObject();
		User.prototype.onConnectedToStory = function(callback) {
			var handler = this._on('story-connected',callback);
			if(this.__storyConnection.isConnected()) {
				handler.fire();
			}
		}
		User.prototype.getStoryConnectionUIModel = function() {
			return 	this.__storyConnectionUIModel;
		}

		return User;

	}
);