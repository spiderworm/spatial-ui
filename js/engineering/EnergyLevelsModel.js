define(
	[
		'../base/Model'
	],
	function(
		Model
	) {


		function EnergyLevelsModel() {
			Model.apply(this,[{
				phasers: 100,
				tubes: 100
			}]);
		}
		EnergyLevelsModel.prototype = new Model();



		return EnergyLevelsModel;

	}

);