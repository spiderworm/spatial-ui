define(
	[
		'react',
		'jsx!../../base/ui/Control'
	],
	function(
		React,
		Control
	) {

		var TorpedoStockControl = React.createClass({
			getInitialState: function() {
				var view = this;
				this.props.ship.weapons.ammo.subscribeTo("torpedos",function(torpedos) {
					view.setState({torpedos: torpedos});
				});
				return {torpedos: 0};
			},
			render: function() {
				return <Control className="torpedos-control">Torpedos: {this.state.torpedos}</Control>;
			}
		});

		return TorpedoStockControl;

	}
);