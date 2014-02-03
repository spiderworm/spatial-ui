define(
	[
		'react',
		'jsx!./Panel',
		'jsx!./visualization/CameraViewport'
	],
	function(
		React,
		Panel,
		CameraViewport
	) {

		var Screen = React.createClass({
			getDefaultProps: function() {
				return {};
			},
			getInitialState: function() {

				var screen = this;

				setInterval(function() {
					screen.__checkLayout();
				},1000);

				return {
					gridMode: false
				};
			},
			render: function() {
				var appModel = this.props.appModel;
				var gridMode = this.state.gridMode;
				return (
					<article 
						className={
							"screen" +
							(this.props.hidden ? " hidden" : "")
						}
						data-layout={gridMode ? "grid" : "default"}
					>
						<h1>
							<a name={this.props.definition.id}>{this.props.definition.display}</a>
						</h1>
						{this.props.definition.panels.map(function(panel) {
							if(!panel.__panelID) {
								panel.__panelID = Panel.getUniqueID();
							}

							return (
								<Panel
									key={panel.__panelID}
									appModel={appModel}
									definition={panel}
									gridMode={gridMode}
								></Panel>
							);
						})}
						<CameraViewport></CameraViewport>
						{this.props.children}
					</article>
				);
			},
			__checkLayout: function() {
				var node = this.getDOMNode();
				var gridMode = false;
				if(node.offsetWidth > 500) {
					gridMode = true;
				}
				if(this.state.gridMode !== gridMode) {
					this.setState({
						gridMode: gridMode
					});
				}
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