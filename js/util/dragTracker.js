define(
	function() {

		function DragTracker(){}

		DragTracker.prototype.setDraggedItem = function(item) {
			if(!this.__draggedItem) {
				this.__draggedItem = item;
			}
		}

		DragTracker.prototype.setDragStopped = function() {
			this.__draggedItem = null;
		}

		DragTracker.prototype.getDraggedItem = function() {
			return this.__draggedItem;
		}

		var dragTracker = new DragTracker();

		return dragTracker;

	}
);