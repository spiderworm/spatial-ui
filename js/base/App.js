define(
	[
		'react',
		'jsx!../ui/Master',
		'../base/Model',
		'../user/userManager',
		'../ship/data/connectionFactory',
		'../ui/data/connectionFactory'
	],
	function(
		React,
		MasterUI,
		Model,
		userManager,
		shipDataConnectionFactory,
		viewDataConnectionFactory
	) {
		
		function App() {
			this.model = new Model();
		}
		App.prototype.start = function() {

			var user = userManager.getCurrentUser();

			this._registerModel('user',user);

			var myShipModel = user.getShip();

			this._registerModel('myShip',myShipModel);

			var myViewModel = viewDataConnectionFactory.getConnection(user).getModel();
			this._registerModel('view',myViewModel);

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
				MasterUI({
					app: this,
					user: userManager.getCurrentUser(),
					ship: this.model.myShip
				}),
				document.body
			);
		}

		return App;

	}
)