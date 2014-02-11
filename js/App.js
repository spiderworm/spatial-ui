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

			var app = this;

			this.model.$subscribeTo(function() {
				app._render();
			});
		}
		App.prototype.start = function() {

			var user = userManager.getCurrentUser();

			var app = this;

			var storyConnectView = new StoryConnectView(user);
			storyConnectView.onConnected(function(storyConnection) {

				var controlsModel = storyConnection.getControlsConnection().getModel();
				controlsModel.$subscribeTo('controls',function(controls) {
					app.model.$update({controls:controls});
				});

				var valuesModel = storyConnection.getShipValuesConnection().getModel();
				valuesModel.$subscribeTo('values',function(values) {
					app.model.$update({values: values});
				});

				var shipUIModel = storyConnection.getShipUIConnection().getModel();
				shipUIModel.$subscribeTo('ui',function(ui) {
					app.model.$update({ui:ui});
				});

			});

			this.model.$update({
				user: user,
				values: storyConnectView.getValuesModel(),
				ui: storyConnectView.getControlsModel()
			});

		}
		App.prototype.getModel = function(name) {
			if(arguments.length === 0)
				return this.model;
			else
				return this.model[name];
		}
		App.prototype._render = function() {
			React.unmountComponentAtNode(document.body);

			var appUI = React.renderComponent(
				AppUI({model: this.model}),
				document.body
			);
		}












		return App;

	}
)