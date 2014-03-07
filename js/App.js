define(
	[
		'react',
		'jsx!./ui/AppUI',
		'./base/Model',
		'./user/userManager',
		'./data/story/DataConnection',
		'./ui/story/ConnectViewModel',
		'./util/modelUtil',
		'./util/urlUtil',
		'./registry'
	],
	function(
		React,
		AppUI,
		Model,
		userManager,
		StoryConnection,
		StoryConnectViewModel,
		modelUtil,
		urlUtil,
		registry
	) {

		registry.set('mock',true);

		var vals = urlUtil.getQueryValues();
		if(vals.mock !== undefined) {
			registry.set('mock',vals.mock);
		}

		function App() {
			this._rendered = false;
			this._started = false;

			var model = this._model = new Model({
				story: {
					url: '',
					connectionType: 'websocket',
					dataFormat: 'osc',
					connect: false
				}
			});

			modelUtil.setRootModel(this._model);

			if(registry.get('mock')) {
				model.story.$update({
					url: 'demo/story/mockSocket.js',
					connectionType: 'mock-websocket',
					dataFormat: 'osc',
					connect: true
				});
			}

			var app = this;
			this._model.$subscribeTo(function() {
				app._render();
			});
		}
		App.prototype.start = function() {
			this._started = true;

			var user = userManager.getCurrentUser();
			this._user = user;

			this._model.$update({
				ui: (new StoryConnectViewModel()).ui
			});

			var app = this;

			this._model.story.$subscribeTo('connect',function(connect){
				if(connect) {
					app.__storyConnection = new StoryConnection(
						user,
						app._model.story.url,
						app._model.story.connectionType,
						app._model.story.dataFormat
					);
					app.__storyConnection.getModel().$subscribeTo(
						function(connectionModel) {
							app._model.$update(connectionModel);
						}
					);
					app._model.$update({connect: false});
				}
			});

		}
		App.prototype.isStarted = function() {
			return this._started;
		}
		App.prototype.getModel = function() {
			return this._model;
		}
		App.prototype._render = function() {
			if(!this._rendered) {
				this._rendered = true;
				var appUI = React.renderComponent(
					AppUI({model: this._model, user: this._user}),
					document.body
				);
			}
		}












		return App;

	}
)