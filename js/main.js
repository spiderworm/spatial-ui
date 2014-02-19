
if (window.require !== window.requirejs) {
	window.require = window.requirejs;
	window.require.nodeRequire = global.require;
}

(function() {

	var app;

	var x = new XMLHttpRequest();
	x.open('GET','js/require-config.json',true);
	x.onreadystatechange = function ()
	{
		if (x.readyState == 4)
		{
			var config = JSON.parse(x.responseText);
			require.config(config);

			require(
				[
					'./App'
				],
				function(App) {
					app = new App();
					app.start();
				}
			);
		}
	}

	x.send();

	function API() {
		var api = this;
		this.__callbacks = [];
		this.__interval = setInterval(function() {
			api.__checkReady();
		}, 100);
	}
	API.prototype.getModel = function() {
		if(app) {
			return app.getModel();
		}
	}
	API.prototype.setStoryConnectionInfo = function(url,connectionType,dataFormat,connect) {
		if(this.isReady()) {
			this.getModel().story.$update({
				url: url,
				connectionType: connectionType || 'websocket',
				dataFormat: dataFormat || 'osc',
				connect: connect ? true : false
			});
		}
	}
	API.prototype.connect = function() {
		if(this.isReady()) {
			this.getModel().story.$update({connect: true});
		}
	}
	API.prototype.onReady = function(callback) {
		this.__callbacks.push(callback);
		this.__checkReady();
	}
	API.prototype.isReady = function() {
		return app && app.isStarted();
	}
	API.prototype.__checkReady = function() {
		if(this.isReady()) {
			if(this.__interval) {
				clearInterval(this.__interval);
				delete this.__interval;
			}
			while(this.__callbacks.length) {
				var callback = this.__callbacks.shift();
				callback();
			}
		}
	}

	window.api = new API();

	/* SERVER INSERTION POINT */
})();
