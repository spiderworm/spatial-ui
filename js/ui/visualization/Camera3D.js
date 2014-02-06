define(
	[
		'THREE',
		'./BaseObject3D',
		'../../util/InstanceStore'
	],
	function(
		THREE,
		BaseObject3D,
		InstanceStore
	) {


		function Camera3D() {

			var camera = new THREE.PerspectiveCamera( 75, 1, 1, 10000000000000000 );

			BaseObject3D.apply(this,[camera,camera]);

			this._x = 0;
			this._y = -1000;
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


		return Camera3D;

	}
);