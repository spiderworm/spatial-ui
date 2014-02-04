define(
	[
		'react',
		'jsx!./ui/AppUI',
		'./base/Model',
		'./user/userManager',
		'./data/ship/ui/connectionFactory',
		'./data/ship/controls/connectionFactory',
		'./data/ship/connectionFactory'
	],
	function(
		React,
		AppUI,
		Model,
		userManager,
		shipUIConnectionFactory,
		shipControlsConnectionFactory,
		shipValuesConnectionFactory
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

				console.info(storyConnection);

				var controlsModel = shipControlsConnectionFactory.getConnection().getModel();
				app.model.controls = controlsModel;

				var valuesModel = shipValuesConnectionFactory.getConnection().getModel();
				app.model.values = valuesModel;

				var shipUIModel = shipUIConnectionFactory.getConnection(user).getModel();
				app._setViewModel(shipUIModel);

				app.model.setUpdated();

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
		App.prototype.subscribeTo = function(name) {
			var val;
		}
		App.prototype._setViewModel = function(model) {
			this.__viewModel = model;
			this._render();
		}
		App.prototype._render = function() {

			React.renderComponent(
				AppUI({
					definition: this.__viewModel,
					appModel: this.model
				}),
				document.body
			);
		}

		return App;

	}
)