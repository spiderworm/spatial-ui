define(
	[
		'../base/Model',
		'./EnergyLevelsModel'
	],
	function(
		Model,
		EnergyLevelsModel
	) {


		function EnergyModel() {
			Model.apply(this,[{
				levels: new EnergyLevelsModel()
			}]);
		}
		EnergyModel.prototype = new Model();



		return EnergyModel;

	}

);