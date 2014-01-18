define(
	[
		'react',
		'jsx!../ui/Master',
		'../base/Model'
	],
	function(
		React,
		MasterUI,
		Model
	) {
		
		function App() {
			this.model = new Model();
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
					ship: this.model.myShip
				}),
				document.body
			);
		}

		return App;

	}
)