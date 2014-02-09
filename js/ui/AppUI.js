define(
	[
		'react',
		'jsx!./ScreenGroup',
		'jsx!./PanelGroup'
	],
	function(
		React,
		ScreenGroup,
		PanelGroup
	) {

		var AppUI = React.createClass({
			getDefaultProps: function() {
				var view = this;

console.info(this.props.definition);

				this.props.definition.subscribeTo(function() {
					view.forceUpdate();
				});

				return {};
			},
			render: function() {
				var dom = (
					<main className="spatial-master">
						{
							this.props.definition.screens ?
							<ScreenGroup
								definition={this.props.definition.screens}
								appModel={this.props.appModel}
							></ScreenGroup> :
							null
						}
						{
							this.props.definition.panels ?
							<PanelGroup
								definition={this.props.definition.panels}
								appModel={this.props.appModel}
							></PanelGroup> :
							null
						}
					</main>
				);
				return dom;
			}
		});

		return AppUI;

	}
);