define(
	[
		'../../base/Model',
		'../TimeDataStore',
		'../Timeline',
		'../TimelineModelSynchronizer',
		'../../util/clone'
	],
	function(
		Model,
		TimeDataStore,
		Timeline,
		TimelineModelSynchronizer,
		clone
	) {








		function DataSourceModelBinder(channel) {

			this._data = {};
			var clientModel = this._clientModel = new Model({},"clientModel");

			var ms = (new Date()).getTime();

			this._timeDataStore = new TimeDataStore(ms,this._data);
			this._timeline = new Timeline(this._timeDataStore,ms-100);
			this._timeline.play();
			this._modelSynchronizer = new TimelineModelSynchronizer(this._timeline,clientModel);

			this._channel = channel;

			var dataSourceModelBuilder = this;

			channel.onData(function(data) {
				dataSourceModelBuilder.__handleData(data,(new Date()).getTime());
			});

		}
		DataSourceModelBinder.prototype.getClientModel = function() {
			return this._clientModel;
		}
		DataSourceModelBinder.prototype.__handleData = function(update,timestamp) {

			function handle(update,data) {

				for(var i in update) {
					switch(i) {
						case "@push":
							if(!data.__pushed) {
								data.__pushed = {};
							}
							if(!data.__pushed[update[i]]) {
								data.__pushed[update[i]] = [];
							}
							data.__pushed[update[i]].unshift(data[update[i]]);
							data[update[i]] = undefined;
						break;
						case "@pop":
							if(!data.__pushed) {
								data.__pushed = {};
							}
							if(!data.__pushed[update[i]]) {
								data.__pushed[update[i]] = [];
							}
							var result = data.__pushed[update[i]].shift();
							data[update[i]] = result;
						break;
						case "@clear":
							if(!data.__pushed) {
								data.__pushed = {};
							}
							if(!data.__pushed[update[i]]) {
								data.__pushed[update[i]] = [];
							}
							while(data.__pushed[update[i]][0]) {
								data.__pushed[update[i]].shift();
							}
							data[update[i]] = undefined;
						break;
						case "@remove":
							data[update[i]] = undefined;
						break;
						default:
							if(update[i] && typeof update[i] === "object") {
								if(typeof data[i] !== "object") {
									data[i] = {};
								}
								handle(update[i],data[i]);
							} else {
								data[i] = update[i];
							}
						break;
					}
				}

			}

			handle(update,this._data);

			this._timeDataStore.addData(timestamp,clone(this._data));

		}


		return DataSourceModelBinder;

	}
);