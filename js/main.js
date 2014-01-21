
var baseUrl = (function() {
	var loc = document.location.href;
	loc = loc.match(/^(.*\/)[^\/]*$/)[0] + "js/";
	return loc;
})();

require.config({
	baseUrl: baseUrl,
	paths: {
		"react": "external/react",
		"jsx": "external/require-jsx",
		"JSXTransformer": "external/JSXTransformer"
	}
});

require(
	[
		'MockApp'
	],
	function(
		App
	) {

		var app = new App();
		app.start();

	}
);
