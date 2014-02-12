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
					"x": 0,
					"y": 0,
					"z": 0
				},
				"rotation": {
					"x": 0,
					"y": 0,
					"z": 0
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
					"x": 0,
					"y": 0,
					"z": 0
				},
				"rotation": {
					"x": 0,
					"y": 0,
					"z": 0
				},
				"textures": {
					"color": "demo-resources/sun/img/colormap.png"
				}
			},
			"Teaatis": {
				"id": "Teaatis",
				"geometry": "demo-resources/geometry/Teaatis.json",
				"position": {
					"x": 0,
					"y": 0,
					"z": 0
				},
				"rotation": {
					"x": 0,
					"y": 0,
					"z": 0
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
					"x": 0,
					"y": 0,
					"z": 0
				},
				"rotation": {
					"x": 0,
					"y": 0,
					"z": 0
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




var moon = data.camera1.objects.moon;
var teaatis = data.camera1.objects.Teaatis;
var ship = data.camera1.objects.myShip;







var teaatisSize = 6371000;
var teaatisDistance = 149600000000;
var teaatisRads = .5;

var moonDistance = 38440000;
var moonRads = 1;

var shipRads = 0;
var shipSpeed = .003;
var shipDistance = teaatisSize + 100000;
var shipOrbit = true;


setInterval(doAnimation,10);

function doAnimation() {
	animateShip();
	animateTeaatis();
	animateMoon();
}




function animateShip() {
	if(ship && teaatis) {
		shipRads += shipSpeed;

		ship.position.x = teaatis.position.x + shipDistance * Math.cos(shipRads);
		ship.position.y = teaatis.position.y + shipDistance * Math.sin(shipRads);
		ship.position.z = teaatis.position.z;

		ship.rotation.x = shipRads-Math.PI/2;
		ship.rotation.y = -Math.PI/2;
		ship.rotation.z = 0;
		ship.rotation.order = 'YXZ';
	}
}


function animateTeaatis() {
	if(teaatis) {
		teaatis.rotation.x = 0;
		teaatis.rotation.y += .0002;
		teaatis.rotation.z = 0;

		teaatis.position.x = teaatisDistance * Math.cos(teaatisRads);
		teaatis.position.y = teaatisDistance * Math.sin(teaatisRads);
		teaatis.position.z = 0;
	}
}


function animateMoon() {

	if(moon && teaatis) {

		moon.position.x = teaatis.position.x + moonDistance * Math.cos(moonRads);
		moon.position.y = teaatis.position.y + moonDistance * Math.sin(moonRads);
		moon.position.z = teaatis.position.z;
	}
}
