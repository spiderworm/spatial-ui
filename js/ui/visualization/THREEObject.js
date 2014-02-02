define(
	[
		'THREE',
		'../../util/InstanceStore'
	],
	function(
		THREE,
		InstanceStore
	) {

		var threeObjects = new InstanceStore();

		function ThreeObject(model) {

			var instance = threeObjects.find(arguments);
			if(instance) {
				return instance;
			}

			if(model.textures[0]) {
				var material = new THREE.MeshBasicMaterial({
					map: THREE.ImageUtils.loadTexture(
						model.textures[0]
					)
				});
			} else {
				material = new THREE.MeshBasicMaterial({
					color: 0x0000ff,
					wireframe: true
				});
			}

			var threeLoader = new THREE.JSONLoader();

			var geometry = threeLoader.parse(model.geometry).geometry;

			var mesh = new THREE.Mesh(geometry,material);

			threeObjects.add(mesh,arguments);

			model.position.subscribeTo(function(position) {
				mesh.position.x = position.x;
				mesh.position.y = position.y;
				mesh.position.z = position.z;
			});

			model.rotation.subscribeTo(function(rotation) {
				mesh.rotation.x = rotation.x;
				mesh.rotation.y = rotation.y;
				mesh.rotation.z = rotation.z;
			});

			return mesh;
		}

		return ThreeObject;

	}
);