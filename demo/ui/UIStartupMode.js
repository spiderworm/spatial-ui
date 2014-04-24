define(
	[
		'../base/ServiceMode',
		'./UIGameplayMode',
		'./UIGameMasterMode'
	],
	function(
		ServiceMode,
		UIGameplayMode,
		UIGameMasterMode
	) {

		function UIStartupMode() {
			ServiceMode.apply(this);
			this.setData(
				{
					ui: {
						panels: {
							type: 'panel-group',
							panel1: {
								type: 'panel',
								label: "choose your experience",
								width: 8,
								height: 3.5,
								controls: {
									type: 'control-group',
									playerMode: {
										type: "control",
										subtype: 'button',
										display: 'player mode',
										x: 1,
										y: .5,
										z: 1,
										width: 6,
										height: 1,
										valuePath: "/ui/mode",
										message: UIGameplayMode.id
									},
									gameMasterMode: {
										type: "control",
										subtype: 'button',
										display: 'game master mode',
										x: 1,
										y: 1.75,
										z: 1,
										width: 6,
										height: 1,
										valuePath: "/ui/mode",
										message: UIGameMasterMode.id
									}
								}
							}
						}
					}
				}
			);

			this.send();

		}
		UIStartupMode.id = "startup";
		UIStartupMode.prototype = new ServiceMode();
		UIStartupMode.prototype.constructor = UIStartupMode;

		return UIStartupMode;

	}
);