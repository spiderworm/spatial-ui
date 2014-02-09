define(
	[
		'../../base/EventObject'
	],
	function(
		EventObject
	) {

		function Comm() {
			EventObject.apply(this);
		}
		Comm.JSON = ['json'];
		Comm.prototype = new EventObject();
		Comm.prototype.ajax = function(url,callback) {
			if(!url) {
				debugger;
			}
			var responseType = this.__guessResponseType(url);
			var r = new XMLHttpRequest();
			r.open('GET',url);
			var comm = this;
			r.onreadystatechange = function() {
				if(r.readyState === 4) {
					var response = comm.__translateResponse(responseType,r.responseText)
					callback.apply(r,[response]);
				}
			}
			r.send();
		}
		Comm.prototype.__guessResponseType = function(url) {
			return Comm.JSON;
		}
		Comm.prototype.__translateResponse = function(type,raw) {
			if(type===Comm.JSON) {
				return JSON.parse(raw);
			}
			return raw;
		}


		var comm = new Comm();
		return comm;

	}
);