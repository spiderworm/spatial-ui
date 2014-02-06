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


			this.__material = new THREE.MeshLambertMaterial({
				color: 0x0000ff,
				wireframe: true
			});

			var object3D = this;

			model.subscribeTo('textures',function(textures) {
				var description = {};

				for(var name in textures) {
					switch(name) {
						case "color":
							description.map = THREE.ImageUtils.loadTexture(
								textures[name]
							);
						break;
						case "normal":
							description.normalMap = THREE.ImageUtils.loadTexture(
								textures[name]
							);
						break;
					}
				}

				object3D.__setMaterial(new THREE.MeshLambertMaterial(description));

			});

			this.__geometry = new THREE.Geometry();


			var mesh = new THREE.Mesh(this.__geometry,this.__material);

			BaseObject3D.apply(this,[mesh,camera]);

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
			this.__geometry = geometry;
			this._replaceTHREE(new THREE.Mesh(geometry,this.__material));
		}

		Object3D.prototype.__setMaterial = function(material) {
			this.__material = material;
			this._replaceTHREE(new THREE.Mesh(this.__geometry,material));
		}

		return Object3D;

	}
);