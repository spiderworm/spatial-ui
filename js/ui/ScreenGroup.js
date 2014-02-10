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

		var ScreenGroup = React.createClass({
			mixins: [reactKeyGenerator.mixin],
			getDefaultProps: function() {
				var view = this;

				window.addEventListener('hashchange',function(e) {
					view.__showScreenFromHash();
				});

				this.props.definition.$subscribeTo(function(screens) {
					view.__showAScreen();
				});

				return {};
			},
			getInitialState: function() {
				var state = {
					activeScreen: null,
					hidingScreen: null,
					editMode: false
				};
				return state;
			},
			render: function() {
				var appModel = this.props.appModel;

				var activeScreen = this.state.activeScreen;
				var hidingScreen = this.state.hidingScreen;
				var editMode = this.state.editMode;

				var appUI = this;

				return (
					<div className={
						"screen-group" + (
							editMode ?
							" edit-mode" :
							""
						)
					}>
						<ol className="screens-nav" role="menu">
							{this.props.definition.$map(function(screen) {

								return (
									<li
										key={appUI.getKey([screen])}
										role="menuitem"
										className={
											screen === activeScreen ?
											"active" :
											"inactive"
										}
									>
										<a
											href={"#" + screen.id}
											onClick={
												function() {
													/*
													appUI.__focusOnScreen(screen);
													return false;
													*/	
												}
											}
										>
											{screen.label}
										</a>
									</li>
								);

							})}
							{
								editMode ?
								<li key="the-new-screen-one">
									<a
										class="add-screen-button" 
										href="#add-new"
										onClick={this.__handleNewScreenClick}
									>+ add</a>
								</li> :
								""
							}
						</ol>
						<button
							className="toggle-edit-button"
							type="button"
							onClick={this.__toggleEditMode}
						>
							{editMode ? "done" : "edit"}
						</button>
						<div className="screens">
							{this.props.definition.$map(function(screen) {
								return (
									<Screen
										key={appUI.getKey([screen])}
										definition={screen}
										appModel={appModel}
										hidden={screen!==activeScreen}
										editable={editMode}
									></Screen>
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
				var keys = this.props.definition.$getKeys();
				for(var i in keys) {
					if(this.props.definition[keys[i]].id === id) {
						return this.props.definition[keys[i]];
					}
				}
				return null;
			},
			__showAScreen: function() {
				var currentScreen = this.state.activeScreen;
				if(
					currentScreen &&
					this.props.definition.$hasValue(currentScreen)
				) {
					return;
				}
				if(document.location.hash !== "") {
					this.__showScreenFromHash();
					if(this.state.activeScreen !== currentScreen) {
						return;
					}
				}

				var keys = this.props.definition.$getKeys();
				this.setState({
					activeScreen: this.props.definition[keys[0]]
				});
			},
			__toggleEditMode: function() {
				this.setState({
					editMode: !this.state.editMode
				});
			},
			__handleNewScreenClick: function() {
				this.__addNewScreen();
				return false;
			},
			__addNewScreen: function() {
				var newScreen = {
					label: 'new',
					id: '',
					panels: []
				};
				newScreen.id = this.__getUniqueScreenID(newScreen.label);
				this.props.definition.$add(newScreen);
				this.props.definition.$setUpdated();
				document.location.hash = newScreen.id;
			},
			__getUniqueScreenID: function(label) {
				var id = label;
				while(this.__getScreenByID(id)) {
					id += "" + Math.floor(10*Math.random());
				}
				return id;
			},
			__showScreenFromHash: function() {
				this.__focusOnScreenByID(
					document.location.hash.match(/^#(.*)$/)[1]
				);
			}
		});

		return ScreenGroup;

	}
);