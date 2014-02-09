define(
	[
		'../../base/EventObject',
		'../util/comm'
	],
	function(
		EventObject,
		comm
	) {






		function DataChannelBase(url,interpreter) {
			EventObject.apply(this);
			this._url = url;
			this._interpreter = interpreter;
		}
		DataChannelBase.prototype = new EventObject();
		DataChannelBase.prototype.open = function(callback) {
			throw new Error('not implemented');
		}
		DataChannelBase.prototype.onData = function(callback) {
			return this._on('data-received',callback);
		}
		DataChannelBase.prototype.onOpened = function(callback) {
			return this._on('opened',callback);
		}
		DataChannelBase.prototype._setOpened = function() {
			this._fire('opened');
		}
		DataChannelBase.prototype._handleRaw = function(raw) {
			var data = this._interpreter.interpret(raw);
			this._fire('data-received',[data]);
		}
	







		function AJAXDataChannel(url,interpreter) {
			DataChannelBase.apply(this,[url,interpreter]);
		}
		AJAXDataChannel.prototype = new DataChannelBase();
		AJAXDataChannel.prototype.open = function(callback) {
			var channel = this;
			comm.ajaxraw(
				this._url,
				function(raw) {
					channel._setOpened();
					callback();
					channel._handleRaw(raw);
				}
			);
		}












		function JSONDataInterpreter() {

		}

		JSONDataInterpreter.prototype.interpret = function(text) {
			return JSON.parse(text);
		}

		var jsonDataInterpreter = new JSONDataInterpreter();







		function OSCDataInterpreter() {}
		OSCDataInterpreter.prototype.interpret = function(text) {
			var result = {};
			var lines = text.split('\n');
			for(var i=0; i<lines.length; i++) {
				this.__interpretLine(result,lines[i]);
			}
			console.info(result);
			return result;
		}
		OSCDataInterpreter.prototype.__interpretLine = function(target,line) {
			var pieces = line.match(/^([^, ]*) ,([^]+) (.*)/);
			if(pieces) {
				var name = pieces[1];
				var format = pieces[2][0];
				var value = pieces[3];

				if(format === "i") {
					value = parseInt(value);
				}
				if(format === "f") {
					value = parseFloat(value);
				}

				this.__setValue(target,name,value);
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
		var oscDataInterpreter = new OSCDataInterpreter();











		function DataChannel(url,connectionType,dataFormat) {
			var interpreter = jsonDataInterpreter;
			if(dataFormat === "osc") {
				interpreter = oscDataInterpreter;
			}
			if(connectionType.toLowerCase() === "ajax") {
				return new AJAXDataChannel(url,interpreter);
			}
		}


		return DataChannel;

	}
);