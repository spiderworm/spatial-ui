define(
	[
		'../../base/EventObject',
		'THREE'
	],
	function(
		EventObject,
		THREE
	) {

		function BaseObject3D(threeObject,camera) {
			EventObject.apply(this);
			this.__threeObject = threeObject;
			this.__povCamera = camera;
		}
		BaseObject3D.prototype = new EventObject();
		BaseObject3D.prototype.add = function(obj) {
			this.__threeObject.add(obj.getTHREE ? obj.getTHREE() : obj);
		}
		BaseObject3D.prototype.getTHREE = function(){
			return this.__threeObject;
		}
		BaseObject3D.prototype.onReplaceNeeded = function(callback) {
			return this._on('replace-needed',callback);
		}
		BaseObject3D.prototype._replaceTHREE = function(newTHREE) {
			var oldTHREE = this.__threeObject;
			if(oldTHREE) {
				if(oldTHREE.position && newTHREE.position) {
					newTHREE.position.copy(oldTHREE.position);
				}
				if(oldTHREE.rotation && newTHREE.rotation) {
					newTHREE.rotation.copy(oldTHREE.rotation);
				}
				if(oldTHREE.scale) {
					newTHREE.scale.copy(oldTHREE.scale);
				} 
				if(oldTHREE.children) {
					while(oldTHREE.children[0]) {
						var child = oldTHREE.children[0];
						oldTHREE.remove(child);
						newTHREE.add(child);
					}
				}
			}
			this.__threeObject = newTHREE;
			this._fire('replace-needed',[oldTHREE,newTHREE]);
		}

		return BaseObject3D;

	}
);