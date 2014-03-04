define(
	function() {

		var domUtils = {};

		domUtils.position = {
			getEventRelativePosition: function(element,event) {
				var position = this.getPosition(element);
				return {
					x: event.pageX - position.x,
					y: event.pageY - position.y
				};
			},
			getRelativePosition: function(elementA,elementB) {
				var x = 0, y = 0;
				if(elementA!==elementB) {
					var posA = this.getPosition(elementA);
					var posB = this.getPosition(elementB);
					x = posB.x - posA.x;
					y = posB.y - posA.y;
				}
				return {
					x: x,
					y: y
				}
			},
			getPosition: function(element) {
				var x = element.offsetLeft, y = element.offsetTop;
				if(element !== element.ownerDocument.documentElement) {
					var parent = element.offsetParent;
					if(parent) {
						var parentPos = this.getPosition(parent);
						var style = getComputedStyle(parent);
						x += parentPos.x + parent.scrollLeft + parseInt(style['border-left-width']);
						y += parentPos.y + parent.scrollTop + parseInt(style['border-top-width']);
					}
				}
				return {
					x: x,
					y: y
				};
			}
		};

		return domUtils;

	}
);