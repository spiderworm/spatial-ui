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


		function WeaponsModel() {
			Model.apply(this,[{
				ammo: new AmmoModel(),
				phasers: new PhasersModel()
			}]);
		}
		WeaponsModel.prototype = new Model();



		return WeaponsModel;

	}

);