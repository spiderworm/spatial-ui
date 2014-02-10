define(
	['./EventObject'],
	function(EventObject) {



		function Model(vals) {
			if(arguments.length === 0) {
				vals = {};
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
			this._modelizeRecursively();

		}
		Model.prototype = new EventObject();
		Model.prototype.subscribeTo = function(a,b) {
			var callback, prop, lastVal, firstRun;
			if(arguments.length === 1) {
				callback = a;
				return this._subscribe('updated',function() {
					callback.apply(this,[this]);
				});
			} else if (arguments.length === 2) {
				prop = a;
				callback = b;
				firstRun = true;
				return this._subscribe('updated',function() {
					if(this[a] !== lastVal || firstRun) {
						firstRun = false;
						lastVal = this[a];
						callback.apply(this[a],[this[a]]);
					}
				});
			}
		}
		Model.prototype.add = function(value) {
			var i=0;
			while(this[i]) {
				i++;
			}
			var obj = {};
			obj[i] = value;
			this.update(obj);
		}
		Model.prototype.hasValue = function(value) {
			var keys = this.getKeys();
			for(var i=0; i<keys.length; i++) {
				if(this[keys[i]]) {
					return true;
				}
			}
			return false;
		}
		Model.prototype.getKeys = function() {
			var keys = [];
			for(var name in this) {
				if(this.hasModelProperty(name)) {
					keys.push(name);
				}
			}
			return keys;
		}
		Model.prototype.overwrite = function(vals) {
			for(var name in this) {
				if(this.hasModelProperty(name)) {
					delete this[name];
				}
			}
			this.update(vals);
		}
		Model.prototype.update = function(vals) {
			for(var name in vals) {
				if(this.hasModelProperty.apply(vals,[name])) {
					this[name] = vals[name];
				}
			}
			this.setUpdated();
		}
		Model.prototype.onUpdated = function(callback) {
			return this._on('updated',callback);
		}
		Model.prototype.setUpdated = function() {
			this._modelizeRecursively();
			this._fire('updated');
		}
		Model.prototype.map = function(callback) {
			var result = [];
			for(var name in this) {
				if(this.hasModelProperty(name)) {
					result.push(callback.apply(this,[this[name]]));
				}
			}
			return result;
		}
		Model.prototype.each = function(callback) {
			var keys = this.getKeys();
			for(var i=0; i<keys.length; i++) {
				callback.apply(this,[this[keys[i]]]);
			}
		}
		Model.prototype.hasModelProperty = function(name) {
			if(this.hasOwnProperty(name) && name[0] !== "_") {
				return true;
			}
		}
		Model.prototype._modelizeRecursively = function() {
			for(var name in this) {
				if(this.hasModelProperty(name)) {
					this[name] = Model.modelize(this[name]);
				}
			}
		}






		Model.modelize = function(val) {
			if(val instanceof Model) {
				return val;
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






		return Model;
	}
)