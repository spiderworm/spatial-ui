define(
	[
		'react',
		'THREE',
		'../../universe/data/connectionFactory'
	],
	function(
		React,
		THREE,
		universeDataConnectionFactory
	) {




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



		function ThreeObject(model) {

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

			var geometry = threeLoader.parse(model.geometry).geometry;

			var mesh = new THREE.Mesh(geometry,material);

			model.position.subscribeTo(function(position) {
				mesh.position.x = position.x;
				mesh.position.y = position.y;
				mesh.position.z = position.z;
			});

			model.rotation.subscribeTo(function(rotation) {
				mesh.rotation.x = rotation.x;
				mesh.rotation.y = rotation.y;
				mesh.rotation.z = rotation.z;
			});

			return mesh;
		}





		var Viewport = React.createClass({
			getDefaultProps: function() {
				var dataConnection = universeDataConnectionFactory.getConnection();
				return {
					model: dataConnection.getModel()
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

				this.__scene = new THREE.Scene();

				this.__sky = new ThreeSky(this.props.model.sky);
				this.__scene.add(this.__sky);

				this.__camera = new THREE.PerspectiveCamera( 75, 1, 1, 10000000000 );
				this.__camera.position.y = -1000;
				this.__camera.rotation.x = Math.PI/2;
				this.__camera.rotation.z = -Math.PI/2;

				for(var i=0; i<this.props.model.objects.length; i++) {
					var obj = new ThreeObject(this.props.model.objects[i]);
					if(this.props.model.objects[i].id === "myShip") {
						obj.add(this.__camera);
					}
					this.__scene.add(obj);
				}



/*
				this.__ship = new THREE.Mesh( 
					new THREE.CubeGeometry(500,500,500),
					new THREE.MeshBasicMaterial( { color: 0x990000, wireframe: true } )
				);
				this.__ship.add(this.__camera);

				this.__planet = new THREE.Mesh( 
					new THREE.SphereGeometry(planetRadius,80,60,0,Math.PI * 2,0,Math.PI),
					new THREE.MeshBasicMaterial({
						map: THREE.ImageUtils.loadTexture(
							'http://ubuntu.local/spatial-ui/demo-resources/planet-maps/Teaatis/Colormap.png'
						)
					})
				);

				this.__moon = new THREE.Mesh( 
					new THREE.SphereGeometry(moonRadius,80,60,0,Math.PI * 2,0,Math.PI),
					new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } )
				);
				this.__moon.position.x = moonDistance;
				this.__moon.position.y = 0;
				this.__moon.position.z = 0;

				var materials = [
					new THREE.MeshBasicMaterial({
						map: THREE.ImageUtils.loadTexture(
							'js/base/ui/space1_right1.jpg'
						),
						side: THREE.BackSide
					}),
					new THREE.MeshBasicMaterial({
						map: THREE.ImageUtils.loadTexture(
							'js/base/ui/space1_left2.jpg'
						),
						side: THREE.BackSide
					}),
					new THREE.MeshBasicMaterial({
						map: THREE.ImageUtils.loadTexture(
							'js/base/ui/space1_top3.jpg'
						),
						side: THREE.BackSide
					}),
					new THREE.MeshBasicMaterial({
						map: THREE.ImageUtils.loadTexture(
							'js/base/ui/space1_bottom4.jpg'
						),
						side: THREE.BackSide
					}),
					new THREE.MeshBasicMaterial({
						map: THREE.ImageUtils.loadTexture(
							'js/base/ui/space1_front5.jpg'
						),
						side: THREE.BackSide
					}),
					new THREE.MeshBasicMaterial({
						map: THREE.ImageUtils.loadTexture(
							'js/base/ui/space1_back6.jpg'
						),
						side: THREE.BackSide
					})
				];

				this.__skybox = new THREE.Mesh(
					new THREE.CubeGeometry(1000000000,1000000000,1000000000),
					new THREE.MeshFaceMaterial(materials)
				);

				this.__scene = new THREE.Scene();
				this.__scene.add(this.__planet);
				this.__scene.add(this.__ship);
				this.__scene.add(this.__moon);
				this.__scene.add(this.__skybox);

*/

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