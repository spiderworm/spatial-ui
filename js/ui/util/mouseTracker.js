define(
	[
		'./domUtils'
	],
	function(
		domUtils
	) {


		var BUTTON = {
			UP: 'button-up',
			DOWN: 'button-down'
		};

		var mouseTracker = {
			x: 0,
			y: 0,
			button1Down: function() {
				return this.__buttons[1].state === BUTTON.DOWN;
			},
			getRelativePosition: function(element) {
				var pos = domUtils.position.getPosition(element);
				return {
					x: this.x - pos.x,
					y: this.y - pos.y
				};
			},
			__buttons: {
				1: {
					state: BUTTON.UP
				}
			}
		};

		window.addEventListener('mousemove',function(event) {
			mouseTracker.x = event.pageX;
			mouseTracker.y = event.pageY;
		});

		window.addEventListener('mousedown',function() {
			mouseTracker.__buttons[1].state = BUTTON.DOWN;
		});

		window.addEventListener('mouseup',function() {
			mouseTracker.__buttons[1].state = BUTTON.UP;
		});

		return mouseTracker;

	}
);