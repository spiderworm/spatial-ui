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
						loadedPercent: 0,
						loadSpeed: .005,
						targetAmmo: null,
						keepLoaded: true,
						autoFire: true
					},
					{
						display: 'Tube 2',
						currentAmmo: 'torpedos',
						loadedPercent: 1,
						loadSpeed: .005,
						targetAmmo: 'torpedos',
						keepLoaded: false,
						autoFire: false
					}
				]
			}]);
		}
		WeaponsSystemsModel.prototype = new Model();


		return WeaponsSystemsModel;

	}
);