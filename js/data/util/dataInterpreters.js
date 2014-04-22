define(
	[
		'jsosc/OSCMessage',
		'./ServicePacket'
	],
	function(
		OSCMessage,
		ServicePacket
	) {



		function JSONDataInterpreter() { this.wsProtocol = 'json'; }
		JSONDataInterpreter.prototype.interpret = function(raw) {
			return new ServicePacket((new Date()).getTime(),JSON.parse(raw));
		}
		JSONDataInterpreter.prototype.stringify = function(obj,timestamp) {
			return JSON.stringify(obj);
		}







		function OSCDataInterpreter() { this.wsProtocol = 'osc'; }
		OSCDataInterpreter.prototype.interpret = function(raw) {
			var result = {};
			var message = new OSCMessage(raw);
			//console.log("received: " + message.toString());
			function recurse(message)
			{
				if (message.bundle)
				{
					for (var i = 0; i < message.bundle.length; ++i)
					{
						recurse(message.bundle[i]);
					}
				}
				else if(message.getParameterCount() >= 1) {
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
						if (message.getParameterCount() > 1)
							{ target[paths[0]] = message.getParameterValues(); }
						else
							{ target[paths[0]] = message.getParameterValue(0); }
					}
				}
			}

			recurse(message);

			return new ServicePacket(
				message.timestamp,
				result
			);
		}
		OSCDataInterpreter.prototype.stringify = function(obj,timestamp) {
			var messages = [];

			function delve(obj,basePath) {
				for(var i in obj) {
					if(obj.hasOwnProperty(i)) {
						var path = basePath + '/' + i;
						if(typeof obj[i] === "object") {
							delve(obj[i],path);
						} else {
							var message = new OSCMessage(path,timestamp).addAuto(obj[i]);
							/*
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
							*/
							//console.log("sending: " + message.toString());
							messages.push(message);
						}
					}
				}
			}

			delve(obj,'');

			if (messages.length == 0)
				{ return null; }
			else
				{ return (new OSCMessage(messages,timestamp)).serialize(); }
		}




		var dataInterpreters = {
			json: new JSONDataInterpreter(),
			osc: new OSCDataInterpreter()
		};


		return dataInterpreters;

	}
);