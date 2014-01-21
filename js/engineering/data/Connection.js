define(
	[
		'../../base/data/Connection'
	],
	function(
		DataConnection
	) {

		function EngineeringDataConnection(user,ship) {
			var model;
			if(ship) {
				model = ship.engineering;
			}
			
			DataConnection.apply(this,[model]);

			this._user = user;
			this._ship = ship;
		}
		EngineeringDataConnection.prototype = new DataConnection();


		return EngineeringDataConnection;
	}
);