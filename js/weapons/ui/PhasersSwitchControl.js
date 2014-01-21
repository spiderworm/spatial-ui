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

		var PhasersSwitchControl = React.createClass({
			getDefaultProps: function() {
				var phasers = this.props.ship.weapons.phasers;
				var view = this;
				var handler = phasers.subscribeTo(function(phasers) {
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
				return <Control className="phasers-switch-control">Phasers: <button type="button" onClick={this.toggle}>{this.props.phasers.enabled ? "on" : "off"}</button></Control>;
			},
			toggle: function() {
				if(this.props.phasers.enabled) {
					this.props.dataConnection.disablePhasers();
				} else {
					this.props.dataConnection.enablePhasers();
				}
			}
		});

		return PhasersSwitchControl;

	}
);