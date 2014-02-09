define(
	[
		'./DataConnection'
	],
	function(
		VisualizationDataConnection
	) {

		function VisualizationServiceConnection(user) {
			VisualizationDataConnection.apply(this);
		}
		VisualizationServiceConnection.prototype = new VisualizationDataConnection();


		VisualizationDataConnection.extend(VisualizationServiceConnection);



		return VisualizationServiceConnection;

	}
);