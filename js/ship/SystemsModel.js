define(
	[
		'../base/Model',
		'./WeaponsSystemsModel'
	],
	function(
		Model,
		WeaponsSystemsModel
	) {


		function SystemsModel() {
			Model.apply(this,[{
				weapons: new WeaponsSystemsModel()
			}]);
		}
		SystemsModel.prototype = new Model();


		return SystemsModel;

	}
);