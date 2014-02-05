define(
	[
		'THREE',
		'./Sky3D',
		'./Object3D',
		'../../util/InstanceStore'
	],
	function(
		THREE,
		Sky3D,
		Object3D,
		InstanceStore
	) {

		function Scene3D(model,camera) {
			var scene = new THREE.Scene();

			model.subscribeTo(function() {
				if(model.sky) {
					var sky = new Sky3D(model.sky);
					scene.add(sky);
				}
				if(model.objects) {
					for(var i=0; i<model.objects.length; i++) {
						var obj = new Object3D(model.objects[i]);
						if(model.objects[i].id === "myShip") {
							obj.add(camera);
						}
						scene.add(obj.getTHREE());
						obj.onReplaceNeeded(function(oldTHREE,newTHREE) {
							scene.remove(oldTHREE);
							scene.add(newTHREE);
						});
					}
				}

			});

			return scene;
		}

		return Scene3D;

	}
);