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
			getInitialState: function() {
				var view = this;
				this.model = this.props.ship.systems.weapons.tubes;
				this.model.subscribeTo(function(tubes) {
					view.setState({tubes: tubes});
				});
				return null;
			},
			render: function() {
				var ammo = this.props.ship.weapons.ammo;
				if(this.state) {
					return (
						<Control className="tubesControl">
							{this.state.tubes.map(function(tube) {
								return (
									<TubeControl tube={tube} ammo={ammo}></TubeControl>
								);
							})}
						</Control>
					);
				} else {
					return <div>No tubes found</div>;
				}
			}
		});

		return TubesControl;

	}
);