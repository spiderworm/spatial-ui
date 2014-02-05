define(
	[
		'react',
		'./CameraViewport',
		'../../data/visualization/connectionFactory'
	],
	function(
		React,
		CameraViewport,
		sceneDataConnectionFactory
	) {

		var VisualizationLoader = React.createClass({
			getInitialState: function() {
				var definition;
				if(typeof this.props.definition === "object") {
					definition = this.props.definition;
				} else if(typeof this.props.definition === "string") {
					var sceneConnection = sceneDataConnectionFactory.getConnection();
					var url = this.props.definition;
					var view = this;
					sceneConnection.loadModel(
						url,
						function(model) {
							view.setState({
								definition: model
							});
						}
					);
				}

				return {
					definition: definition
				};
			},
			render: function() {
				if(this.state.definition) {
					return (
						<CameraViewport
							definition={this.state.definition}
						></CameraViewport>
					);
				} else {
					return (
						<div>connecting to visualization</div>
					);
				}
			}
		});

		return VisualizationLoader;

	}
);