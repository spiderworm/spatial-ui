define(
	function() {

		function TimeDataPoint(timestamp,data) {
			this.timestamp = timestamp;
			this.data = data;
		}

		return TimeDataPoint;
	}
);