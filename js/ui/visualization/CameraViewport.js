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
			getInitialState: function() {
				this.__scene = new Scene3D(this.props.definition,new Camera3D());
				return {};
			},
			render: function() {
				return <canvas className="three-dee"></canvas>;
			},
			componentDidMount: function() {
				this.__scene.start(this.getDOMNode());
			}
		});

		return Viewport;
	}
)