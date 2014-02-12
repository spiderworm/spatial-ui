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
		Comm.prototype = new EventObject();
		Comm.prototype.ajax = function(url,callback) {
			var r = new XMLHttpRequest();
			r.open('GET',url);
			var comm = this;
			r.onreadystatechange = function() {
				if(r.readyState === 4 && r.status === 200) {
					callback.apply(r,[r.responseText]);
				}
			}
			r.send();
		}


		var comm = new Comm();
		return comm;

	}
);