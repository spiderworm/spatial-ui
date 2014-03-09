define(
	[
		'../base/ServiceMode'
	],
	function(
		ServiceMode
	) {

		function UIStartupMode() {
			ServiceMode.apply(this);
			this.data = {
				ui: {
					panels: {
						type: 'panel-group',
						panel1: {
							type: 'panel',
							label: "choose your experience",
							controls: {
								type: 'control-group',
								playerMode: {
									type: "control",
									subtype: 'button',
									display: 'player mode',
									x: 0,
									y: .5,
									z: 1,
									width: 6,
									height: 1,
									message: "/ui/mode/player"
								},
								gameMasterMode: {
									type: "control",
									subtype: 'button',
									display: 'game master mode',
									x: 0,
									y: 1.75,
									z: 1,
									width: 6,
									height: 1,
									message: "/ui/mode/gamemaster"
								}
							}
						}
					}
				}
			};

		}
		UIStartupMode.id = "startup";
		UIStartupMode.prototype = new ServiceMode();
		UIStartupMode.prototype.constructor = UIStartupMode;

		return UIStartupMode;

	}
);