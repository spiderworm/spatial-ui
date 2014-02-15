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
			this._$shadow = {};
			this.$update(vals);
		}
		Model.prototype = new EventObject();
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
			for(var name in this) {
				if(this.$hasKey(name)) {
					delete this[name];
				}
			}
			this.$update(vals,source);
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
			return this._on('deep-updated',callback);
		}
		Model.prototype.$setUpdated = function(updates,source) {
			this._$modelizeRecursively();
			if(!updates) {
				updates = this._$reconcileShadow();
			} else {
				this._$reconcileShadow();
			}
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
			if(this.hasOwnProperty(name) && name[0] !== "_") {
				return true;
			}
		}
		Model.prototype.$hasModelProperty = function(name) {
			return this.$hasKey(name);
		}
		Model.prototype._$modelizeRecursively = function() {
			var model = this;
			for(var name in this) {
				if(this.$hasKey(name)) {
					(function() {
						var theName = name;
						var val = Model.modelize(model[name]);
						if(val instanceof Model) {
							if(val !== model[name]) {
								val.$deepOnUpdated(
									function(childUpdate,source) {
										var update = {};
										update[theName] = childUpdate;
										model._fire('deep-updated',[update,source]);
									}
								);
							}
						}
						model[name] = val;
					})();
				}
			}
		}
		Model.prototype._$reconcileShadow = function() {
			var updates = {};
			for(var name in this._$shadow) {
				if(this._$shadow[name] !== this[name]) {
					updates[name] = this[name];
					this._$shadow[name] = this[name];
				}
			}
			var keys = this.$getKeys();
			for(var i=0; i<keys.length; i++) {
				if(this._$shadow[keys[i]] !== this[keys[i]]) {
					updates[keys[i]] = this[keys[i]];
					this._$shadow[keys[i]] = this[keys[i]];
				}
			}
			return updates;
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