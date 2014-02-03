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
		}
		App.prototype.start = function() {

			var user = userManager.getCurrentUser();
			this._registerModel('user',user);

			var shipUIModel = shipUIConnectionFactory.getConnection(user).getModel();
			this._registerModel('view',shipUIModel);

			var controlsModel = shipControlsConnectionFactory.getConnection().getModel();
			this._registerModel('controls',controlsModel);

			var valuesModel = shipValuesConnectionFactory.getConnection().getModel();
			this._registerModel('values',valuesModel);

			this._render();
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
		App.prototype._registerModel = function(name,model) {
			if(this.model[name]) {
				throw new Error('already a model named ' + name);
			}
			this.model[name] = model;
			this.model.setUpdated();
		}
		App.prototype._render = function() {

			React.renderComponent(
				AppUI({
					appModel: this.model
				}),
				document.body
			);
		}

		return App;

	}
)