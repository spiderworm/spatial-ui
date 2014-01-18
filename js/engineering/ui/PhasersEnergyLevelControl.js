define(
	[
		'react',
		'jsx!../../base/ui/Control'
	],
	function(
		React,
		Control
	) {

		var PhasersEnergyLevelControl = React.createClass({
			getInitialState: function() {
				var view = this;
				this.model = this.props.ship.engineering.energy.levels;
				this.model.subscribeTo('phasers',function(phasersEnergy) {
					view.setState({energy: phasersEnergy});
				});
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
				this.model.phasers = event.target.value;
				this.model.setUpdated();
			}
		});

		return PhasersEnergyLevelControl;

	}
);