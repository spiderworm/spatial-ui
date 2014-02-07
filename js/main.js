
if (window.require !== window.requirejs) {
	window.require = window.requirejs;
	window.require.nodeRequire = global.require;
}

var baseUrl = (function() {
	var loc = document.location.href;
	loc = loc.match(/^([^\?#]*\/)[^\/\?#]*$/)[1];
	return loc;
})();

require.config({
	baseUrl: baseUrl + "js/",
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
		},
		'external/threex.keyboardstate': {
			exports: 'THREEx.KeyboardState'
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
		registry.set('rootUrl',baseUrl);
		registry.set('mock',true);
		registry.set('3D-scale',1);
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
