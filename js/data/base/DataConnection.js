define(
	[
		'../../util/InstanceStore',
		'../../base/EventObject',
		'../../base/Model',
		'../util/DataChannel'
	],
	function(
		InstanceStore,
		EventObject,
		Model,
		Channel
	) {







		function Extrapolator() {
			this._lastStamp = (new Date()).getTime();

			this._models = [];

			var extrapolator = this;
			function doTick() {
				requestAnimationFrame(doTick);
				extrapolator.__tick();
			}

			requestAnimationFrame(doTick);
		}
		Extrapolator.prototype.enable = function(model) {

			if(model.__extrapolating) {
				return;
			}

			model.__extrapolating = true;

			var extrapolator = this;

			model.$subscribeTo(
				'velocity',
				function(velocity) {
					if(velocity) {
						extrapolator.__add(model);
					} else {
						extrapolator.__remove(model);
					}
				}
			);

			model.$subscribeTo(
				function() {
					this.$each(function(subModel) {
						if(subModel instanceof Model) {
							extrapolator.enable(subModel);
						}
					});
				}
			);

		}

		Extrapolator.prototype.__add = function(model) {
			if(model.velocity instanceof Model && this._models.indexOf(model) === -1) {
				this._models.push(model);
			}
		}

		Extrapolator.prototype.__remove = function(model) {
			var i = this._models.indexOf(model);
			if(i !== -1) {
				this._models.splice(i,1);
			}
		}

		Extrapolator.prototype.__tick = function() {
			var stamp = (new Date()).getTime();
			var seconds = (stamp - this._lastStamp)/1000;
			this._lastStamp = stamp;
			for(var i in this._models) {
				this.__tickModel(this._models[i],seconds);
			}
		}

		Extrapolator.prototype.__tickModel = function(model,seconds) {
			if(model.velocity && model.velocity instanceof Model) {
				var keys = model.velocity.$getKeys();
				for(var i in keys) {
					if(keys[i] !== "velocity") {
						model[keys[i]] += seconds * model.velocity[keys[i]];
					}
				}
			}
		}


		var extrapolator = new Extrapolator();











		var dataConnectionSource = {};

		function DataConnection(user,url,connectionType,dataFormat) {
			EventObject.apply(this);
			var model = this._model = new Model();
			if(url && connectionType && dataFormat) {
				var connection = this;
				var channel = this._channel = new Channel(url,connectionType,dataFormat);
				channel.onData(function(data) {
					model.$update(data,dataConnectionSource);
				});
				channel.open(function() {
					connection._setConnected();
				});
				model.$deepOnUpdated(function(updateObj,source) {
					if(source !== dataConnectionSource) {
						channel.send(updateObj);
					}
				});

				extrapolator.enable(model);

			}
		}
		DataConnection.prototype = new EventObject();
		DataConnection.prototype.getModel = function() {
			return this._model;
		}
		DataConnection.prototype.onConnected = function(callback) {
			return this._on('connected',callback);
		}
		DataConnection.prototype._setConnected = function() {
			this._fire('connected',[this]);
		}







		return DataConnection;

	}
);