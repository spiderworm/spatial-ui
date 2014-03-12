define(
	[
		'./ServicePiece',
		'../../js/data/util/dataUtil',
		'../../js/util/now',
		'../../js/data/util/ServicePacket'
	],
	function(
		ServicePiece,
		dataUtil,
		now,
		ServicePacket
	) {



		function ServiceMode() {
			ServicePiece.apply(this);
			this._data = {};
			this.id = this.constructor.id;
		}
		ServiceMode.id = "ServiceMode";
		ServiceMode.prototype = new ServicePiece();
		ServiceMode.prototype.constructor = ServiceMode;
		ServiceMode.prototype.onDone = function(callback) {
			return this._on('done',callback);
		}
		ServiceMode.prototype.getData = function(path) {

			if(!path) {
				return dataUtil.clone(this._data);
			} else {

				var value = dataUtil.getValue(this._data,path);

				if(value && typeof value === "object") {
					return dataUtil.clone(value);
				} else {
					return value;
				}
			}

		}
		ServiceMode.prototype.setData = function(data) {
			this._data = dataUtil.clone(data);
		}
		ServiceMode.prototype.updateData = function(a,b) {
			if(arguments.length === 1) {
				dataUtil.update(this._data,a);
			}
			if(arguments.length === 2) {
				dataUtil.updatePath(this._data,a,b);
			}
		}
		ServiceMode.prototype.send = function() {
			this.outbox.add(
				new ServicePacket(
					now(),
					this._data
				)
			);
		}
		ServiceMode.prototype.sendUpdate = function(update) {
			this.updateData(update);
			this.outbox.add(
				new ServicePacket(
					now(),
					update
				)
			);
		}

		return ServiceMode;

	}
);