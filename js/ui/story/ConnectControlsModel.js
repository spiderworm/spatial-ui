define(
	[
		'../../base/Model',
		'../../util/urlUtil',
		'../../registry'
	],
	function(
		Model,
		urlUtil,
		registry
	) {



		function StoryConnectControlsModel() {

			var model = new Model({
				panels: [
					{
						label: 'Login',

						controls: [
							{
								label: 'connect to ship',
								type: 'text',
								placeholder: 'enter the url to connect to your story',
								size: 80,
								liveEdit: false,
								submitButton: {
									display: 'go'
								},
								dataPath: 'url'
							}
						]
					}
				],
				url: "",
				autoConnect: false
			});

			return model;
		}

		return StoryConnectControlsModel;

	}
);