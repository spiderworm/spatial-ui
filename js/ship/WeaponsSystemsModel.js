define(
	[
		'../base/Model'
	],
	function(
		Model
	) {


		function WeaponsSystemsModel() {
			Model.apply(this,[{
				tubes: [
					{
						display: 'Tube 1',
						currentAmmo: null,
						keepLoaded: true
					},
					{
						display: 'Tube 2',
						currentAmmo: 'torpedos',
						keepLoaded: false
					}
				]
			}]);
		}
		WeaponsSystemsModel.prototype = new Model();


		return WeaponsSystemsModel;

	}
);