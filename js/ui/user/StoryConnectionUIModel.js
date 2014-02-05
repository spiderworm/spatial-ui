define(
	[
		'../../base/Model'
	],
	function(
		Model
	) {

		function ConnectToServerUIModel() {

			var model = new Model({
				panels: [
					{
						display: 'Login',
						controls: [
							{
								label: 'connect to ship'
							}
						],
						x: 0,
						y: 0,
						z: 1
					}
				],
				url: 'demo-resources/services/story.json'
			});

			return model;
		}

		return ConnectToServerUIModel;

	}
);