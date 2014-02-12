var data = {
	"camera1": {
		"type": "visualization",
		"subtype":"camera",
		"sky": {
			"type": "box",
			"textures": [
				"demo-resources/skies/space1/right1.jpg",
				"demo-resources/skies/space1/left2.jpg",
				"demo-resources/skies/space1/top3.jpg",
				"demo-resources/skies/space1/bottom4.jpg",
				"demo-resources/skies/space1/front5.jpg",
				"demo-resources/skies/space1/back6.jpg"
			]
		},
		"objects": {
			"moon": {
				"id": "moon",
				"geometry": "demo-resources/geometry/moon.json",
				"position": {
					".data": "/sensors/visual/moon/position"
				},
				"rotation": {
					".data": "/sensors/visual/moon/rotation"
				},
				"textures": {}
			},
			"sun": {
				"id": "sun",
				"light": {
					"color": "0xffffdd",
					"intensity": 2,
					"distance": 10000000000000
				},
				"geometry": "demo-resources/sun/geometry.json",
				"position": {
					".data": "/sensors/visual/sun/position"
				},
				"rotation": {
					".data": "/sensors/visual/sun/rotation"
				},
				"textures": {
					"color": "demo-resources/sun/img/colormap.png"
				}
			},
			"Teaatis": {
				"id": "Teaatis",
				"geometry": "demo-resources/geometry/Teaatis.json",
				"position": {
					".data": "/sensors/visual/Teaatis/position"
				},
				"rotation": {
					".data": "/sensors/visual/Teaatis/rotation"
				},
				"textures": {
					"color": "demo-resources/planet-maps/Teaatis/Colormap.png",
					"normal": "demo-resources/planet-maps/Teaatis/Normalmap.png"
				}
			},
			"myShip": {
				"id": "myShip",
				"geometry": "demo-resources/ship/geometry.js",
				"position": {
					".data": "/sensors/visual/myShip/position"
				},
				"rotation": {
					".data": "/sensors/visual/myShip/rotation"
				},
				"scale": 1,
				"textures": {}
			}
		}
	}
};


function reportValues() {
	self.postMessage(JSON.stringify(data));
}

setInterval(reportValues,10);
