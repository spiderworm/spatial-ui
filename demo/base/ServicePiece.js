define(
	[
		'../../js/base/EventObject',
		'../../js/data/util/dataUtil',
		'../../js/util/now',
		'../../js/data/util/ServicePacket'
	],
	function(
		EventObject,
		dataUtil,
		now,
		ServicePacket
	) {



		function Outbox() {
			EventObject.apply(this);
			this._messages = [];
		}
		Outbox.prototype = new EventObject();
		Outbox.prototype.add = function(servicePackets) {
			if(servicePackets instanceof Array === false) {
				servicePackets = [servicePackets];
			}
			for(var i in servicePackets) {
				this._messages.push(servicePackets[i]);
			}
			this._fire('new');
		}
		Outbox.prototype.onNew = function(callback) {
			return this._on('new',callback);
		}
		Outbox.prototype.pullMessages = function() {
			var messages = this._messages;
			this._messages = [];
			return messages;
		}




		function ServicePiece() {
			try {
				EventObject.apply(this);
				this.id = this.constructor.id;
				this.outbox = new Outbox();
			} catch(e) {
				console.info(e);
			}
		}
		ServicePiece.prototype = new EventObject();
		ServicePiece.prototype.constructor = ServicePiece;
		ServicePiece.prototype.onDataReceived = function(a,b) {
			var callback = function() {};

			if(arguments.length === 1) {
				callback = a;
			} else if(arguments.length > 1) {
				var path = a;
				callback = function(data) {
					if(dataUtil.dataHasProp(data,path)) {
						b(dataUtil.getValue(data,path))
					}
				}
			}

			return this._on('data-received',callback);
		}
		ServicePiece.prototype.subscribeToOutbox = function(callback) {
			return this._on('outbox',callback);
		}
		ServicePiece.prototype.setDataReceived = function(data) {
			this._fire('data-received',[data]);
		}
		ServicePiece.prototype.sendClear = function() {
			this.outbox.add(
				new ServicePacket(
					now(),
					{'@clear': this.namespace}
				)
			);
		}
		ServicePiece.prototype.sendUpdate = function(update) {
			this.updateData(update);
			this.__sendData(update);
		}
		ServicePiece.prototype._checkOutbox = function() {
			if(this._subscriptions.length) {
				this._fire('outbox',[servicePacket]);
			}
		}

		return ServicePiece;

	}
);