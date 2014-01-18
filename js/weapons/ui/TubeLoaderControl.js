define(
	[
		'react',
		'jsx!../../base/ui/Control'
	],
	function(
		React,
		Control
	) {

		var TubeLoaderControl = React.createClass({
			getInitialState: function() {
				var view = this;
				this.props.ammo.subscribeTo(function(ammo) {
					view.setState({ammo: ammo});
				});
				this.props.tube.subscribeTo(function(tube) {
					view.setState({tube: tube});
				})
				return null;
			},
			render: function() {
				if(this.state && this.state.tube && this.state.ammo) {
					return (
						<Control className="tube-loader-control">			
							<select name="ammo-select" value={this.state.tube.currentAmmo || "none"} onChange={this.changeAmmo}>
								<option value="none">none</option>
								{this.state.ammo.mapToArray(function(name,value) {
									if(!value) {
										return;
									} else {
										return <option value={name}>{name}</option>;
									}
								})}
							</select>
							<label>
								<input type="checkbox" checked={this.state.tube.keepLoaded} onChange={this.toggleKeepLoaded} />
								keep loaded
							</label>
							<button type="button" disabled={this.state.tube.keepLoaded}>
								load
							</button>
							<button type="button" disabled={this.state.tube.currentAmmo == null} onClick={this.unload}>
								unload
							</button>
						</Control>
					);
				} else {
					return <div>...loading...</div>;
				}
			},
			toggleKeepLoaded: function() {
				this.state.tube.keepLoaded = !this.state.tube.keepLoaded;
				this.state.tube.setUpdated();
			},
			unload: function() {
				this.state.tube.keepLoaded = false;
				this.state.tube.currentAmmo = null;
				this.state.tube.setUpdated();
			},
			changeAmmo: function(event) {
				this.state.tube.currentAmmo = event.target.value;
				this.state.tube.setUpdated();
			}
		});

		return TubeLoaderControl;

	}
);