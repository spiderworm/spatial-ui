define(
	[
		'../../base/EventObject',
		'THREE',
		'../../util/InstanceStore'
	],
	function(
		EventObject,
		THREE,
		InstanceStore
	) {

		var threeObjects = new InstanceStore();

		function ThreeObject(model) {
			EventObject.apply(this);

			var instance = threeObjects.find(arguments);
			if(instance) {
				return instance;
			}

			threeObjects.add(this,arguments);

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

			var threeObject = this;

			if(typeof model.geometry === "string") {
				var url = model.geometry;
				var geometry = new THREE.Geometry();
				threeLoader.load(
					url,
					function(geometry) {
						threeObject.__replaceMesh(
							new THREE.Mesh(geometry,material)
						);
					}
				);

			}
			if(typeof model.geometry === "object") {
				geometry = threeLoader.parse(model.geometry).geometry;
			}

			this._mesh = new THREE.Mesh(geometry,material);

			model.position.subscribeTo(function(position) {
				threeObject._mesh.position.x = position.x;
				threeObject._mesh.position.y = position.y;
				threeObject._mesh.position.z = position.z;
			});

			model.rotation.subscribeTo(function(rotation) {
				threeObject._mesh.rotation.x = rotation.x;
				threeObject._mesh.rotation.y = rotation.y;
				threeObject._mesh.rotation.z = rotation.z;
			});
		}

		ThreeObject.prototype = new EventObject();

		ThreeObject.prototype.add = function(obj) {
			this._mesh.add(obj);
		}

		ThreeObject.prototype.getTHREE = function(){
			return this._mesh;
		}

		ThreeObject.prototype.onReplaceNeeded = function(callback) {
			return this._on('replace-needed',callback);
		}

		ThreeObject.prototype.__replaceMesh = function(newMesh) {
			var oldMesh = this._mesh;
			newMesh.position.x = oldMesh.position.x;
			newMesh.position.y = oldMesh.position.y;
			newMesh.position.z = oldMesh.position.z;
			newMesh.rotation.x = oldMesh.rotation.x;
			newMesh.rotation.y = oldMesh.rotation.y;
			newMesh.rotation.z = oldMesh.rotation.z;
			while(oldMesh.children[0]) {
				var child = oldMesh.children[0];
				oldMesh.remove(child);
				newMesh.add(child);
			}
			this._mesh = newMesh;
			this._fire('replace-needed',[oldMesh,newMesh]);
		}

		return ThreeObject;

	}
);