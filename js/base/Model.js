define(
	['./EventObject'],
	function(EventObject) {



		function Model(vals) {
			if(arguments.length === 0) {
				vals = {};
			}
			if(vals instanceof Array) {
				return new ArrayModel(vals);
			}
			if(!vals || typeof vals !== "object") {
				throw new Error('Model must be passed an object')
			}
			EventObject.apply(this);
			for(var name in vals) {
				if(vals.hasOwnProperty(name)) {
					this[name] = vals[name];
				}
			}
			this.__modelizeRecursively();
			var model = this;
			this.onUpdated(function() {
				model.__modelizeRecursively();
			});
		}
		Model.prototype = new EventObject();
		Model.prototype.subscribeTo = function(a,b) {
			var callback, prop, lastVal, firstRun;
			if(arguments.length === 1) {
				callback = a;
				return this._subscribe('updated',function() {
					callback(this);
				});
			} else if (arguments.length === 2) {
				prop = a;
				callback = b;
				firstRun = true;
				return this._subscribe('updated',function() {
					if(this[a] !== lastVal || firstRun) {
						firstRun = false;
						lastVal = this[a];
						callback(this[a]);
					}
				});
			}
		}
		Model.prototype.onUpdated = function(callback) {
			return this._on('updated',callback);
		}
		Model.prototype.setUpdated = function() {
			this._fire('updated');
		}
		Model.prototype.mapToArray = function(callback) {
			var result = [];
			for(var name in this) {
				if(this.hasOwnProperty(name) && name[0] !== "_") {
					result.push(callback.apply(this,[name,this[name]]));
				}
			}
			return result;
		}
		Model.prototype.__modelizeRecursively = function() {
			for(var name in this) {
				if(this.hasOwnProperty(name)) {
					if(name[0] !== "_") {
						this[name] = Model.modelize(this[name]);
					}
				}
			}
		}






		Model.modelize = function(val) {
			if(val instanceof Model) {
				return val;
			}
			if(val instanceof Array) {
				return new ArrayModel(val);
			}
			if(val === null) {
				return null;
			}
			switch(typeof val) {
				case "string":
				case "number":
				case "boolean":
				case "undefined":
				case "function":
					return val;
				break;
			}
			return new Model(val);
		}









		function ArrayModel(arr) {
			if(arr.setUpdated)
				return arr;
			var result = [].concat(arr);
			for(var name in Model.prototype) {
				result[name] = Model.prototype[name];
			}
			Model.apply(result);

			function modelizeRecursively() {
				ArrayModel.prototype.__modelizeRecursively.apply(result);
			}

			result.onUpdated(modelizeRecursively);
			modelizeRecursively();

			return result;
		}

		ArrayModel.prototype.__modelizeRecursively = function() {
			for(var i=0; i<this.length; i++) {
				this[i] = Model.modelize(this[i]);
			}
		}








		return Model;
	}
)