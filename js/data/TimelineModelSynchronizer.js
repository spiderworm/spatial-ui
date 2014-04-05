define(
	function() {

		function TimelineModelSynchronizer(timeline,model) {
			this._model = model;
			timeline.onNewData(function(data) {
				if(data) {
					model.$overwrite(data);
				}
			});
		}

		return TimelineModelSynchronizer;

	}
);