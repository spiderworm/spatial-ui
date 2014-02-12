var data = {
	"sensors": {
		"visual": {
			"moon": {
				"position": {
					"x": 0,
					"y": 0,
					"z": 0
				},
				"rotation": {
					"x": 0,
					"y": 0,
					"z": 0,
					"order": "YXZ"
				}
			},
			"sun": {
				"position": {
					"x": 0,
					"y": 0,
					"z": 0
				},
				"rotation": {
					"x": 0,
					"y": 0,
					"z": 0,
					"order": "YXZ"
				}
			},
			"Teaatis": {
				"position": {
					"x": 0,
					"y": 0,
					"z": 0
				},
				"rotation": {
					"x": 0,
					"y": 0,
					"z": 0,
					"order": "YXZ"
				}
			},
			"myShip": {
				"position": {
					"x": 0,
					"y": 0,
					"z": 0
				},
				"rotation": {
					"x": 0,
					"y": 0,
					"z": 0,
					"order": "YXZ"
				}
			}
		}
	}
};


function reportValues() {
	self.postMessage(JSON.stringify(data));
}

setInterval(reportValues,10);




var moon = data.sensors.visual.moon;
var teaatis = data.sensors.visual.Teaatis;
var ship = data.sensors.visual.myShip;







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
