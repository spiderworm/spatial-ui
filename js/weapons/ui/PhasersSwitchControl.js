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

		var PhasersSwitchControl = React.createClass({
			getInitialState: function() {
				var view = this;
				this.model = this.props.ship.weapons.phasers;
				this.model.subscribeTo(function(model) {
					view.setState(model);
				});
				return new PhasersModel();
			},
			render: function() {
				return <Control className="phasers-switch-control">Phasers: <button type="button" onClick={this.test}>{this.state.enabled ? "on" : "off"}</button></Control>;
			},
			test: function() {
				this.model.enabled = !this.model.enabled;
				this.model.setUpdated();
			}
		});

		return PhasersSwitchControl;

	}
);