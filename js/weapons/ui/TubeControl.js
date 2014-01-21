define(
	[
		'react',
		'jsx!../../base/ui/Control',
		'jsx!./TubeLoaderControl'
	],
	function(
		React,
		Control,
		TubeLoaderControl
	) {

		var TubeControl = React.createClass({
			getDefaultProps: function() {
				var view = this;
				this.props.tube.subscribeTo(function(tube) {
					view.forceUpdate();
				});
				return {};
			},
			render: function() {
				return (
					<Control className="tube-control">
						<span className="tube-name">
							{this.props.tube.display}
						</span>
						<span className="loaded-weapon">
							{
								this.props.tube.currentAmmo ?
								this.props.tube.currentAmmo :
								"None"
							}
						</span>
						<span className ="loaded-percent">
							{Math.round(this.props.tube.loadedPercent * 100)}
						</span>
						<TubeLoaderControl tube={this.props.tube} ship={this.props.ship} user={this.props.user}></TubeLoaderControl>
					</Control>
				);
			}
		});

		return TubeControl;

	}
);