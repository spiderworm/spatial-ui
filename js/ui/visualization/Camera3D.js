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

			BaseObject3D.apply(this,[threeCamera,threeCamera]);

			var model = this.__model = new Model({
				position: {
					x: 0,
					y: 0,
					z: 0
				},
				distance: 9000,
				angleY: 0,
				angleX: 5
			});

			var camera = this;

			model.position.$subscribeTo(function() {
				threeCamera.position.set(
					this.x,
					this.y,
					this.z
				);
			});

			function rotateMouse() {
				requestAnimationFrame(rotateMouse);
				model.angleY += .002;
				model.$setUpdated();


				var vector = new THREE.Vector3(model.distance,0,0);
				var euler = new THREE.Euler(model.angleX,model.angleY,0,'YXZ');
				vector.applyEuler(euler);

				model.position.$update({
					x: vector.x,
					y: vector.y,
					z: vector.z
				});
				if(camera.__ship) {
					camera.getTHREE().lookAt(camera.__ship.getTHREE().position);
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