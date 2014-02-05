define(
	[
		'./BaseObject3D',
		'THREE',
		'../../util/InstanceStore'
	],
	function(
		BaseObject3D,
		THREE,
		InstanceStore
	) {

		var threeLoader = new THREE.JSONLoader();

		var threeObjects = new InstanceStore();

		function Object3D(model,camera) {
			var instance = threeObjects.find(arguments);
			if(instance) {
				return instance;
			}

			threeObjects.add(this,arguments);

			if(model.textures && model.textures[0]) {
				this.__material = new THREE.MeshLambertMaterial({
					map: THREE.ImageUtils.loadTexture(
						model.textures[0]
					)
				});
			} else {
				this.__material = new THREE.MeshLambertMaterial({
					color: 0x0000ff,
					wireframe: true
				});
			}

			var mesh = new THREE.Mesh(new THREE.Geometry(),this.__material);

			BaseObject3D.apply(this,[mesh,camera]);

			var object3D = this;

			model.subscribeTo('geometry',function(definition) {
				if(definition) {
					if(typeof definition === "string") {
						var url = definition;
						threeLoader.load(
							url,
							function(geometry) {
								object3D.__setGeometry(geometry);
							}
						);
					} else {
						var geometry = threeLoader.parse(definition).geometry;
						object3D.__setGeometry(geometry);
					}
				}
			});

			model.subscribeTo('light',function(definition) {
				if(definition) {
					var light = new THREE.PointLight(
						eval(definition.color),
						definition.intensity,
						definition.distance
					);
					object3D.add(light);
				}
			});

			model.position.subscribeTo(function(position) {
				var three = object3D.getTHREE();
				three.position.x = position.x;
				three.position.y = position.y;
				three.position.z = position.z;
			});

			model.rotation.subscribeTo(function(rotation) {
				var three = object3D.getTHREE();
				three.rotation.x = rotation.x;
				three.rotation.y = rotation.y;
				three.rotation.z = rotation.z;
			});
		}

		Object3D.prototype = new BaseObject3D();

		Object3D.prototype.__setGeometry = function(geometry) {
			this._replaceTHREE(new THREE.Mesh(geometry,this.__material));
		}
		return Object3D;

	}
);