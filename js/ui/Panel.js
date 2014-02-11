define(
	[
		'react',
		'jsx!./Piece',
		'./util/dragTracker',
		'../util/InstanceStore',
		'./util/reactKeyGenerator'
	],
	function(
		React,
		Piece,
		dragTracker,
		InstanceStore,
		keyGenerator
	) {


		var gridTileSizeCM = 1;
		var gridTileSizePX = gridTileSizeCM * 38;

		var Panel = React.createClass({
			mixins: [keyGenerator.mixin],
			getDefaultProps: function() {
				Panel.addInstance(this,[this.props.definition]);
				this.props.definition.x = this.props.definition.x || 0;
				this.props.definition.y = this.props.definition.y || 0;
				this.props.definition.z = this.props.definition.z || 1;

				var view = this;
				this.props.definition.$subscribeTo(function() {
					view.forceUpdate();
				});

				return {};
			},
			getInitialState: function() {
				return {
					dragging: false
				};
			},
			render: function() {
				var appModel = this.props.appModel;

				if(this.props.gridMode) {

					var style = {
						position: 'absolute',
						left: (this.props.definition.x*gridTileSizeCM) + 'cm',
						top: (this.props.definition.y*gridTileSizeCM) + 'cm',
						zIndex: this.props.definition.z
					};

				} else {

					style = {
						position: 'relative'
					};
					
				}

				var view = this;
				return (
					<section
						style={style}
						className={"panel" + (this.state.dragging ? " dragging" : "")} 
						draggable={
							this.props.editable ? "true" : false
						}
						onDragStart={this.__handleDragStarted}
						onDrag={this.__handleDrag}
						onDragEnd={this.__handleDragEnded}
						onMouseDown={this.__handleMouseDown}
					>
						<h1>{this.props.definition.label}</h1>
						{this.props.definition.$map(function(definition) {
							if(typeof(definition) === "object") {
								return <Piece appModel={appModel} definition={definition} />;
							}
						})}
						{this.props.children}
					</section>
				);
			},
			__handleDragStarted: function(event) {
				event.nativeEvent.dataTransfer.setDragImage(
					this.getDOMNode(),
					-99999999999999,
					-99999999999999
				);
				this.setState({dragging:true});
				dragTracker.setDraggedItem(
					{
						type: Panel,
						instance: this,
						startMouseX: event.clientX,
						startMouseY: event.clientY,
						startPanelX: this.props.definition.x,
						startPanelY: this.props.definition.y,
						canMove: false
					}
				);
			},
			__handleDrag: function(event) {
				var item = dragTracker.getDraggedItem();
				if(item.instance === this && event.clientX && event.clientY) {
					var mouseDX = event.clientX - item.startMouseX;
					var mouseDY = event.clientY - item.startMouseY;
					var dx = Math.round(mouseDX/gridTileSizePX);
					var dy = Math.round(mouseDY/gridTileSizePX);
					var newX = item.startPanelX + dx;
					if(newX < 0) newX = 0;
					var newY = item.startPanelY + dy;
					if(newY < 0) newY = 0;
					if(newX !== this.props.definition.x || newY !== this.props.definition.y) {
						this.props.definition.x = newX;
						this.props.definition.y = newY;
						this.props.definition.$setUpdated();
					}
				}
			},
			__handleDragEnded: function() {
				this.setState({dragging:false});
				dragTracker.setDragStopped();
			},
			__handleMouseDown: function() {
				this.props.definition.z = Panel.getHighZ() + 1;
				this.props.definition.$setUpdated();
			}
		});


		var panels = new InstanceStore();

		Panel.addInstance = function(panel,signature) {
			panels.add(panel,signature);
		}


		Panel.getUniqueID = function() {
			Panel.getUniqueID.__last++;
			return Panel.getUniqueID.__last;
		}
		Panel.getUniqueID.__last = 0;


		Panel.getHighZ = function() {
			var z = undefined;
			var instances = panels.getAllInstances();
			for(var i=0; i<instances.length; i++) {
				if(z === undefined || instances[i].props.definition.z > z) {
					z = instances[i].props.definition.z;
				}
			}
			return z;
		}

		Panel.getLowZ = function() {
			var z = undefined;
			var instances = panels.getAllInstances();
			for(var i=0; i<instances.length; i++) {
				if(z === undefined || instances[i].props.definition.z < z) {
					z = instances[i].props.definition.z;
				}
			}
			return z;
		}

		Panel.normalizeAllZ = function() {
			var instances = panels.getAllInstances();
			instances.sort(function(panelA,panelB) {
				if(panelA.props.definition.z<panelB.props.definition.z) {
					return -1;
				}
				if(panelA.props.definition.z>panelB.props.definition.z) {
					return 1;
				}
				return 0;
			});
			for(var i=0; i<instances.length; i++) {
				instances[i].props.definition.z = i+1;
				instances[i].props.definition.$setUpdated();
			}
		}

		setInterval(
			function() {
				Panel.normalizeAllZ();
			},
			60000
		);


		return Panel;

	}
);