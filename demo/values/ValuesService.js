define(
	[
		'../base/MockService',
		'./ValuesGameplayMode'
	],
	function(
		MockService,
		ValuesGameplayMode
	) {

		function ValuesService() {
			MockService.apply(this,['values']);
			this.setMode(new ValuesGameplayMode());
		}
		ValuesService.prototype = new MockService();

		return ValuesService;

	}
);