define(
	[
		'react',
		'jsx!../../base/ui/Control',
		'jsx!./TubeControl'
	],
	function(
		React,
		Control,
		TubeControl
	) {

		var TubesControl = React.createClass({
			getDefaultProps: function() {
				var view = this;
				var props = {
					tubes: this.props.ship.systems.weapons.tubes
				};
				props.tubes.subscribeTo(function(tubes) {
					view.forceUpdate();
				});
				return props;
			},
			render: function() {
				var ship = this.props.ship;
				var user = this.props.user;
				return (
					<Control className="tubes-control">
						{this.props.tubes.map(function(tube) {
							return (
								<TubeControl tube={tube} ship={ship} user={user}></TubeControl>
							);
						})}
					</Control>
				);
			}
		});

		return TubesControl;

	}
);