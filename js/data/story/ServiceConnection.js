define(
	[
		'./DataConnection'
	],
	function(
		DataConnection
	) {

		function StoryServiceConection(user,url) {
			DataConnection.apply(this,arguments);
		}
		StoryServiceConection.prototype = new DataConnection();

		return StoryServiceConection;

	}
);