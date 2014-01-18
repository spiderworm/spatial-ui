define(
	[
		'./base/App',
		'./ship/data/connectionFactory',
		'./base/Model',
		'./ui/data/connectionFactory'
	],
	function(
		App,
		shipDataConnectionFactory,
		Model,
		viewDataConnectionFactory
	) {

		function MockApp() {
			App.apply(this);

			var myShip = {};

			var myShipDataConnection = shipDataConnectionFactory.getConnection(myShip,true);
			var myShipModel = myShipDataConnection.getModel();
			this._registerModel('myShip',myShipModel);

			var myViewModel = viewDataConnectionFactory.getConnection().getModel();
			this._registerModel('view',myViewModel);

			window.model = this.model;

			this._render();

		}
		MockApp.prototype = new App();

		return MockApp;

	}

);