define(
	function() {



		function JSONDataInterpreter() {}
		JSONDataInterpreter.prototype.interpret = function(text) {
			return JSON.parse(text);
		}
		JSONDataInterpreter.prototype.stringify = function(obj) {
			return JSON.stringify(obj);
		}







		function OSCDataInterpreter() {}
		OSCDataInterpreter.prototype.interpret = function(text) {
			var result = {};
			var lines = text.split('\n');
			for(var i=0; i<lines.length; i++) {
				this.__interpretLine(result,lines[i]);
			}
			return result;
		}
		OSCDataInterpreter.prototype.stringify = function(obj) {
			var osc = "";

			function delve(obj,path) {
				for(var name in obj) {
					if(typeof obj[name] === "object") {
						delve(obj[name],path + '/' + name);
					} else {
						var val = obj[name];
						var type = '';
						if(typeof val === "string") {
							type = 's';
							val = "\"" + val + "\"";
						}
						if(parseInt(val)===val) {
							type = 'i';
						}
						if(parseFloat(val)===val) {
							type = 'f'
						}
						osc += path + "/" + name + " ," + type + " " + val + "\n";
					}
				}
			}

			delve(obj,"");

			return osc;
		}
		OSCDataInterpreter.prototype.__interpretLine = function(target,line) {
			var pieces = line.match(/^([^, ]*) ,([^ ]+) (.*)/);
			if(pieces) {
				var name = pieces[1];
				var format = pieces[2][0];
				var value = pieces[3];

				if(name === "create") {

				} else {

					if(format === "i") {
						value = parseInt(value);
					}
					if(format === "f") {
						value = parseFloat(value);
					}
					if(format === "s") {
						value = value.substring(1,value.length - 1);
					}

					this.__setValue(target,name,value);

				}
			}
		}
		OSCDataInterpreter.prototype.__setValue = function(target,name,value) {
			var keys = name.split("/");
			for(var i=0; i<keys.length-1; i++) {
				if(keys[i] !== "") {
					if(!target[keys[i]]) {
						target[keys[i]] = {};
					}
					target = target[keys[i]];
				}
			}
			target[keys[keys.length-1]] = value;
		}




		var dataInterpreters = {
			json: new JSONDataInterpreter(),
			osc: new OSCDataInterpreter()
		};


		return dataInterpreters;

	}
);