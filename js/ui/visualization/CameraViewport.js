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
				return <div className="camera-visualization visualization"><canvas></canvas></div>;
			},
			componentDidMount: function() {
				this.__scene.start(this.getDOMNode().childNodes[0]);
			}
		});

		return Viewport;
	}
)