var utilRoot = utilRoot || "./";

importScripts(utilRoot + 'Interpreter.js');

function JSONInterpreter() {
	Interpreter.apply(this);
}
JSONInterpreter.prototype = new Interpreter();
JSONInterpreter.prototype.encode = function(obj) {
	return JSON.stringify(obj);
}