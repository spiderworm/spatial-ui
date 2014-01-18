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
			getInitialState: function() {
				var view = this;
				this.props.tube.subscribeTo(function(tube) {
					view.setState(tube);
				});
				return null;
			},
			render: function() {
				if(this.state) {
					return (
						<Control className="tube">
							<span className="tube-name">
								{this.state.display}
							</span>
							<span className="loaded-weapon">
								{
									this.state.loaded ?
									this.state.loaded.display :
									"None"
								}
							</span>
							<TubeLoaderControl tube={this.props.tube} ammo={this.props.ammo}></TubeLoaderControl>
						</Control>
					);
				} else {
					return <div>... getting tube info ...</div>;
				}
			}
		});

		return TubeControl;

	}
);