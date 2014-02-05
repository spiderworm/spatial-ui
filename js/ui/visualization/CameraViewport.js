define(
	[
		'react',
		'THREE',
		'./Scene3D',
		'./Camera3D'
	],
	function(
		React,
		THREE,
		Scene3D,
		Camera3D
	) {












		var Viewport = React.createClass({
			getDefaultProps: function() {
				return {
					model: this.props.definition
				};
			},
			getInitialState: function() {
				this.__initGL();
				return {};
			},
			render: function() {
				return <canvas className="three-dee"></canvas>;
			},
			componentDidMount: function() {
				this.__startAnim();
			},
			__initGL: function() {
				this.__camera = new Camera3D();
				this.__scene = new Scene3D(this.props.model,this.__camera);
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