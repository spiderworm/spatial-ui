define(
	function() {

		function SiblingServiceConnection(port,myService) {
			var siblingService = this;
			port.onmessage = function(event) {
				if(event.data === "@@@get-service@@@") {
					var namespace = myService.namespace;
					port.postMessage("@@@namespace " + namespace);
				} else if(typeof event.data === "string" && event.data.indexOf('@@@namespace ' === 0)) {
					var namespace = event.data.match(/^@@@namespace (.*)/)[1];
					myService.registerSiblingService(namespace,siblingService);
				} else {
					console.info(event.data);
					console.info('received service info');
				}
			}
			port.postMessage('@@@get-service@@@');
		}

		return SiblingServiceConnection;

	}
);