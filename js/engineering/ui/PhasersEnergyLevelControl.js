define(
	[
		'react',
		'jsx!../../base/ui/Control',
		'../data/connectionFactory'
	],
	function(
		React,
		Control,
		engineeringDataConnectionFactory
	) {

		var PhasersEnergyLevelControl = React.createClass({
			getDefaultProps: function() {
				var view = this;
				this.props.ship.engineering.energy.levels.subscribeTo(
					'phasers',
					function(phasersEnergy) {
						view.setState({energy: phasersEnergy});
					}
				);
				return {
					ship: null,
					user: null,
					dataConnection: engineeringDataConnectionFactory.getConnection(
						this.props.user,
						this.props.ship
					)
				};
			},
			getInitialState: function() {
				return {energy: 0};
			},
			render: function() {
				return (
					<Control className="phasers-energy-level-control">
						Phasers Energy:
						{this.state.energy}
						<input
							type="range"
							name="phasers-energy-level"
							value={this.state.energy}
							min="0" 
							max="100" 
							onChange={this.handleChange} />
					</Control>
				);
			},
			handleChange: function(event) {
				this.props.dataConnection.setPhasersEnergyLevel(event.target.value);
			}
		});

		return PhasersEnergyLevelControl;

	}
);