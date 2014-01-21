define(
	[
	],
	function(
	) {

		function Registry() {
			this.__entries = {};
			this.set('mock',false);
		}
		Registry.prototype.set = function(name,value) {
			this.__entries[name] = value;
		}
		Registry.prototype.get = function(name) {
			return this.__entries[name];
		}


		var registry = new Registry();
		return registry;
	}
);