define(
	[
		'base/EventObject'
	],
	function(
		EventObject
	) {

		function SiblingServiceConnection(port,myService) {
			try {

			EventObject.apply(this);
			this._port = port;
			this.namespace = "";
			this.modeID = "";

			myService.subscribeToMode(function(mode) {
				if(mode) {
					port.postMessage('@@@mode ' + mode.id);
				}
			});

			var siblingService = this;
			port.onmessage = function(event) {
				if(typeof event.data === "string") {
					if(event.data === "@@@get-service@@@") {
						var namespace = myService.namespace;
						port.postMessage("@@@namespace " + namespace);
					} else if(event.data.indexOf('@@@namespace ') === 0) {
						var namespace = event.data.match(/^@@@namespace (.*)/)[1];
						siblingService.namespace = namespace;
						myService.addServiceConnection(siblingService);
					} else if(event.data.indexOf('@@@mode ') === 0) {
						var mode = event.data.match(/^@@@mode (.*)/)[1];
						siblingService.modeID = mode;
						siblingService._fire('mode-change',[mode]);
					} else if(event.data.indexOf('@@@set-mode ' === 0)) {
						var modeID = event.data.match(/^@@@set\-mode (.*)/)[1];
						myService.setModeByID(modeID);
					}
				} else {
					console.info(event.data);
					console.info('received service info');
				}
			}
			port.postMessage('@@@get-service@@@');

			} catch(e) {
				console.info(e);
			}
		}
		SiblingServiceConnection.prototype = new EventObject();

		SiblingServiceConnection.prototype.subscribeToModeID = function(callback) {
			var handler = this._on('mode-change',callback);
			handler.fire([this.modeID]);
			return handler;
		}

		SiblingServiceConnection.prototype.setModeID = function(modeID) {
			this._port.postMessage('@@@set-mode ' + modeID);
		}

		return SiblingServiceConnection;

	}
);