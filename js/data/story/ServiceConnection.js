define(
	[
		'./DataConnection'
	],
	function(
		StoryDataConnection
	) {

		function StoryServiceConection(user,url) {
			StoryDataConnection.apply(this,arguments);
		}
		StoryServiceConection.prototype = new StoryDataConnection();

		StoryDataConnection.extend(StoryServiceConection);

		return StoryServiceConection;

	}
);