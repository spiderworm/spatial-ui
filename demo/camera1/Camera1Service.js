define(
	[
		'../base/MockService'
	],
	function(
		MockService
	) {

		function Camera1Service() {
			MockService.apply(this,['camera1']);

			this.setData(
				{
					"camera1": {
						"type": "visualization",
						"subtype":"camera",
						"sky": {
							"type": "box",
							"textures": [
								"demo/visualization/skies/space1/right1.jpg",
								"demo/visualization/skies/space1/left2.jpg",
								"demo/visualization/skies/space1/top3.jpg",
								"demo/visualization/skies/space1/bottom4.jpg",
								"demo/visualization/skies/space1/front5.jpg",
								"demo/visualization/skies/space1/back6.jpg"
							]
						},
						"objects": {
							"moon": {
								"id": "moon",
								"geometry": "demo/visualization/Teaatis/moon-1/geometry.json",
								"position": {
									".data": "/physics/bodies/moon/position"
								},
								"rotation": {
									".data": "/physics/bodies/moon/rotation"
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
								"geometry": "demo/visualization/sun/geometry.json",
								"position": {
									".data": "/physics/bodies/sun/position"
								},
								"rotation": {
									".data": "/physics/bodies/sun/rotation"
								},
								"textures": {
									"color": "demo/visualization/sun/colormap.png"
								}
							},
							"Teaatis": {
								"id": "Teaatis",
								"geometry": "demo/visualization/Teaatis/geometry.json",
								"position": {
									".data": "/physics/bodies/Teaatis/position"
								},
								"rotation": {
									".data": "/physics/bodies/Teaatis/rotation"
								},
								"textures": {
									"color": "demo/visualization/Teaatis/Colormap.png",
									"normal": "demo/visualization/Teaatis/Normalmap.png"
								}
							},
							"myShip": {
								"id": "myShip",
								"geometry": "demo/visualization/ship/geometry.js",
								"position": {
									".data": "/physics/bodies/myShip/position"
								},
								"rotation": {
									".data": "/physics/bodies/myShip/rotation"
								},
								"scale": 1,
								"textures": {}
							}
						}
					}
				}
			);

		}
		Camera1Service.prototype = new MockService();

		return Camera1Service;

	}
);