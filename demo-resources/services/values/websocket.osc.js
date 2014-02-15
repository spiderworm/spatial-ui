importScripts('../../../js/external/require.js');

require.config({
	baseUrl: '../../../js/'
});

require(
	[
		'../demo-resources/services/util/MockWebSocketServer',
		'data/util/dataInterpreters'
	],
	function(
		MockWebSocketServer,
		interpreters
	) {


		var server = new MockWebSocketServer(interpreters.osc);

		server.setData({
			values: {
				engineering: {
					energy: {
						levels: {
							impulse: 150,
							tubes: 100,
							phasers: 25
						}
					}
				},
				weapons: {
					ammo: {
						torpedos: 0
					},
					phasers: {
						enabled: 1,
						frequency: "C"
					}
				},
				systems: {
					tubes: {
						1: {
							currentAmmo: "torpedos",
							loadedPercent: 0.5,
							fire: 0,
							keepLoaded: 0,
							autoFire: 0
						},
						2: {
							currentAmmo: 'big fat nuke',
							loadedPercent: 1,
							fire: 0,
							keepLoaded: 1,
							autoFire: 1
						}
					}
				}
			}
		});


		server.send();


		function handleMessageReceived(msg) {

			reportReceived(msg.name,msg.value);

			switch(msg.name) {
				case "/values/systems/tubes/1/fire":
				case "/values/systems/tubes/2/fire":
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









		/*
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
		*/




		setInterval(
			function() {

				var torpedos = server.getData().values.weapons.ammo.torpedos + 1;

				server.sendUpdate({values: {weapons: {ammo: {torpedos: torpedos} } } });

				var val = server.getData().values.systems.tubes[1].loadedPercent;
				val+=.01;
				if(val > 1) val = 1;
				if(val < 1) {
					server.sendUpdate({values: {systems: {tubes: {1: { loadedPercent: val }}}}});
				}

				var val = server.getData().values.systems.tubes[2].loadedPercent;
				val+=.01;
				if(val > 1) val = 1;
				if(val < 1) {
					server.sendUpdate({values: {systems: {tubes: {2: { loadedPercent: val }}}}});
				}

			},
			1000
		);

	}
);