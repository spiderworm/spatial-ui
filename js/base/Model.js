define(
	['./EventObject'],
	function(EventObject) {



		function Model(vals,id) {
			if(arguments.length === 0) {
				vals = {};
			}
			if(!vals || typeof vals !== "object") {
				throw new Error('Model must be passed an object')
			}
			EventObject.apply(this);
			this._$modelID = id || null;
			this._$shadow = {};
			this.$update(vals);
		}
		Model.prototype = new EventObject();
		Model.prototype.$getID = function() {
			return this._$modelID;
		}
		Model.prototype.$subscribeTo = function(a,b) {
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
					if(this[prop] !== lastVal || firstRun) {
						firstRun = false;
						lastVal = this[prop];
						callback.apply(this[prop],[this[prop]]);
					}
				});
			}
		}
		Model.prototype.$add = function(id,value,source) {
			var obj = {};
			obj[id] = value;
			this.$update(obj,source);
		}
		Model.prototype.$hasValue = function(value) {
			var keys = this.$getKeys();
			for(var i=0; i<keys.length; i++) {
				if(this[keys[i]]) {
					return true;
				}
			}
			return false;
		}
		Model.prototype.$getKeys = function() {
			var keys = [];
			for(var name in this) {
				if(this.$hasKey(name)) {
					keys.push(name);
				}
			}
			return keys;
		}
		Model.prototype.$overwrite = function(vals,source) {
			var updates = {};
			this.$each(function(value,index) {
				if(!vals.hasOwnProperty(index)) {
					delete this[index];
					updates[index] = undefined;
				}
			});
			for(var name in vals) {
				if(this.$hasKey.apply(vals,[name])) {
					if(typeof vals[name] === "object" && this[name] instanceof Model) {
						this[name].$overwrite(vals[name],source);
					} else {
						this[name] = vals[name];
						updates[name] = vals[name];
					}
				}
			}
			this.$setUpdated(updates,source);
		}
		Model.prototype.$update = function(vals,source) {

			var updates = {};
			for(var name in vals) {
				if(this.$hasKey.apply(vals,[name])) {
					if(this[name] && this[name] instanceof Model) {
						this[name].$update(vals[name],source)
					} else {
						if(this[name] !== vals[name]) {
							this[name] = vals[name];
							updates[name] = vals[name];
						}
					}
				}
			}
			this.$setUpdated(updates,source);
		}
		Model.prototype.$onUpdated = function(callback) {
			return this._on('updated',callback);
		}
		Model.prototype.$deepOnUpdated = function(callback) {
			return this._on('deep-updated',function() {
				callback.apply(this,arguments);
			});
		}
		Model.prototype.$ping = function(ping,source) {
			this._fire('pinged',[ping,source]);
			this._fire('deep-pinged',[ping,source]);
		}
		Model.prototype.$onPinged = function(callback) {
			return this._on('pinged',callback);
		}
		Model.prototype.$deepOnPinged = function(callback) {
			return this._on('deep-pinged',callback);
		}
		Model.prototype.$setUpdated = function(updates,source) {
			this._$modelizeRecursively();
			updates = this._$reconcileShadow();
			var updated = false;
			for(var name in updates) {
				updated = true;
				break;
			}
			if(updated) {
				this._fire('updated',[updates,source]);
				this._fire('deep-updated',[updates,source]);
			}
		}
		Model.prototype.$map = function(callback) {
			var result = [];
			for(var name in this) {
				if(this.$hasKey(name)) {
					result.push(callback.apply(this,[this[name],name]));
				}
			}
			return result;
		}
		Model.prototype.$each = function(callback) {
			var keys = this.$getKeys();
			for(var i=0; i<keys.length; i++) {
				callback.apply(this,[this[keys[i]],keys[i]]);
			}
		}
		Model.prototype.$hasKey = function(name) {
			if(this.hasOwnProperty(name) && name[0] !== "_" && name[0] !== "$") {
				return true;
			}
		}
		Model.prototype.$hasModelProperty = function(name) {
			return this.$hasKey(name);
		}
		Model.prototype._$modelizeRecursively = function() {
			for(var name in this) {
				if(this.$hasKey(name)) {
					this[name] = Model.modelize(this[name])
				}
			}
		}
		Model.prototype._$reconcileShadow = function() {
			var updates = {};
			for(var name in this._$shadow) {
				if(this._$shadow[name] !== this[name]) {
					this.__$addEvents(name);
					updates[name] = this[name];
					this._$shadow[name] = this[name];
				}
			}
			var keys = this.$getKeys();
			for(var i=0; i<keys.length; i++) {
				if(this._$shadow[keys[i]] !== this[keys[i]]) {
					this.__$addEvents(keys[i]);
					updates[keys[i]] = this[keys[i]];
					this._$shadow[keys[i]] = this[keys[i]];
				}
			}
			return updates;
		}
		Model.prototype.__$addEvents = function(prop) {
			if(this[prop] instanceof Model) {
				var model = this;
				this[prop].$deepOnUpdated(
					function(childUpdate,source) {
						var update = {};
						update[prop] = childUpdate;
						model._fire('deep-updated',[update,source]);
					}
				);
				this[prop].$deepOnPinged(
					function(childPing,source) {
						var ping = {};
						ping[prop] = childPing;
						model._fire('deep-pinged',[ping,source]);
					}
				);
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