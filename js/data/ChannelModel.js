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

			this._data = {};
			var model = new Model({},id);

			var ms = (new Date()).getTime();

			this._timeDataStore = new TimeDataStore(ms,this._data);

			var timeline = new Timeline(id + ' timeline',this._timeDataStore,ms-100);
			timeline.onNewData(function(data) {
				if(data) {
					model.$overwrite(data);
				}
			});
			timeline.play();

			var factory = this;
			channel.onData(function(update,timestamp) {
				factory._timeDataStore.addUpdate(timestamp,update);
			});

			return model;
		}


		return ChannelModelFactory;

	}
);