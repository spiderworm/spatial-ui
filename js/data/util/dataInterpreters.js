define(
	[
		'./OSC/OSCMessage',
		'./OSC/DataReader',
		'./OSC/DataWriter'
	],
	function(
		OSCMessage,
		OSCDataReader,
		OSCDataWriter
	) {



		function JSONDataInterpreter() {}
		JSONDataInterpreter.prototype.interpret = function(text) {
			return JSON.parse(text);
		}
		JSONDataInterpreter.prototype.stringify = function(obj) {
			return JSON.stringify(obj);
		}







		function OSCDataInterpreter() {}
		OSCDataInterpreter.prototype.interpret = function(raw) {

			var result = {};
			var message = new OSCMessage(raw);
			if(message.getParameterCount() >= 1) {
				var paths = message.address.split('/');
				if(paths[0] === "") {
					paths.shift();
				
					var target = result;
					while(paths.length > 1) {
						var path = paths.shift();
						if(typeof target[path] !== "object") {
							target[path] = {};
						}
						target = target[path];
					}
					target[paths[0]] = message.getParameterValue(0);
				}
			}

			return result;
		}
		OSCDataInterpreter.prototype.stringify = function(obj) {
			var messages = [];

			function delve(obj,basePath) {
				for(var i in obj) {
					if(obj.hasOwnProperty(i)) {
						var path = basePath + '/' + i;
						if(typeof obj[i] === "object") {
							delve(obj[i],path);
						} else {
							var message = new OSCMessage(path);
							switch(typeof obj[i]) {
								case "string":
									message.addString(obj[i]);
								break;
								case "number": {
									if(parseInt(obj[i]) === obj[i]) {
										message.addInt32(obj[i]);
									} else {
										message.addFloat64(obj[i]);
									}
								}
							}
							messages.push(message);
						}
					}
				}
			}

			delve(obj,'');

			return messages;
		}




		var dataInterpreters = {
			json: new JSONDataInterpreter(),
			osc: new OSCDataInterpreter()
		};


		return dataInterpreters;

	}
);