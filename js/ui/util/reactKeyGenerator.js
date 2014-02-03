define(
	[
		'../../util/InstanceStore'
	],
	function(
		InstanceStore
	) {

		var reactKeyGenerator = {
			getKey: function(signature) {
				var key = this.__store.find(signature);
				if(!key) {
					key = this.getNewKey();
					this.__store.add(key,signature);
				}
				return key;
			},
			getNewKey: function() {
				this.__last++;
				return this.__last;
			},
			__last: 0,
			__store: new InstanceStore()
		};

		reactKeyGenerator.mixin = {
			getKey: function(signature) {
				return reactKeyGenerator.getKey(signature);
			}
		};

		return reactKeyGenerator;

	}
);