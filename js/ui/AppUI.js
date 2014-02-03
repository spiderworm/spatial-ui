define(
	[
		'react',
		'jsx!./Screen'
	],
	function(
		React,
		Screen
	) {

		var AppUI = React.createClass({
			getInitialState: function() {
				var view = this;

				window.addEventListener('hashchange',function(e) {
					view.__focusOnScreenByID(document.location.hash.match(/^#(.*)$/)[1]);
				});

				this.props.appModel.subscribeTo(function() {
					view.forceUpdate();
				});

				this.props.appModel.view.screens.subscribeTo(function(screens) {
					view.__showAScreen();
				});

				var state = {
					activeScreen: null,
					hidingScreen: null
				};
				return state;
			},
			render: function() {
				var appModel = this.props.appModel;

				var activeScreen = this.state.activeScreen;
				var hidingScreen = this.state.hidingScreen;

				var masterUI = this;
				var dom = (
					<main className="spatial-master">
						<ol className="screens-nav" role="menu">
							{appModel.view.screens.map(function(screen) {
								var a = <a href={"#" + screen.id} onClick={function() { masterUI.__focusOnScreen(screen); return false; }}>{screen.display}</a>;
								if(screen === activeScreen) {
									return <li role="menuitem" className="active">{a}</li>;
								} else {
									return <li role="menuitem">{a}</li>;
								}
							})}
						</ol>
						<div className="screens">
							{appModel.view.screens.map(function(screen) {
								return (
									<Screen definition={screen} appModel={appModel} hidden={screen!==activeScreen}></Screen>
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
				for(var i=0; i<this.props.appModel.view.screens.length; i++) {
					if(this.props.appModel.view.screens[i].id === id) {
						return this.props.appModel.view.screens[i];
					}
				}
				return null;
			},
			__showAScreen: function() {
				if(
					this.props.appModel.view.screens[0] &&
					(
						(this.state.activeScreen && this.props.appModel.view.screens.indexOf(this.state.activeScreen === -1)) ||
						!this.state.activeScreen
					)
				) {
					this.setState({
						activeScreen: this.props.appModel.view.screens[0]
					});
				}
			}
		});

		return AppUI;

	}
);