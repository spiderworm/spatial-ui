
var baseUrl = (function() {
	var loc = document.location.pathname;
	loc = loc.match(/^(.*\/)[^\/]*$/)[0] + "js/";
	return loc;
})();

require.config({
	baseUrl: baseUrl,
	paths: {
		"react": "external/react",
		"jsx": "external/require-jsx",
		"JSXTransformer": "external/JSXTransformer",
		'THREE': 'external/three',
		'THREE.GeometryExporter': 'external/three.geometryExporter'
	},
	shim: {
		'THREE': {
			exports: 'THREE'
		},
		'THREE.GeometryExporter': {
			exports: 'THREE.GeometryExporter',
			deps: ['THREE']
		}
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
