define(
	[
		'react',
		'../modelBinder',
		'jsx!../base/ui/Screen'
	],
	function(
		React,
		modelBinder,
		Screen
	) {

		var Master = React.createClass({
			getInitialState: function() {
				var view = this;

				this.props.app.model.view.screens.subscribeTo(function(screens) {
					view.setState({screens: screens});
				});

				var state = {screens: []};
				return state;
			},
			render: function() {
				var ship = this.props.ship;

				var masterUI = this;
				var dom = (
					<main>
						<ol>
							{this.state.screens.map(function(screen) {
								return <li><a href={"#" + screen.id}>{screen.display}</a></li>;
							})}
						</ol>
						<div>
							{this.state.screens.map(function(screen) {
								return (
									<Screen ship={ship} id={screen.id} display={screen.display} panels={screen.panels}></Screen>
								);
							})}
						</div>
					</main>
				);
				return dom;
			}
		});

		return Master;

	}
);