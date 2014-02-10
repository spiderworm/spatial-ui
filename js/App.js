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
			this.model = new Model();
			this.__viewModel = null;
		}
		App.prototype.start = function() {

			var user = userManager.getCurrentUser();

			var app = this;

			var storyConnectView = new StoryConnectView(user);
			storyConnectView.onConnected(function(storyConnection) {

				var controlsModel = storyConnection.getControlsConnection().getModel();
				app.model.controls = controlsModel;

				var valuesModel = storyConnection.getShipValuesConnection().getModel();
				app.model.values = valuesModel;

				app.model.$setUpdated();

				var shipUIModel = storyConnection.getShipUIConnection().getModel();
				app._setViewModel(shipUIModel);

			});

			this.model.user = user;
			this.model.values = storyConnectView.getValuesModel();
			this.model.$setUpdated();

			this._setViewModel(storyConnectView.getControlsModel());

		}
		App.prototype.getModel = function(name) {
			if(arguments.length === 0)
				return this.model;
			else
				return this.model[name];
		}
		App.prototype._setViewModel = function(model) {
			this.__viewModel = model;
			this._render();
		}
		App.prototype._render = function() {
			React.unmountComponentAtNode(document.body);
			var appUI = React.renderComponent(
				AppUI({
					appModel: this.model,
					definition: this.__viewModel
				}),
				document.body
			);
		}












		return App;

	}
)