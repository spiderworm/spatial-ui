define(
	[
		'./TimeDataPoint',
		'../util/clone',
		'../util/interpolate'
	],
	function(
		TimeDataPoint,
		clone,
		interpolate
	) {

		function TimeDataStore(startMS,startData) {
			this._startMS = startMS;
			this._dataPoints = [];
			this.addData(startMS,startData);
		}
		TimeDataStore.prototype.addData = function(timestamp,data) {
			var i = 0;
			for(var j=this._dataPoints.length-1; j>=0; j--) {
				if(this._dataPoints[j].timestamp <= timestamp) {
					i = j+1;
					break;
				}
			}
			this._dataPoints.splice(i,0,new TimeDataPoint(timestamp,data));
			while(this._dataPoints.length > 500) {
				this._dataPoints.shift();
			}
		}
		TimeDataStore.prototype.getDataAt = function(timestamp) {
			var points = this.__findDataPoints(timestamp);
			if(points.previous) {
				if(!points.next || points.next === points.previous) {
					return clone(points.previous.data);
				}
				var point = this.__interpolate(points.previous,points.next,timestamp);
				return point.data;
			}
			return null;
		}
		TimeDataStore.prototype.__findDataPoints = function(timestamp) {
			var result = {previous: null, next: null};
			for(var i=this._dataPoints.length-1; i>=0; i--) {
				if(this._dataPoints[i].timestamp === timestamp) {
					result.previous = result.next = this._dataPoints[i];
					break;
				} else if(this._dataPoints[i].timestamp < timestamp) {
					result.previous = this._dataPoints[i];
					if(this._dataPoints[i+1]) {
						result.next = this._dataPoints[i+1];
					}
					break;
				}
			}
			return result;
		}
		TimeDataStore.prototype.__interpolate = function(pointA,pointB,timestamp) {
			var result = new TimeDataPoint(timestamp);
			var percentage = (timestamp - pointA.timestamp) / (pointB.timestamp - pointA.timestamp);
			result.data = interpolate(pointA.data,pointB.data,percentage);
			return result;
		}

		return TimeDataStore;

	}
);