define(
	[
		'../../base/data/Connection'
	],
	function(
		DataConnection
	) {

		function EngineeringDataConnection(user,ship) {
			DataConnection.apply(this);

			this._user = user;
			this._ship = ship;

			if(ship) {
				this._energyLevels = ship.engineering.energy.levels;
			}
		}
		EngineeringDataConnection.prototype = new DataConnection();


		return EngineeringDataConnection;
	}
);