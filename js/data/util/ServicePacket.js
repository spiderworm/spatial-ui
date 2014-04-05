define(
	function() {


		function ServicePacket(timestamp,data) {
			this.timestamp = timestamp;
			this.data = data;
		}

		return ServicePacket;
		
	}
);