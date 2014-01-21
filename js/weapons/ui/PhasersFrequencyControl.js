define(
	[
		'react',
		'../PhasersModel',
		'jsx!../../base/ui/Control',
		'../data/connectionFactory'
	],
	function(
		React,
		PhasersModel,
		Control,
		weaponsDataConnectionFactory
	) {

		var PhasersFrequencyControl = React.createClass({
			getDefaultProps: function() {
				var view = this;
				var phasers = this.props.ship.weapons.phasers;
				phasers.subscribeTo(function(phasers) {
					view.forceUpdate();
				});
				return {
					phasers: phasers,
					dataConnection: weaponsDataConnectionFactory.getConnection(
						this.props.user,
						this.props.ship
					)
				};
			},
			render: function() {
				var frequency = this.props.phasers.frequency;
				return (
					<Control className="phasers-frequency-control">
						Phasers Frequency:
						<select name="phasers-frequency" value={frequency} onChange={this.handleChange}>
							{this.props.phasers.availableFrequencies.map(function(frequencyOption) {
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
				this.props.dataConnection.setPhaserFrequency(event.target.value);
			}
		});

		return PhasersFrequencyControl;

	}
);