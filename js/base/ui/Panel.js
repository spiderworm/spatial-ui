define(
	[
		'react',
		'jsx!./ControlLoader',
		'../../util/dragTracker'
	],
	function(
		React,
		ControlLoader,
		dragTracker
	) {



		var Panel = React.createClass({
			getDefaultProps: function() {
				return {
					controls: this.props.definition.controls
				};
			},
			getInitialState: function() {
				return {
					dragging: false
				};
			},
			render: function() {
				var baseModel = this.props.ship;
				var user = this.props.user;

				return (
					<section
						className={"panel" + (this.state.dragging ? " dragging" : "")} 
						draggable="true"
						onDragStart={this.__handleDragStarted}
						onDragEnd={this.__handleDragEnded}
						onDragEnter={this.__handleDragEnter}
						onDragLeave={this.__handleDragLeave}
					>
						<h1>{this.props.display}</h1>
						{this.props.controls.map(function(control) {
							return <ControlLoader baseModel={baseModel} path={control.path} user={user} />;
						})}
						{this.props.children}
					</section>
				);
			},
			__handleDragStarted: function() {
				this.setState({dragging:true});
				dragTracker.setDraggedItem(
					{
						type: Panel,
						instance: this,
						model: this.props.definition,
						canMove: false
					}
				);
			},
			__handleDragLeave: function() {
				var draggedItem = dragTracker.getDraggedItem();
				if(draggedItem.model === this.props.definition) {
					draggedItem.canMove = true;
				}
			},
			__handleDragEnter: function() {
				var draggedItem = dragTracker.getDraggedItem();
				if(draggedItem.model === this.props.definition) {
					draggedItem.canMove = false;
				}
			},
			__handleDragEnded: function() {
				this.setState({dragging:false});
				dragTracker.setDragStopped();
			}
		});


		Panel.getUniqueID = function() {
			Panel.getUniqueID.__last++;
			return Panel.getUniqueID.__last;
		}
		Panel.getUniqueID.__last = 0;

		return Panel;

	}
);