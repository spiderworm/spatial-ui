define(
	[
		'./data/connectionFactory'
	],
	function(
		userDataConnectionFactory
	) {

		function User(){
			
		}
		User.prototype.getShip = function() {
			var userDataConnection = userDataConnectionFactory.getConnection(this);
			ship = userDataConnection.getShip();
			return ship;
		}

		return User;

	}
);