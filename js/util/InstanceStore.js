define(
	function() {


		function InstanceStore() {
			this.__instances = [];
		}
		InstanceStore.prototype.find = function(signature) {
			for(var i=0; i<this.__instances.length; i++) {
				if(arraysMatch(
					this.__instances[i].signature,
					signature)
				) {
					return this.__instances[i].instance;
				}
			}
		}
		InstanceStore.prototype.add = function(instance,signature) {
			var other = this.find(signature);
			if(other) {
				throw new Error('matching instance already exists');
			}
			this.__instances.push(
				{
					signature: signature,
					instance: instance
				}
			);
		}



		function arraysMatch(arr1,arr2) {
			if(arr1 === arr2) {
				return true;
			}
			if(arr1.length !== arr2.length) {
				return false;
			}
			for(var i=0; i<arr1.length; i++) {
				if(arr1[i] !== arr2[i]) {
					return false;
				}
			}
			return true;
		}




		return InstanceStore;
	}
);