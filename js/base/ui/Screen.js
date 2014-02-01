define(
	[
		'react',
		'jsx!./Section',
		'jsx!./Panel',
		'jsx!./CameraViewport'
	],
	function(
		React,
		Section,
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
				var ship = this.props.ship;
				var user = this.props.user;
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
							return (
								<Panel
									key={panel.__panelID}
									ship={ship}
									user={user}
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

		return Screen;

	}
);