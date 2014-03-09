define(
	[
		'base/EventObject'
	],
	function(
		EventObject
	) {

		function ServiceMode() {
			EventObject.apply(this);
			this.data = {};
			this.id = this.constructor.id;
		}
		ServiceMode.id = "ServiceMode";
		ServiceMode.prototype = new EventObject();
		ServiceMode.prototype.constructor = ServiceMode;
		ServiceMode.prototype.onDone = function(callback) {
			return this._on('done',callback);
		}

		return ServiceMode;

	}
);