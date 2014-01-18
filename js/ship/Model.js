define(
	[
		'../base/Model',
		'../weapons/Model',
		'../engineering/Model',
		'./SystemsModel'
	],
	function(
		Model,
		WeaponsModel,
		EngineeringModel,
		SystemsModel
	) {


		function ShipModel() {
			Model.apply(this,[{
				weapons: new WeaponsModel(),
				engineering: new EngineeringModel(),
				systems: new SystemsModel()
			}]);
		}
		ShipModel.prototype = new Model();



		return ShipModel;

	}

);