define(
	[
		'react',
		'jsx!./CameraViewport',
		'../modelMixin'
	],
	function(
		React,
		CameraViewport,
		modelMixin
	) {

		var VisualizationLoader = React.createClass({
			mixins: [modelMixin],
			getInitialState: function() {
				var loader = this;

				this._deepSubscribeTo(
					this.props.appModel,
					this.props.definition.url,
					function(definition) {
						loader.setState({definition: definition});
					}
				);

				return {
					definition: null
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