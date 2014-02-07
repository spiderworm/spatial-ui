define(
	[
		'THREE',
		'./BaseObject3D',
		'../../util/InstanceStore',
		'../../registry',
		'../../base/Model'
	],
	function(
		THREE,
		BaseObject3D,
		InstanceStore,
		registry,
		Model
	) {


		function Camera3D() {

			var threeCamera = new THREE.PerspectiveCamera( 75, 1, 1, 10000000000000000 );

			window.camera = threeCamera;

			BaseObject3D.apply(this,[threeCamera,threeCamera]);

			var model = this.__model = new Model({
				position: {
					x: 0,
					y: 1500,
					z: -8000
				},
				rotation: {
					x: 0,//Math.PI/2,
					y: Math.PI,
					z: 0//-Math.PI/2
				}
			});

			model.position.subscribeTo(function() {
				threeCamera.position.set(
					this.x,
					this.y,
					this.z
				);
			});

			model.rotation.subscribeTo(function() {
				threeCamera.rotation.set(
					this.x,
					this.y,
					this.z
				);
			});

		}
		Camera3D.prototype = new BaseObject3D();
		Camera3D.prototype.getPosition = function() {
			var result = {
				x: this.__model.position.x,
				y: this.__model.position.y,
				z: this.__model.position.z
			};
			if(this.__ship) {
				result.x += this.__ship._model.position.x;
				result.y += this.__ship._model.position.y;
				result.z += this.__ship._model.position.z;
			}
			return result;
		}


		return Camera3D;

	}
);