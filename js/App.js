define(
	[
		'react',
		'jsx!./ui/AppUI',
		'./base/Model',
		'./user/userManager',
		'./ui/story/ConnectView'
	],
	function(
		React,
		AppUI,
		Model,
		userManager,
		StoryConnectView
	) {
		
		function App() {
			this._model = new Model();

			var app = this;

			this._model.$subscribeTo(function() {
				app._render();
			});
		}
		App.prototype.start = function() {

			var user = userManager.getCurrentUser();

			var app = this;

			var storyConnectView = new StoryConnectView(user);
			storyConnectView.onConnected(function(storyConnection) {
				app.setModel(storyConnection.getModel());
			});

			this.setModel(storyConnectView.getModel());

		}
		App.prototype.setModel = function(model) {
			this._model = model;
			this._render();
		}
		App.prototype._render = function() {
			React.unmountComponentAtNode(document.body);

			var appUI = React.renderComponent(
				AppUI({model: this._model}),
				document.body
			);
		}












		return App;

	}
)