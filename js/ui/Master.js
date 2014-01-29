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

				window.addEventListener('hashchange',function(e) {
					view.__focusOnScreenByID(document.location.hash.match(/^#(.*)$/)[1]);
				});

				this.props.app.model.view.screens.subscribeTo(function(screens) {
					view.setState({screens: screens});
					view.__showAScreen();
				});

				var state = {
					screens: [],
					activeScreen: null,
					hidingScreen: null
				};
				return state;
			},
			render: function() {
				var ship = this.props.ship;
				var user = this.props.user;

				var activeScreen = this.state.activeScreen;
				var hidingScreen = this.state.hidingScreen;

				var masterUI = this;
				var dom = (
					<main className="spatial-master">
						<ol className="screens-nav" role="menu">
							{this.state.screens.map(function(screen) {
								var a = <a href={"#" + screen.id} onClick={function() { masterUI.__focusOnScreen(screen); return false; }}>{screen.display}</a>;
								if(screen === activeScreen) {
									return <li role="menuitem" className="active">{a}</li>;
								} else {
									return <li role="menuitem">{a}</li>;
								}
							})}
						</ol>
						<div className="screens">
							{this.state.screens.map(function(screen) {
								return (
									<Screen ship={ship} user={user} id={screen.id} display={screen.display} sections={screen.sections} hidden={screen!==activeScreen}></Screen>
								);
							})}
						</div>
					</main>
				);
				return dom;
			},
			__focusOnScreenByID: function(id) {
				var screen = this.__getScreenByID(id);
				if(screen) {
					this.__focusOnScreen(screen);
				}
			},
			__focusOnScreen: function(screen) {
				if(screen !== this.state.activeScreen) {
					this.setState({
						hidingScreen: this.state.activeScreen,
						activeScreen: screen
					});
				}
			},
			__getScreenByID: function(id) {
				for(var i=0; i<this.state.screens.length; i++) {
					if(this.state.screens[i].id === id) {
						return this.state.screens[i];
					}
				}
				return null;
			},
			__showAScreen: function() {
				if(
					this.state.screens[0] &&
					(
						(this.state.activeScreen && this.state.screens.indexOf(this.state.activeScreen === -1)) ||
						!this.state.activeScreen
					)
				) {
					this.setState({activeScreen:this.state.screens[0]});
				}
			}
		});

		return Master;

	}
);