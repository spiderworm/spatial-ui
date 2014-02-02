define(
	[
		'./App',
		'./registry'
	],
	function(
		App,
		registry
	) {



		function MockApp() {
			registry.set('mock',true);

			App.apply(this);

			window.model = this.model;

		}
		MockApp.prototype = new App();

		return MockApp;

	}

);