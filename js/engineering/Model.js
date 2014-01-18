define(
	[
		'../base/Model',
		'./EnergyModel'
	],
	function(
		Model,
		EnergyModel
	) {


		function EngineeringModel() {
			Model.apply(this,[{
				energy: new EnergyModel()
			}]);
		}
		EngineeringModel.prototype = new Model();



		return EngineeringModel;

	}

);