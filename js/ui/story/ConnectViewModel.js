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
									dataPath: '/values/url'
								}
							}
						}
					}
				},
				values: {
					url: "",
					autoConnect: true
				}
			});

			if(registry.get('mock')) {
				model.values.$update({url:'demo-resources/services/story/websocket.osc.js'});
			}
			var vals = urlUtil.getQueryValues();

			if(vals.story !== undefined) {
				model.values.$update({url:vals.story});
			}
			if(vals.autoConnect !== undefined) {
				model.values.$update({autoConnect:vals.autoConnect});
			}

			return model;
		}

		return StoryConnectControlsModel;

	}
);