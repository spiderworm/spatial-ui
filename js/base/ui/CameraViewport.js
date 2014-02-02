define(
	[
		'react',
		'THREE',
		'../../universe/data/connectionFactory',
		'./THREEObject'
	],
	function(
		React,
		THREE,
		universeDataConnectionFactory,
		THREEObject
	) {


		function ThreeCamera() {
			var camera = new THREE.PerspectiveCamera( 75, 1, 1, 10000000000 );
			camera.position.y = -1000;
			camera.rotation.x = Math.PI/2;
			camera.rotation.z = -Math.PI/2;

			return camera;
		}




		function ThreeScene(model,camera) {
			var scene = new THREE.Scene();

			model.subscribeTo(function() {
				if(model.sky) {
					var sky = new ThreeSky(model.sky);
					scene.add(sky);
				}
				if(model.objects) {
					for(var i=0; i<model.objects.length; i++) {
						var obj = new THREEObject(model.objects[i]);
						if(model.objects[i].id === "myShip") {
							obj.add(camera);
						}
						scene.add(obj);
					}
				}

			});

			return scene;
		}





		function ThreeSky(model) {
			var geometry = new THREE.CubeGeometry(1000000000,1000000000,1000000000);

			var textures = [];
			for(var i=0; i<6; i++) {
				textures.push(
					new THREE.MeshBasicMaterial({
						map: THREE.ImageUtils.loadTexture(model.textures[i]),
						side: THREE.BackSide
					})
				);
			}

			var material = new THREE.MeshFaceMaterial(textures);

			return new THREE.Mesh(geometry,material);
		}






		var Viewport = React.createClass({
			getDefaultProps: function() {
				var dataConnection = universeDataConnectionFactory.getConnection();
				return {
					model: dataConnection.getViewportConnection('12345').getModel()
				};
			},
			getInitialState: function() {
				this.__initGL();
				return {};
			},
			render: function() {
				return (
					<canvas className="three-dee">
					</canvas>
				);
			},
			componentDidMount: function() {
				this.__startAnim();
			},
			__initGL: function() {
				this.__camera = new ThreeCamera();
				this.__scene = new ThreeScene(this.props.model,this.__camera);
			},
			__startAnim: function() {

				var canvas = this.getDOMNode();

				this.__renderer = new THREE.WebGLRenderer({canvas:canvas, alpha: true});

				var view = this;

				function animate() {

					requestAnimationFrame( animate );
					view.__renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );
					view.__camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
					view.__camera.updateProjectionMatrix();

					view.__renderer.render( view.__scene, view.__camera );

				}

				animate();

			}

		});

		return Viewport;
	}
)