define(
	[
		'THREE',
		'../../external/OrbitControls',
		'./BaseObject3D',
		'../../util/InstanceStore',
		'../../registry',
		'../../base/Model'
	],
	function(
		THREE,
		OrbitControls,
		BaseObject3D,
		InstanceStore,
		registry,
		Model
	) {


		function Camera3D() {

			var threeCamera = new THREE.PerspectiveCamera( 75, 1, 1, 10000000000000000 );

			BaseObject3D.apply(this,[threeCamera,threeCamera]);

			var model = this.__model = new Model({
				position: {
					x: 10000,
					y: 0,
					z: 0
				}
			});

			var camera = this;

			model.position.$subscribeTo(function() {
				threeCamera.position.set(
					this.x,
					this.y,
					this.z
				);
			});

			var controls;

			function rotateMouse() {
				requestAnimationFrame(rotateMouse);	
				if(camera.__ship) {
					if(!controls) {
						controls = new THREE.OrbitControls(
							camera.getTHREE(),
							document.querySelector('canvas')
						);
						controls.update();
					}
				}
			}
			requestAnimationFrame(rotateMouse);

		}
		Camera3D.prototype = new BaseObject3D();
		Camera3D.prototype.getPosition = function() {
			var result = {
				x: this.__model.position.x,
				y: this.__model.position.y,
				z: this.__model.position.z
			};
			if(this.__ship && this.__ship._position) {
				result.x += this.__ship._position.x;
				result.y += this.__ship._position.y;
				result.z += this.__ship._position.z;
			}
			return result;
		}


		return Camera3D;

	}
);