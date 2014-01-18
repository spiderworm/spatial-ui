define(
	[
		'react',
		'../PhasersModel',
		'jsx!../../base/ui/Control'
	],
	function(
		React,
		PhasersModel,
		Control
	) {

		var PhasersFrequencyControl = React.createClass({
			getInitialState: function() {
				var view = this;
				this.model = this.props.ship.weapons.phasers;
				this.model.subscribeTo(function(phasers) {
					view.setState(phasers);
				});
				return new PhasersModel();
			},
			render: function() {
				var frequency = this.state.frequency;
				return (
					<Control className="phasers-frequency-control">
						Phasers Frequency:
						<select name="phasers-frequency" value={frequency} onChange={this.handleChange}>
							{this.state.availableFrequencies.map(function(frequencyOption) {
								return (
									<option value={frequencyOption}>
										{frequencyOption}
									</option>
								);
							})}
						</select>
					</Control>
				);
			},
			handleChange: function(event) {
				this.model.frequency = event.target.value;
				this.model.setUpdated();
			}
		});

		return PhasersFrequencyControl;

	}
);