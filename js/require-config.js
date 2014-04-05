require = {
	"waitSeconds": 3,
	"paths": {
		"react": "external/react",
		"jsx": "external/require-jsx",
		"JSXTransformer": "external/JSXTransformer",
		"THREE": "external/three",
		"THREE.GeometryExporter": "external/three.geometryExporter",
		"jsosc": "external/jsosc/lib"
	},
	"shim": {
		"THREE": {
			"exports": "THREE"
		},
		"THREE.GeometryExporter": {
			"exports": "THREE.GeometryExporter",
			"deps": ["THREE"]
		},
		"external/threex.keyboardstate": {
			"exports": "THREEx.KeyboardState"
		},
		"external/OrbitControls": {
			"exports": "THREE.OrbitControls",
			"deps": ["THREE"]
		},
		"external/ammo": {
			"exports": "Ammo"
		},
		"external/cannon": {
			"exports": "CANNON"
		}
	}
};