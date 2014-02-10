define(
	[
		'react',
		'./CameraViewport',
		'../../data/visualization/connectionFactory'
	],
	function(
		React,
		CameraViewport,
		visualizationConnectionFactory
	) {

		var VisualizationLoader = React.createClass({
			getInitialState: function() {
				var definition;
				if(typeof this.props.definition === "object") {
					definition = this.props.definition;
				} else if(typeof this.props.definition === "string") {
					var visualizationConnection = visualizationConnectionFactory.getConnection();
					var url = this.props.definition;
					var view = this;
					visualizationConnection.loadModel(
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