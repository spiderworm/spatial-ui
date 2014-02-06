define(
	[
		'THREE',
		'./BaseObject3D',
		'../../util/InstanceStore',
		'../../registry'
	],
	function(
		THREE,
		BaseObject3D,
		InstanceStore,
		registry
	) {


		function Camera3D() {

			var camera = new THREE.PerspectiveCamera( 75, 1, 1, 10000000000000000 );

			BaseObject3D.apply(this,[camera,camera]);

			this._x = 0;
			this._y = -10000;
			this._z = 0;

			camera.position.x = this._x;
			camera.position.y = this._y;
			camera.position.z = this._z;

			this._rotX = Math.PI/2;
			this._rotY = 0;
			this._rotZ = -Math.PI/2;

			camera.rotation.x = this._rotX;
			camera.rotation.y = this._rotY;
			camera.rotation.z = this._rotZ;

		}
		Camera3D.prototype = new BaseObject3D();
		Camera3D.prototype.getPosition = function() {
			var result = {
				x: this._x,
				y: this._y,
				z: this._z
			};
			if(this.__ship) {
				result.x += this.__ship._model.position.x;
				result.y += this.__ship._model.position.y;
				result.z += this.__ship._model.position.z;
			}
			return result;
		}


		return Camera3D;

	}
);