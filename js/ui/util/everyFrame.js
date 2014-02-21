define(
	function() {

		function everyFrame(callback) {
			function frame() {
				requestAnimationFrame(frame);
				callback();
			}
			requestAnimationFrame(frame);
		}

		return everyFrame;

	}
);