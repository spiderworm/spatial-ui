define(
	[
		'react',
		'jsx!./Panel',
		'./util/reactKeyGenerator'
	],
	function(
		React,
		Panel,
		keyGenerator
	) {

		var PanelGroup = React.createClass({

			mixins: [keyGenerator.mixin],

			getInitialState: function() {

				var screen = this;

				var layoutCheckingInterval = setInterval(function() {
					screen.__checkLayout();
				},1000);

				return {
					gridMode: false,
					layoutCheckingInterval: layoutCheckingInterval
				};
			},

			render: function() {
				var appModel = this.props.appModel;
				var gridMode = this.state.gridMode;

				var view = this;

				return (
					<div
						className="panel-group"
						data-layout={gridMode ? "grid" : "default"}
					>
						{this.props.definition.map(
							function(panel) {
								return (
									<Panel
										key={view.getKey([panel])}
										appModel={appModel}
										definition={panel}
										gridMode={gridMode}
									></Panel>
								);
							}
						)}
					</div>
				);

			},

			componentWillUnmount: function() {
				clearInterval(this.state.layoutCheckingInterval);
			},

			__checkLayout: function() {
				var node = this.getDOMNode();
				var gridMode = false;
				if(node.offsetWidth > 400) {
					gridMode = true;
				}
				if(this.state.gridMode !== gridMode) {
					this.setState({
						gridMode: gridMode
					});
				}
			}

		});

		return PanelGroup;

	}
);