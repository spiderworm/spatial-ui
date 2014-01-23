define(
	[
		'react',
		'jsx!../../base/ui/Control',
		'jsx!./TubeLoaderControl',
		'../../ship/data/tube/connectionFactory'
	],
	function(
		React,
		Control,
		TubeLoaderControl,
		tubeDataConnectionFactory
	) {

		var TubeControl = React.createClass({
			getDefaultProps: function() {
				var view = this;
				this.props.tube.subscribeTo(function(tube) {
					view.forceUpdate();
				});
				var dataConnection = tubeDataConnectionFactory.getConnection(
					this.props.user,
					this.props.tube
				);
				return {
					dataConnection: dataConnection
				};
			},
			render: function() {
				return (
					<Control className="tube-control">
						<span className="tube-name">
							{this.props.tube.display}
						</span>
						<span className="loaded-weapon">
							{
								this.props.tube.currentAmmo ?
								this.props.tube.currentAmmo :
								"None"
							}
						</span>
						<span className ="loaded-percent">
							{Math.round(this.props.tube.loadedPercent * 100)}
						</span>
						<label>
							<input type="checkbox" checked={this.props.tube.autoFire} onChange={this.toggleAutoFire} />
							auto fire
						</label>
						<button type="button" disabled={!this.props.tube.currentAmmo || this.props.tube.loadedPercent < 1} onClick={this.fire}>
							Fire
						</button>
						<TubeLoaderControl tube={this.props.tube} ship={this.props.ship} user={this.props.user}></TubeLoaderControl>
					</Control>
				);
			},
			toggleAutoFire: function() {
				this.props.dataConnection.setAutoFire(
					!this.props.tube.autoFire
				);
			},
			fire: function() {
				this.props.dataConnection.fire();
			}
		});

		return TubeControl;

	}
);