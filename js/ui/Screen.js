define(
	[
		'react',
		'jsx!./PanelGroup',
		'jsx!./visualization/CameraViewport'
	],
	function(
		React,
		PanelGroup,
		CameraViewport
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
							<a name={this.props.definition.id}>{this.props.definition.display}</a>
						</h1>
						<PanelGroup definition={this.props.definition.panels} appModel={appModel}></PanelGroup>
						<CameraViewport></CameraViewport>
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