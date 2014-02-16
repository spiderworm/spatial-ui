
if (window.require !== window.requirejs) {
	window.require = window.requirejs;
	window.require.nodeRequire = global.require;
}

var baseUrl = (function() {
	var loc = document.location.href;
	loc = loc.match(/^([^\?#]*\/).*$/)[1];
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
		},
		'external/OrbitControls': {
			exports: 'THREE.OrbitControls',
			deps: ['THREE']
		}
	}
});

require(
	[
		'./registry',
		'./util/urlUtil'
	],
	function(
		registry,
		urlUtil
	) {
		registry.set('mock',true);

		var vals = urlUtil.getQueryValues();
		if(vals.mock !== undefined) {
			registry.set('mock',vals.mock);
		}
	}
);
