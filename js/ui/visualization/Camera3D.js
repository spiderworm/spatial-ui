define(
	[
		'THREE',
		'../../util/InstanceStore'
	],
	function(
		THREE,
		InstanceStore
	) {

		function Camera3D() {
			var camera = new THREE.PerspectiveCamera( 75, 1, 1, 10000000000 );
			camera.position.y = -1000;
			camera.rotation.x = Math.PI/2;
			camera.rotation.z = -Math.PI/2;

			return camera;
		}

		return Camera3D;

	}
);