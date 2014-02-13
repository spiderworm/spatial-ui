var utilRoot = utilRoot || "./";

importScripts(utilRoot + 'Interpreter.js');

function JSONInterpreter() {
	Interpreter.apply(this);
}
JSONInterpreter.prototype = new Interpreter();