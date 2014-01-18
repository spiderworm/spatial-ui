define(
	[
		'../base/Model',
		'./PhasersModel',
		'./AmmoModel'
	],
	function(
		Model,
		PhasersModel,
		AmmoModel
	) {


		function AmmoModel() {
			Model.apply(this,[{
				torpedos: 0
			}]);
		}
		AmmoModel.prototype = new Model();



		return AmmoModel;

	}

);