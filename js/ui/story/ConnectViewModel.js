define(
	[
		'../../base/Model'
	],
	function(
		Model
	) {



		function StoryConnectControlsModel() {

			var model = new Model({
				ui: {
					panels: {
						type: 'panel-group',
						index: 0,
						panel0: {
							type: 'panel',
							index: 0,
							label: 'Login',
							controls: {
								type: 'control-group',
								index: 0,
								control0: {
									type: 'control',
									index: 0,
									subtype: 'text',
									label: 'connect to ship',
									placeholder: 'enter the url to connect to your story',
									size: 80,
									liveEdit: false,
									submitButton: {
										display: 'go'
									},
									valuePath: '/values/url'
								}
							}
						}
					}
				}
			});

			return model;
		}

		return StoryConnectControlsModel;

	}
);