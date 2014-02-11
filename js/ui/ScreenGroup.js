define(
	[
		'react',
		'jsx!./Screen',
		'jsx!./Piece'
	],
	function(
		React,
		Screen,
		Piece
	) {

		var ScreenGroup = React.createClass({
			mixins: [Piece.mixin],
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
							{this._mapSubPieces(
								this.props.definition,
								function(definition,id) {

									if(definition.type === "screen") {
										return (
											<li
												key={id}
												role="menuitem"
												className={
													definition === activeScreen ?
													"active" :
													"inactive"
												}
											>
												<a
													href={"#" + id}
												>
													{definition.label}
												</a>
											</li>
										);

									}

								}
							)}
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
							{this._getSubPieceNodes(
								this.props.definition,
								this.props.appModel,
								{
									activeScreen: activeScreen,
									editable: editMode
								}
							)}
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
				var screen = this.props.definition[id];
				if(screen && screen.type === "screen") {
					return screen;
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
					type: 'screen',
					label: 'new',
					index: 0,
					panels: {}
				};
				var id = this.__getUniqueScreenID();
				newScreen.index = this.__getLargestIndex()+1;
				this.props.definition.$add(id,newScreen);
				document.location.hash = id;
			},
			__getUniqueScreenID: function() {
				var id = 0;
				while(this.__getScreenByID(id)) {
					id++;
				}
				return id;
			},
			__showScreenFromHash: function() {
				this.__focusOnScreenByID(
					document.location.hash.match(/^#(.*)$/)[1]
				);
			},
			__getLargestIndex: function() {
				var highest = 0;
				this._mapSubPieces(this.props.definition,function(definition,id) {
					if(definition && definition.index > highest) {
						highest = definition.index;
					}
				});
				return highest;
			}
		});

		return ScreenGroup;

	}
);