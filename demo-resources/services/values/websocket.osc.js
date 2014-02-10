
var osc = "\
/helm/impulse ,f 10\n\
/engineering/energy/levels/impulse ,f 150\n\
/engineering/energy/levels/tubes ,f 100\n\
/engineering/energy/levels/phasers ,f 25\n\
/weapons/ammo/torpedos ,i 0\n\
/weapons/phasers/enabled ,i 1\n\
/weapons/phasers/frequency ,s \"C\"\n\
/systems/tubes/1/currentAmmo ,s \"torpedos\"\n\
/systems/tubes/1/loadedPercent ,f 0.5\n\
/systems/tubes/1/fire ,i 0\n\
/systems/tubes/1/keepLoaded ,i 0\n\
/systems/tubes/1/autoFire ,i 0\n\
/systems/tubes/2/currentAmmo ,s \"nuke\"\n\
/systems/tubes/2/loadedPercent ,f 1\n\
/systems/tubes/2/fire ,i 0\n\
/systems/tubes/2/keepLoaded ,i 1\n\
/systems/tubes/2/autoFire ,i 1\n\
";





function getValue(path) {
	return values[path] ? values[path].value : null;
}



function setValue(path,value) {
	if(!values[path]) {
		values[path] = {
			type: 's',
			value: ''
		};
	}
	values[path].value = value;
	var msg = path + ' ,' + values[path].type + ' ' + value;
	self.postMessage(msg);
}



function parseOSC(osc) {
	var values = {};
	var lines = osc.split("\n");
	for(var i=0; i<lines.length; i++) {
		var pieces = lines[i].match(/^([^, ]*) ,([^ ]+) (.*)/);
		if(pieces) {
			values[pieces[1]] = {
				name: pieces[1],
				type: pieces[2][0],
				value: pieces[3]
			};
			switch(values[pieces[1]].type) {
				case "i":
					values[pieces[1]].value = parseInt(values[pieces[1]].value);
				break;
				case "f":
					values[pieces[1]].value = parseFloat(values[pieces[1]].value);
				break;
			}
		}
	}
	return values;
}



function handleMessageReceived(msg) {

	reportReceived(msg.name,msg.value);

	switch(msg.name) {
		case "/systems/tubes/1/fire":
		case "/systems/tubes/2/fire":
			setValue(msg.name,0);
		break;
		default:
			setValue(msg.name,msg.value);
		break;
	}

}

function reportReceived(name,value) {
	console.info('services/values/websocket.osc.js: host set ' + name + ' to ' + value);
}









var values = parseOSC(osc);






self.addEventListener(
	'message',
	function(event) {
		var newVals = parseOSC(event.data);
		for(var name in newVals) {
			handleMessageReceived(newVals[name]);
		}
	},
	false
);

self.postMessage(osc);





setInterval(
	function() {

		setValue(
			'/weapons/ammo/torpedos',
			getValue('/weapons/ammo/torpedos')+1
		);

		var val = getValue('/systems/tubes/1/loadedPercent');
		val+=.01;
		if(val > 1) val = 1;
		if(val < 1) {
			setValue('/systems/tubes/1/loadedPercent',val);
		}

		var val = getValue('/systems/tubes/2/loadedPercent');
		val+=.01;
		if(val > 1) val = 1;
		if(val < 1) {
			setValue('/systems/tubes/2/loadedPercent',val);
		}

	},
	1000
);

