define(
	[
		'react',
		'jsx!./Panel',
		'./util/dragTracker'
	],
	function(
		React,
		Panel,
		dragTracker
	) {




		function PositionHelper() {}
		PositionHelper.prototype.getElementCoord = function(element) {
			var result = {
				x:element.offsetLeft,
				y:element.offsetTop
			};
			if(element !== element.ownerDocument.documentElement && element.offsetParent) {
				var parentResult = this.getElementCoord(element.offsetParent);
				result.x += parentResult.x;
				result.y += parentResult.y;
			}
			return result;
		}
		PositionHelper.prototype.globalCoordToLocalCoord = function(globalCoord,element) {
			var elementPos = this.getElementCoord(element);
			return {
				x: globalCoord.x - elementPos.x,
				y: globalCoord.y - elementPos.y
			};
		}
		PositionHelper.prototype.getElementLocalCenter = function(element) {
			return {
				x: element.offsetLeft + (element.offsetWidth/2),
				y: element.offsetTop + (element.offsetHeight/2)
			};
		}

		var positionHelper = new PositionHelper();



		var Section = React.createClass({
			getDefaultProps: function() {
				for(var i=0; i<this.props.panels.length; i++) {
					if(!this.props.panels[i].__panelID) {
						this.props.panels[i].__panelID = Panel.getUniqueID();
					}
				}
				return {};
			},
			render: function() {
				var ship = this.props.ship;
				var user = this.props.user;
				var key = 0;
				return (
					<div
						className={"section " + this.props.id}
						onDragOver={this.__handleDragOver}
					>
						{this.props.panels.map(function(panel) {
							return <Panel
								key={panel.__panelID}
								ship={ship}
								user={user}
								display={panel.display}
								definition={panel}
							></Panel>;
						})}
						{this.props.children}
					</div>
				);
			},
			__handleDragOver: function(event) {
				var draggedItem = dragTracker.getDraggedItem();
				if(draggedItem && draggedItem.type === Panel) {

					if(this.props.panels.indexOf(draggedItem.model) !== -1) {
						draggedItem.parentSection = this;
						draggedItem.parentModel = this.props.panels;
					}

					if(draggedItem.canMove) {

						var mouseLocalCoord = positionHelper.globalCoordToLocalCoord(
							{
								x: event.clientX,
								y: event.clientY
							},
							this.getDOMNode()
						);

						var draggedElement = draggedItem.instance.getDOMNode();
						var draggedCoord = positionHelper.getElementLocalCenter(draggedElement);
						//console.info(draggedCoord.x,draggedCoord.y);

						var myNode = this.getDOMNode();

						var distance = Infinity;
						var position = 0;
						var children = Array.prototype.slice.apply(myNode.childNodes);
						for(var i=0; i<children.length; i++) {
							if(children[i].nodeType===1) {

								//if(children[i] === myNode) 

								var childCoord = positionHelper.getElementLocalCenter(children[i]);

								var nodeDist = Math.sqrt(
									Math.pow(draggedCoord.x - childCoord.x,2) +
									Math.pow(draggedCoord.y - childCoord.y,2)
								);

								if(nodeDist < distance) {
									distance = nodeDist;
									position = i;
								}
							}
						}
						if(draggedItem.parentModel) {
							var i = draggedItem.parentModel.indexOf(draggedItem.model);
							if(i !== position) {
								if(i !== -1) {
									draggedItem.parentModel.splice(i,1);
									if(draggedItem.parentSection !== this) {
										draggedItem.parentSection.forceUpdate();
									}
								}

								this.props.panels.splice(position,0,draggedItem.model);
								this.forceUpdate();
							}
						}

					}
				}
				event.preventDefault();
			}
		});

		return Section;

	}
);