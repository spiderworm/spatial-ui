var utilRoot = utilRoot || "./";

importScripts(utilRoot + 'Interpreter.js');

function OSCInterpreter() {
	Interpreter.apply(this);
}
OSCInterpreter.prototype = new Interpreter();
OSCInterpreter.prototype.encode = function(obj) {

	var result = "";

	function encode(obj,path) {
		for(var i in obj) {
			if(obj.hasOwnProperty(i)) {
				if(typeof obj[i] === "object") {
					encode(obj[i],path + "/" + i);
				} else {
					var type, value;

					switch(typeof obj[i]) {
						case "number":
							value = obj[i];
							if(parseInt(obj[i]) === obj[i]) {
								type = "i";
							} else {
								type = "f";
							}
						break;
						case "string":
							type = "s";
							value = '"' + obj[i] + '"';
						break;
						default:
							throw new Error('unknown value type');
						break;
					}

					result += path + "/" + i + " ," + type + " " + value + "\n";
				}
			}
		}
	}

	encode(obj,'');
	return result;
}
