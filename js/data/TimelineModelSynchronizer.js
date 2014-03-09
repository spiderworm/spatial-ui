define(
	function() {

		function TimelineModelSynchronizer(timeline,model) {
			this._model = model;
			timeline.onNewData(function(data) {
				if(data && data.ui && data.ui.panels && data.ui.panels.panel1) {
					//debugger;
				}
				model.$overwrite(data);
			});
		}

		return TimelineModelSynchronizer;

	}
);