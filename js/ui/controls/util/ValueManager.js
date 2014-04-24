define(
	[
		'../../modelMixin'
	],
	function(
		modelMixin
	) {

		function ValueManager(model,baseModel,user,onValue) {
			this._model = model;
			this._baseModel = baseModel;
			this._user = user;
			this._onValue = onValue;
			this._modelValue = undefined;
			this._blocking = false;

			var manager = this;

			model.$subscribeTo('valuePath',function(valuePath) {
				if(valuePath) {
					modelMixin._deepSubscribeTo(
						baseModel,
						valuePath,
						function(value) { manager._modelUpdatedValue(value); }
					);
				} else {
					manager._modelUpdatedValue(model.value);
				}
			});

			model.$subscribeTo('value',function(value) {
				if(!model.valuePath) {
					manager._modelUpdatedValue(value);
				}
			});

		}
		ValueManager.prototype.userUpdatedValue = function(value) {
			this._clearTimeout();
			this._value = value;
			this._blocking = true;

			var manager = this;
			this._timeout = setTimeout(function() {
				manager._clearTimeout();
				manager._value = manager._modelValue;
				manager._blocking = false;
				manager._reportValue();
			}, 1000);

			if(this._model.valuePath) {
				modelMixin._deepSetValue(this._baseModel,this._model.valuePath,value,this._user);
			} else {
				this._model.$update({value: value},this._user);
			}

		}
		ValueManager.prototype._modelUpdatedValue = function(value) {
			this._modelValue = value;
			if(!this._blocking) {
				this._value = value;
				this._reportValue();
			}
		}
		ValueManager.prototype._clearTimeout = function() {
			if(this._timeout) {
				clearTimeout(this._timeout);
				this._timeout = null;
			}
		}
		ValueManager.prototype._reportValue = function() {
			this._onValue(this._value);
		}

		return ValueManager;

	}
);