define(
	[
		'react',
		'jsx!./ui/AppUI',
		'./base/Model',
		'./user/userManager'
	],
	function(
		React,
		AppUI,
		Model,
		userManager
	) {
		
		function App() {
			this.model = new Model();
			this.__viewModel = null;
		}
		App.prototype.start = function() {

			var user = userManager.getCurrentUser();
			this.model.user = user;

			this.model.setUpdated();

			var app = this;

			user.onConnectedToStory(function(storyConnection) {

				var controlsModel = storyConnection.getControlsConnection().getModel();
				app.model.controls = controlsModel;

				var valuesModel = storyConnection.getShipValuesConnection().getModel();
				app.model.values = valuesModel;

				app.model.setUpdated();

				var shipUIModel = storyConnection.getShipUIConnection().getModel();
				app._setViewModel(shipUIModel);

			});

			this._setViewModel(
				user.getStoryConnectionUIModel()
			);

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