define(
	[
		'react',
		'THREE'
	],
	function(
		React,
		THREE
	) {


		var planetRadius = 6371000;
		var moonRadius = 1700000;
		var moonDistance = 38500000;

		var ThreeDPlanetDemo = React.createClass({
			getDefaultProps: function() {
				this.__initGL();
				return {};
			},
			getInitialState: function() {
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

				this.__camera = new THREE.PerspectiveCamera( 75, 1, 1, 10000000000 );
				this.__camera.position.y = -1000;
				this.__camera.rotation.x = Math.PI/2;
				this.__camera.rotation.z = -Math.PI/2;

				if(!window.camera) window.camera = this.__camera;

				this.__ship = new THREE.Mesh( 
					new THREE.CubeGeometry(500,500,500),
					new THREE.MeshBasicMaterial( { color: 0x990000, wireframe: true } )
				);
				this.__ship.add(this.__camera);

				this.__planet = new THREE.Mesh( 
					new THREE.SphereGeometry(planetRadius,80,60,0,Math.PI * 2,0,Math.PI),
					new THREE.MeshBasicMaterial( { color: 0x009900, wireframe: true } )
				);

				this.__moon = new THREE.Mesh( 
					new THREE.SphereGeometry(moonRadius,80,60,0,Math.PI * 2,0,Math.PI),
					new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } )
				);
				this.__moon.position.x = moonDistance;
				this.__moon.position.y = 0;
				this.__moon.position.z = 0;

				this.__scene = new THREE.Scene();
				this.__scene.add( this.__planet );
				this.__scene.add( this.__ship );
				this.__scene.add( this.__moon );

			},
			__startAnim: function() {

				var canvas = this.getDOMNode();

				this.__renderer = new THREE.WebGLRenderer({canvas:canvas, alpha: true});

				var view = this;

				var rads = 0;
				var speed = .005;
				var distance = planetRadius + 100000;

				function animate() {

					requestAnimationFrame( animate );

					view.__renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );
					view.__camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
					view.__camera.updateProjectionMatrix();

					rads += speed;

					view.__ship.position.x = view.__planet.position.x + distance * Math.cos(rads);
					view.__ship.position.y = view.__planet.position.y + distance * Math.sin(rads);
					view.__ship.position.z = view.__planet.position.z;
					view.__ship.rotation.x = 0;
					view.__ship.rotation.y = 0;
					view.__ship.rotation.z = rads;

					view.__renderer.render( view.__scene, view.__camera );

				}

				animate();

			}

		});

		return ThreeDPlanetDemo;
	}
)