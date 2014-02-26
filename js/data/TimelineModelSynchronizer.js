define(
	function() {

		function TimelineModelSynchronizer(timeline,model) {
			this._model = model;
			timeline.onNewData(function(data) {
				model.$update(data);
			});
		}

		return TimelineModelSynchronizer;

	}
);