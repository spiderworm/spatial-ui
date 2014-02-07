define(
	[
		'./BaseObject3D',
		'THREE',
		'../../util/InstanceStore',
		'../../registry'
	],
	function(
		BaseObject3D,
		THREE,
		InstanceStore,
		registry
	) {

		var threeLoader = new THREE.JSONLoader();

		var threeObjects = new InstanceStore();

		function Object3D(model,camera) {
			var instance = threeObjects.find(arguments);
			if(instance) {
				return instance;
			}

			threeObjects.add(this,arguments);

			this._model = model;

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

				var mat =
					model.light ?
					new THREE.MeshBasicMaterial(description) :
					new THREE.MeshLambertMaterial(description)
				;

				object3D.__setMaterial(mat);

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

			model.subscribeTo('scale',function(scale) {
				var three = object3D.getTHREE();
				var scale = model.hasOwnProperty('scale') ? model.scale : 1;
				three.scale.x = scale;
				three.scale.y = scale;
				three.scale.z = scale;
			});
		}

		Object3D.prototype = new BaseObject3D();

		Object3D.prototype.prepareForRender = function() {
			var three = this.getTHREE();
			var cameraPos = this.getCamera().getPosition();
			three.position.x = this._model.position.x - cameraPos.x;
			three.position.y = this._model.position.y - cameraPos.y;
			three.position.z = this._model.position.z - cameraPos.z;
			three.rotation.x = this._model.rotation.x;
			three.rotation.y = this._model.rotation.y;
			three.rotation.z = this._model.rotation.z;
			three.rotation.order = this._model.rotation.order;
		}

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