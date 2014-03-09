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
			this._ui = null;

			this._user = userManager.getCurrentUser();

			var model = this._startupModel = new Model({
				story: {
					url: '',
					connectionType: 'websocket',
					dataFormat: 'osc',
					connect: false
				},
				ui: (new StoryConnectViewModel()).ui
			});

			if(registry.get('mock')) {
				this._startupModel.story.$update({
					url: 'demo/story/mockSocket.js',
					connectionType: 'mock-websocket',
					dataFormat: 'osc',
					connect: true
				});
			}

			var app = this;
			this._startupModel.story.$subscribeTo('connect',function(connect){
				if(connect) {
					app._startupModel.story.$update({connect: false});
					app.connect();
				}
			});

			this._setModel(this._startupModel);
		}
		App.prototype.connect = function() {
			this.__storyConnection = new StoryConnection(
				this._user,
				this._startupModel.story.url,
				this._startupModel.story.connectionType,
				this._startupModel.story.dataFormat
			);
			this._setModel(this.__storyConnection.getModel());
		}
		App.prototype.getModel = function() {
			return this._model;
		}
		App.prototype.getStartupModel = function() {
			return this._startupModel;
		}
		App.prototype._setModel = function(model) {
			this._model = model;

			modelUtil.setRootModel(model);

			var app = this;
			model.$subscribeTo(function() {
				app._render();
			});
		}
		App.prototype._render = function() {
			if(this._ui) {
				this._ui.setProps({
					model: this._model,
					user: this._user
				});
			} else {
				this._ui = React.renderComponent(
					AppUI({model: this._model, user: this._user}),
					document.body
				);
			}
		}












		return App;

	}
)