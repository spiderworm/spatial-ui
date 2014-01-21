define(
	[
		'./Connection'
	],
	function(
		EngineeringDataConnection
	) {
		
		function EngineeringServiceConnection() {
			EngineeringDataConnection.apply(this);
		}
		EngineeringServiceConnection.prototype = new EngineeringDataConnection();


		return EngineeringServiceConnection;
		
	}
);