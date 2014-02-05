
if (window.require !== window.requirejs) {
	window.require = window.requirejs;
	window.require.nodeRequire = global.require;
}

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
		'./registry'
	],
	function(
		registry
	) {
		registry.set('mock',true);
		require(
			[
				'./App'
			],
			function(App) {
				var app = new App();
				app.start();
			}
		);
	}
);
