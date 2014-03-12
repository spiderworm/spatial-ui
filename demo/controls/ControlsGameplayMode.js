define(
	[
		'../base/ServiceMode'
	],
	function(
		ServiceMode
	) {

		function ControlsGameplayMode() {
			ServiceMode.apply(this);

			this.setData(
				{
					"controls": {
						"helm": {
							"steering": {
								"type": "control",
								"subtype": "multi",
								"label": "steering",
								"subControls": {
									"type":"control-group",
									"impulse": {
										"type": "control",
										"index": 0,
										"x": 0.25,
										"y": 0.25,
										"z": 1,
										"width": 7,
										"height": 6,
										"path": "/controls/helm/impulse"
									},
									"pitch": {
										"type": "control",
										"index": 0,
										"x": 0.25,
										"y": 1.5,
										"z": 1,
										"width": 1.25,
										"height": 4,
										"path": "/controls/helm/pitch"
									},
									"yaw": {
										"type": "control",
										"index": 1,
										"x": 1.75,
										"y": 1.5,
										"z": 2,
										"width": 1.25,
										"height": 4,
										"path": "/controls/helm/yaw"
									},
									"roll": {
										"type": "control",
										"index": 2,
										"x": 3.25,
										"y": 1.5,
										"z": 3,
										"width": 1.25,
										"height": 4,
										"path": "/controls/helm/roll"
									}
								}
							},
							"impulse": {
								"type": "control",
								"subtype": "multi",
								"inlineControls": {
									"throttle": {
										"type": "control",
										"subtype": "range",
										"label": "Impulse",
										"description": "impulse engines provide traditional Newtonian movement around space",
										"min": -1000,
										"max": 1000,
										"valuePath": "/physics/values/thrusters/forward",
										"x": 0,
										"y": 0,
										"z": 0,
										"width": 6.25,
										"height": 1
									},
									"kill": {
										"type": "control",
										"subtype": "button",
										"description": "kill the impulse engines",
										"display": "0",
										"message": "forward",
										"valuePath": "/physics/values/thrusters/kill",
										"x": 5.5,
										"y": 0,
										"z": 0,
										"width": 2,
										"height": 1
									}
								}
							},
							"pitch": {
								"type": "control",
								"subtype": "range",
								"label": "pitch",
								"layout": "vertical",
								"description": "turns the ship on the X-axis",
								"min": -1000,
								"max": 1000,
								"valuePath": "/physics/values/thrusters/pitch/throttle"
							},
							"yaw": {
								"type": "control",
								"subtype": "range",
								"label": "yaw",
								"layout": "vertical",
								"description": "turns the ship on the Y-axis",
								"min": -1000,
								"max": 1000,
								"valuePath": "/physics/values/thrusters/yaw/throttle"
							},
							"roll": {
								"type": "control",
								"subtype": "range",
								"label": "roll",
								"layout": "vertical",
								"description": "turns the ship on the Z-axis",
								"min": -1000,
								"max": 1000,
								"valuePath": "/physics/values/thrusters/roll/throttle"
							}
						},
						"engineering": {
							"energy": {
								"levels": {
									"impulse": {
										"type": "control",
										"subtype": "range",
										"label": "impulse energy levels",
										"description": "power provided to the impulse engines (manufacturer recommended level: 100)",
										"min": 0,
										"max": 200,
										"valuePath": "/values/engineering/energy/levels/impulse"
									},
									"tubes": {
										"type": "control",
										"subtype": "range",
										"label": "tube energy levels",
										"description": "power provided to the tubes (manufacturer recommended level: 100)",
										"min": 0,
										"max": 200,
										"valuePath": "/values/engineering/energy/levels/tubes"
									},
									"phasers": {
										"type": "control",
										"subtype": "range",
										"label": "phasers energy levels",
										"description": "power provided to the phasers (manufacturer recommended level: 100)",
										"min": 0,
										"max": 200,
										"valuePath": "/values/engineering/energy/levels/phasers"	
									}
								}
							}
						},
						"weapons": {
							"torpedos": {
								"stock": {
									"type": "control",
									"subtype": "output",
									"label": "torpedos",
									"description": "current stock of torpedos",
									"valuePath": "/values/weapons/ammo/torpedos"
								}
							},
							"phasers": {
								"switch": {
									"type": "control",
									"subtype": "button",
									"label": "phasers",
									"description": "enable/disable phasers",
									"allowedValues": [1,0],
									"valueMap": [
										{
											"value": 1,
											"display": "enabled"
										},
										{
											"value": 0,
											"display": "disabled"
										}
									],
									"valuePath": "/values/weapons/phasers/enabled"
								},
								"frequency": {
									"type": "control",
									"subtype": "drop-list",
									"label": "phasers frequency",
									"description": "set phasers frequency",
									"allowedValues": ["A","B","C","D"],
									"valuePath": "/values/weapons/phasers/frequency"
								}
							}
						},
						"systems": {
							"tubes": {
								"type": "control",
								"subtype": "multi",
								"label": "tubes",
								"subControls": {
									"type":"control-group",
									"0": {
										"type": "control",
										"index": 0,
										"path": "/controls/systems/tubes/1"
									},
									"1": {
										"type": "control",
										"index": 1,
										"path": "/controls/systems/tubes/2"
									}
								},
								"1": {
									"type": "control",
									"subtype": "multi",
									"label": "tube 1",
									"inlineControls": [
										{
											"type": "control",
											"subtype": "output",
											"description": "current ammo in tube",
											"valuePath": "/values/systems/tubes/1/currentAmmo"
										},
										{
											"type": "control",
											"subtype": "output",
											"description": "percentage that current ammo is loaded",
											"valuePath": "/values/systems/tubes/1/loadedPercent",
											"format": "%"
										},
										{
											"type": "control",
											"subtype": "button",
											"description": "attack target with tube contents",
											"valuePath": "/values/systems/tubes/1/fire",
											"button": true,
											"allowedValues": [1,0],
											"display": "fire",
											"disabled": true
										},
										{
											"type": "control",
											"subtype": "checkbox",
											"description": "automatically fire when ammo is loaded",
											"label": "auto fire",
											"valuePath": "/values/systems/tubes/1/autoFire",
											"checkbox": true,
											"allowedValues": [1,0]
										}
									],
									"subControls": {
										"type": "control-group",
										"0": {
											"type": "control",
											"subtype": "multi",
											"inlineControls": [
												{
													"type": "control",
													"subtype": "drop-list",
													"allowedValues": [null,"torpedos"],
													"valueMap": [
														{
															"value": null,
															"display": "none"
														}
													],
													"valuePath": "/values/systems/tubes/1/selectedAmmo"
												},
												{
													"type": "control",
													"subtype": "button",
													"allowedValues": [1,0],
													"valuePath": "/values/systems/tubes/1/load",
													"display": "load"
												},
												{
													"type": "control",
													"subtype": "button",
													"allowedValues": [1,0],
													"valuePath": "/values/systems/tubes/1/unload",
													"display": "unload"
												},
												{
													"type": "control",
													"subtype": "checkbox",
													"allowedValues": [1,0],
													"valuePath": "/values/systems/tubes/1/keepLoaded",
													"label": "keep loaded"
												}
											]
										}
									}
								},
								"2": {
									"type": "control",
									"subtype": "multi",
									"label": "tube 2",
									"inlineControls": [
										{
											"type": "control",
											"subtype": "output",
											"valuePath": "/values/systems/tubes/2/currentAmmo"
										},
										{
											"type": "control",
											"subtype": "output",
											"description": "percentage that current ammo is loaded",
											"valuePath": "/values/systems/tubes/2/loadedPercent",
											"format": "%"
										},
										{
											"type": "control",
											"subtype": "button",
											"valuePath": "/values/systems/tubes/2/fire",
											"allowedValues": [1,0],
											"display": "fire"
										},
										{
											"type": "control",
											"subtype": "checkbox",
											"label": "auto fire",
											"valuePath": "/values/systems/tubes/2/autoFire",
											"allowedValues": [1,0]
										}
									],
									"subControls": {
										"type": "control-group",
										"0": {
											"type": "control",
											"subtype": "multi",
											"inlineControls": [
												{
													"type": "control",
													"subtype": "drop-list",
													"allowedValues": [null,"torpedos"],
													"valueMap": [
														{
															"value": null,
															"display": "none"
														}
													],
													"valuePath": "/values/systems/tubes/2/selectedAmmo"
												},
												{
													"type": "control",
													"subtype": "button",
													"allowedValues": [1,0],
													"valuePath": "/values/systems/tubes/2/load",
													"display": "load"
												},
												{
													"type": "control",
													"subtype": "button",
													"allowedValues": [1,0],
													"valuePath": "/values/systems/tubes/2/unload",
													"display": "unload"
												},
												{
													"type": "control",
													"subtype": "checkbox",
													"allowedValues": [1,0],
													"valuePath": "/values/systems/tubes/2/keepLoaded",
													"label": "keep loaded"
												}
											]
										}
									}
								}
							}
						}
					}
				}
			);

		}

		ControlsGameplayMode.prototype = new ServiceMode();

		return ControlsGameplayMode;
	}
);