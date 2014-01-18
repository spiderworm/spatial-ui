define(
	[
		'react'
	],
	function(
		React
	) {

		var ControlLoader = React.createClass({
			getInitialState: function() {
				this.__loadModule();
				return {
					Module: null
				};
			},
			render: function() {
				if(this.state.Module) {
					return (
						this.state.Module({ship: this.props.ship})
					);
				} else {
					return <span>loading</span>;
				};
			},
			__loadModule: function() {
				var loader = this;
				require(
					[this.props.path],
					function(ControlModule) {
						loader.state.Module = ControlModule;
						loader.forceUpdate();
					}
				);
			}
		});

		return ControlLoader;

	}
);