var utilRoot = utilRoot || "./";

importScripts(utilRoot + 'JSONInterpreter.js');

function MockWebsocketServer(interpreter){
	this._interpreter = interpreter;
}

MockWebsocketServer.prototype.getData = function() {

	function clone(data) {
		var result = {};
		for(var i in data) {
			if(data.hasOwnProperty(i)) {
				if(typeof data[i] === "object") {
					result[i] = clone(data[i]);
				} else {
					result[i] = data[i];
				}
			}
		}
		return result;
	}

	return clone(this._data);
}

MockWebsocketServer.prototype.setData = function(data) {
	this._data = data;
}

MockWebsocketServer.prototype.updateData = function(update) {

	function delve(target,update) {
		for(var i in update) {
			if(update.hasOwnProperty(i)) {
				if(typeof update[i] === "object") {
					if(typeof target[i] !== "object") {
						target[i] = {};
					}
					delve(target[i],update[i]);
				} else {
					target[i] = update[i];
				}
			}
		}
	}

	delve(this._data,update);

}

MockWebsocketServer.prototype.send = function() {
	this.__sendData(this._data);
}

MockWebsocketServer.prototype.sendUpdate = function(update) {
	this.updateData(update);
	this.__sendData(update);
}

MockWebsocketServer.prototype.__sendData = function(data) {
	var message = this._interpreter.encode(data);
	self.postMessage(message);
}