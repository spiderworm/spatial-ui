var data = {
	"sensors": {
		"visual": {
			"moon": {
				"position": {
					"x": 0,
					"y": 0,
					"z": 0,
					"velocity": {
						"x": 0,
						"y": 0,
						"z": 0
					}
				},
				"rotation": {
					"x": 0,
					"y": 0,
					"z": 0,
					"order": "YXZ",
					"velocity": {
						"x": 0,
						"y": 0,
						"z": 0
					}
				}
			},
			"sun": {
				"position": {
					"x": 0,
					"y": 0,
					"z": 0,
					"velocity": {
						"x": 0,
						"y": 0,
						"z": 0
					}
				},
				"rotation": {
					"x": 0,
					"y": 0,
					"z": 0,
					"order": "YXZ",
					"velocity": {
						"x": 0,
						"y": 0,
						"z": 0
					}
				}
			},
			"Teaatis": {
				"position": {
					"x": 0,
					"y": 0,
					"z": 0,
					"velocity": {
						"x": 0,
						"y": 0,
						"z": 0
					}
				},
				"rotation": {
					"x": 0,
					"y": 0,
					"z": 0,
					"order": "YXZ",
					"velocity": {
						"x": 0,
						"y": 0,
						"z": 0
					}
				}
			},
			"myShip": {
				"position": {
					"id": "myShip",
					"x": 0,
					"y": 0,
					"z": 0,
					"velocity": {
						"x": 0,
						"y": 0,
						"z": 0
					}
				},
				"rotation": {
					"x": 0,
					"y": 0,
					"z": 0,
					"order": "YXZ",
					"velocity": {
						"x": 0,
						"y": 0,
						"z": 0
					}
				}
			}
		}
	}
};


function reportValues() {
	self.postMessage(JSON.stringify(data));
}

setInterval(reportValues,100);




var moon = data.sensors.visual.moon;
var teaatis = data.sensors.visual.Teaatis;
var ship = data.sensors.visual.myShip;







var teaatisSize = 6371000;
var teaatisDistance = 149600000000;
var teaatisRads = .1;

var moonDistance = 38440000;
var moonRads = 1;

var shipRads = 0;
var shipSpeed = .1;
var shipDistance = teaatisSize + 100000;
var shipOrbit = true;


var lastStamp = (new Date()).getTime();


setInterval(doAnimation,10);


function doAnimation() {

	var stamp = (new Date()).getTime();
	var secs = (stamp - lastStamp)/1000;
	lastStamp = stamp;

	animateShip(secs);
	animateTeaatis(secs);
	animateMoon(secs);
}



function animateShip(secs) {
	if(ship && teaatis) {
		shipRads += secs * shipSpeed;

		var lastX = ship.position.x;
		var lastY = ship.position.y;
		var lastZ = ship.position.z;

		ship.position.x = teaatis.position.x + shipDistance * Math.cos(shipRads);
		ship.position.y = teaatis.position.y + shipDistance * Math.sin(shipRads);
		ship.position.z = teaatis.position.z;

		ship.position.velocity.x = (ship.position.x - lastX) / secs;
		ship.position.velocity.y = (ship.position.y - lastY) / secs;
		ship.position.velocity.z = (ship.position.z - lastZ) / secs;

		var lastX = ship.rotation.x;
		var lastY = ship.rotation.y;
		var lastZ = ship.rotation.z;

		ship.rotation.x = shipRads-Math.PI/2;
		ship.rotation.y = -Math.PI/2;
		ship.rotation.z = 0;

		ship.rotation.velocity.x = (ship.rotation.x - lastX) / secs;
		ship.rotation.velocity.y = (ship.rotation.y - lastY) / secs;
		ship.rotation.velocity.z = (ship.rotation.z - lastZ) / secs;

	}
}


function animateTeaatis(secs) {
	if(teaatis) {
		teaatis.rotation.x = 0;
		teaatis.rotation.y += secs * .0002;
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
