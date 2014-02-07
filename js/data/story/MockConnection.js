define(
	[
		'./DataConnection'
	],
	function(
		DataConnection
	) {

		function MockStoryDataConection(user,url) {
			DataConnection.apply(this,arguments);
		}
		MockStoryDataConection.prototype = new DataConnection();

		return MockStoryDataConection;

	}
);