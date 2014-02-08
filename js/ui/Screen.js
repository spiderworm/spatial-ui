define(
	[
		'react',
		'jsx!./PanelGroup',
		'jsx!./visualization/CameraViewport',
		'jsx!./visualization/Loader'
	],
	function(
		React,
		PanelGroup,
		CameraViewport,
		VisualizationLoader
	) {

		var Screen = React.createClass({
			getDefaultProps: function() {
				return {};
			},
			render: function() {
				var appModel = this.props.appModel;
				return (
					<article 
						className={
							"screen" +
							(this.props.hidden ? " hidden" : "")
						}
					>
						<h1>
							<a name={this.props.definition.id}>{this.props.definition.label}</a>
						</h1>
						<PanelGroup definition={this.props.definition.panels} appModel={appModel}></PanelGroup>
						{
							this.props.definition.visualizations && this.props.definition.visualizations[0] ?
							<VisualizationLoader
								definition={this.props.definition.visualizations[0]}
							></VisualizationLoader> :
							null
						}
						{this.props.children}
					</article>
				);
			}
		});



		Screen.getUniqueID = function() {
			Screen.getUniqueID.__last++;
			return Screen.getUniqueID.__last;
		}
		Screen.getUniqueID.__last = 0;



		return Screen;

	}
);