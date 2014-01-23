define(
	[
		'react',
		'jsx!../../base/ui/Control',
		'../../ship/data/tube/connectionFactory'
	],
	function(
		React,
		Control,
		tubeDataConnectionFactory
	) {


		var TubeLoaderControl = React.createClass({
			getDefaultProps: function() {
				var view = this;
				this.props.ship.weapons.ammo.subscribeTo(function(ammo) {
					view.forceUpdate();
				});
				this.props.tube.subscribeTo(function(tube) {
					view.forceUpdate();
				});
				return {
					user: null,
					ammo: this.props.ship.weapons.ammo,
					tubeDataConnection: tubeDataConnectionFactory.getConnection(
						this.props.user,
						this.props.tube
					)
				};
			},
			getInitialState: function() {
				return {
					targetAmmo: this.props.tube.targetAmmo
				};
			},
			render: function() {
				return (
					<Control className="tube-loader-control">			
						<select name="ammo-select" value={this.state.targetAmmo || "none"} onChange={this.changeAmmo}>
							<option value="none">none</option>
							{this.props.ammo.mapToArray(function(name,value) {
								if(!value) {
									return;
								} else {
									return <option value={name}>{name}</option>;
								}
							})}
						</select>
						<label>
							<input type="checkbox" checked={this.props.tube.keepLoaded} onChange={this.toggleKeepLoaded} />
							keep loaded
						</label>
						<button type="button" disabled={this.props.tube.keepLoaded || !this.state.targetAmmo} onClick={this.load}>
							load
						</button>
						<button type="button" disabled={this.props.tube.currentAmmo == null} onClick={this.unload}>
							unload
						</button>
					</Control>
				);
			},
			toggleKeepLoaded: function() {
				this.props.tubeDataConnection.setKeepLoaded(
					!this.props.tube.keepLoaded
				);
				if(this.props.tube.keepLoaded) {
					this.load();
				}
			},
			load: function() {
				this.props.tubeDataConnection.load(this.state.targetAmmo);
			},
			unload: function() {
				this.props.tubeDataConnection.unload();
			},
			changeAmmo: function(event) {
				var ammo = null;
				if(event.target.value !== "none") {
					ammo = event.target.value;
				}
				this.state.targetAmmo = ammo;
				this.setState({targetAmmo:ammo});
				if(this.props.tube.keepLoaded) {
					this.load();
				}
			}
		});

		return TubeLoaderControl;

	}
);