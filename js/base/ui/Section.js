define(
	[
		'react',
		'jsx!./Panel',
		'../../util/dragTracker'
	],
	function(
		React,
		Panel,
		dragTracker
	) {

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

						var distance = Infinity;
						var position = 0;
						var children = this.getDOMNode().childNodes;
						for(var i=0; i<children.length; i++) {
							if(children[i].nodeType===1) {
								var nodeDist = Math.sqrt(
									Math.pow(
										event.clientX-(children[i].offsetLeft + (.5 * children[i].offsetWidth)),
										2
									) +
									Math.pow(
										event.clientY-(children[i].offsetHeight + (.5 * children[i].offsetHeight)),
										2
									)
								);
								if(nodeDist < distance) {
									distance = nodeDist;
									position = i;
								}
							}
						}
						//console.info('position',position);
						if(draggedItem.parentModel) {
							var i = draggedItem.parentModel.indexOf(draggedItem.model);
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
				event.preventDefault();
			}
		});

		return Section;

	}
);