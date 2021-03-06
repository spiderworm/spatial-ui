define(
	[
		'./BaseObject3D',
		'THREE',
		'../../util/InstanceStore',
		'../../registry',
		'../../util/modelUtil'
	],
	function(
		BaseObject3D,
		THREE,
		InstanceStore,
		registry,
		modelUtil
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
				wireframe: true,
				side: THREE.DoubleSide
			});

			var object3D = this;

			model.$subscribeTo('textures',function(textures) {
				var description = {
					//side: THREE.DoubleSide
				};

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
			mesh.useQuaternion = true;

			BaseObject3D.apply(this,[mesh,camera]);

			model.$subscribeTo('geometry',function(definition) {
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

			model.$subscribeTo('light',function(definition) {
				if(definition) {
					var light = new THREE.PointLight(
						eval(definition.color),
						definition.intensity,
						definition.distance
					);
					object3D.add(light);
				}
			});

			model.$subscribeTo('scale',function(scale) {
				var three = object3D.getTHREE();
				var scale = model.hasOwnProperty('scale') ? model.scale : 1;
				three.scale.x = scale;
				three.scale.y = scale;
				three.scale.z = scale;
			});

			this._position = null;

			modelUtil.subscribeTo(
				model,
				'position',
				function(position) {
					object3D._position = position;
				}
			);

			this._rotation = null;

			modelUtil.subscribeTo(
				model,
				'rotation',
				function(rotation) {
					object3D._rotation = rotation;
				}
			);
			
		}

		Object3D.prototype = new BaseObject3D();

		Object3D.prototype.prepareForRender = function() {
			if(this._position && this._rotation) {
				var three = this.getTHREE();
				var cameraPos = this.getCamera().getPosition();
				three.position.x = this._position.x - cameraPos.x;
				three.position.y = this._position.y - cameraPos.y;
				three.position.z = this._position.z - cameraPos.z;
				three.quaternion.x = this._rotation.x;
				three.quaternion.y = this._rotation.y;
				three.quaternion.z = this._rotation.z;
				three.quaternion.w = this._rotation.w;
			}
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