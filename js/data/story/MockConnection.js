define(
	[
		'./DataConnection'
	],
	function(
		StoryDataConnection
	) {

		function MockStoryDataConection(user,url) {
			StoryDataConnection.apply(this,arguments);
		}
		MockStoryDataConection.prototype = new StoryDataConnection();

		StoryDataConnection.extend(MockStoryDataConection);

		return MockStoryDataConection;

	}
);