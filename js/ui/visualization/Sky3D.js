define(
	[
		'THREE',
		'../../util/InstanceStore'
	],
	function(
		THREE,
		InstanceStore
	) {


		function ThreeSky(model) {
			var geometry = new THREE.CubeGeometry(
				1000000000000,
				1000000000000,
				1000000000000
			);

			var textures = [];
			for(var i=0; i<6; i++) {
				textures.push(
					new THREE.MeshBasicMaterial({
						map: THREE.ImageUtils.loadTexture(model.textures[i]),
						side: THREE.BackSide
					})
				);
			}

			var material = new THREE.MeshFaceMaterial(textures);

			return new THREE.Mesh(geometry,material);
		}

		return ThreeSky;

	}
);