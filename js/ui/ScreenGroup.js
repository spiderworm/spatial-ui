define(
	[
		'react',
		'jsx!./Screen',
		'./util/reactKeyGenerator'
	],
	function(
		React,
		Screen,
		reactKeyGenerator
	) {

		var ScrenGroup = React.createClass({
			mixins: [reactKeyGenerator.mixin],
			getDefaultProps: function() {
				var view = this;

				window.addEventListener('hashchange',function(e) {
					view.__focusOnScreenByID(document.location.hash.match(/^#(.*)$/)[1]);
				});

				this.props.definition.subscribeTo(function(screens) {
					view.__showAScreen();
				});

				return {};
			},
			getInitialState: function() {
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

				var appUI = this;

				return (
					<div className="screen-group">
						<ol className="screens-nav" role="menu">
							{this.props.definition.map(function(screen) {
								var a = <a href={"#" + screen.id} onClick={function() { appUI.__focusOnScreen(screen); return false; }}>{screen.label}</a>;
								if(screen === activeScreen) {
									return <li key={appUI.getKey([screen])} role="menuitem" className="active">{a}</li>;
								} else {
									return <li key={appUI.getKey([screen])} role="menuitem">{a}</li>;
								}
							})}
						</ol>
						<div className="screens">
							{this.props.definition.map(function(screen) {
								return (
									<Screen key={appUI.getKey([screen])} definition={screen} appModel={appModel} hidden={screen!==activeScreen}></Screen>
								);
							})}
						</div>
					</div>
				);
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
				for(var i=0; i<this.props.definition.length; i++) {
					if(this.props.definition[i].id === id) {
						return this.props.definition[i];
					}
				}
				return null;
			},
			__showAScreen: function() {
				if(
					this.props.definition[0] &&
					(
						(this.state.activeScreen && this.props.definition.indexOf(this.state.activeScreen === -1)) ||
						!this.state.activeScreen
					)
				) {
					this.setState({
						activeScreen: this.props.definition[0]
					});
				}
			}
		});

		return ScrenGroup;

	}
);