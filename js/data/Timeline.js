define(
	['../base/EventObject'],
	function(EventObject) {

		function Timeline(timeDataStore,currentMS) {
			EventObject.apply(this);
			this._timeDataStore = timeDataStore;
			this._currentMS = currentMS;
			this._lastTickMS = currentMS;
			this._currentData = null;

			var sync = this;
			function tick() {
				sync._tick();
				requestAnimationFrame(tick);
			}
			requestAnimationFrame(tick);
		}
		Timeline.prototype = new EventObject();
		Timeline.PLAYING = 'playing';
		Timeline.prototype.play = function() {
			this._state = Timeline.PLAYING;
			this._lastTickMS = (new Date()).getTime();
		}
		Timeline.prototype.onNewData = function(callback) {
			return this._on('new-data',callback);
		}
		Timeline.prototype._tick = function() {
			if(this._state === Timeline.PLAYING) {
				var ms = (new Date()).getTime();
				var msdelta = ms - this._lastTickMS;
				this._lastTickMS = ms;

				this._currentMS += msdelta;

				this._currentData = this._timeDataStore.getDataAt(this._currentMS);

				this._fire('new-data',[this._currentData]);
			}
		}

		return Timeline;

	}
);