define(
	[
		'../base/Model',
		'./TimeDataStore',
		'./Timeline',
		'./TimelineModelSynchronizer',
		'../util/clone'
	],
	function(
		Model,
		TimeDataStore,
		Timeline,
		TimelineModelSynchronizer,
		clone
	) {








		function ChannelModelFactory(id,channel) {

			var model = new Model({},id);
			var ms = (new Date()).getTime();
			
			var timeDataStore = new TimeDataStore(ms,{});

			var timeline = new Timeline(id + ' timeline',timeDataStore,ms-100);
			timeline.onNewData(function(data) {
				if(data) {
					model.$overwrite(data);
				}
			});
			timeline.play();

			channel.onData(function(update,timestamp) {
				timeDataStore.addUpdate(timestamp,update);
			});

			return model;
		}


		return ChannelModelFactory;

	}
);