define(
	[
		'../base/Model'
	],
	function(
		Model
	) {


		function PhasersModel() {
			Model.apply(this,[{
				enabled: false,
				frequency: "A",
				availableFrequencies: ["A","B","C","D"]
			}]);
		}
		PhasersModel.prototype = new Model();



		return PhasersModel;

	}

);