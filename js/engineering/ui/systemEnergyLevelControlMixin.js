define(
	[
		'react',
		'../data/connectionFactory',
		'../../base/ui/Control'
	],
	function(
		React,
		engineeringDataConnectionFactory,
		Control
	) {

		var systemEnergyLevelControlMixin = {
			getDefaultProps: function() {
				var view = this;
				var dataConnection = engineeringDataConnectionFactory.getConnection(
					this.props.user,
					this.props.ship
				);
				var model = dataConnection.getModel().energy.levels;
				model.subscribeTo(
					this.systemDataName,
					function(energy) {
						view.setState({energy: energy});
					}
				);
				return {
					dataConnection: dataConnection
				};
			},
			getInitialState: function() {
				return {energy: 0};
			},
			getNode: function(label,className) {
				return (
					<Control className={className}>
						{label}:
						{this.state.energy}
						<input
							type="range"
							name="tubes-energy-level"
							value={this.state.energy}
							min="0"
							max="100"
							onChange={this.handleInputChange} />
					</Control>
				);
			},
			handleInputChange: function(event) {
				this.setLevel(event.target.value);
			},
			setLevel: function(level) {
				this.props.dataConnection.setSystemEnergyLevel(
					this.systemDataName,
					level
				);
			}
		};

		return systemEnergyLevelControlMixin;

	}
);
