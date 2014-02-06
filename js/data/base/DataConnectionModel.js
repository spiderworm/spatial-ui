define(
	[
		'../../base/Model'
	],
	function(
		Model
	) {

		Model.prototype.onClientUpdated = function(callback) {
			return this._on('client-updated',callback);
		}
		var baseSetUpdated = Model.prototype.setUpdated;
		Model.prototype.setUpdated = function() {
			baseSetUpdated.apply(this,arguments);
			this._fire('client-updated',[this]);
			this._fire('updated',[this]);
		}
		Model.prototype.setSourceUpdated = function() {
			this._modelizeRecursively();
			this._fire('updated',[this]);
		}
		Model.prototype.sourceUpdate = function(vals) {
			for(var name in vals) {
				if(this.hasModelProperty.apply(vals,[name])) {
					this[name] = vals[name];
				}
			}
			this.setSourceUpdated();
		}


		return Model;

	}
);