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



		function StoryConnectValuesModel() {

			var model = new Model({
				url: "",
				autoConnect: true
			});

			if(registry.get('mock')) {
				model.$update({url:'demo-resources/services/story.json'});
			}
			var vals = urlUtil.getQueryValues();

			if(vals.story !== undefined) {
				model.$update({url:vals.story});
			}
			if(vals.autoConnect !== undefined) {
				model.$update({autoConnect:vals.autoConnect});
			}

			return model;
		}

		return StoryConnectValuesModel;

	}
);