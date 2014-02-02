define(
	[
		'../../registry',
		'./MockConnection'
	],
	function(
		registry,
		MockUserServiceConnection
	) {

		function UserDataConnectionFactory() {

		}

		UserDataConnectionFactory.prototype.getConnection = function(user) {
			if(registry.get('mock')) {
				return new MockUserServiceConnection(user);
			}
		}



		var userDataConnectionFactory = new UserDataConnectionFactory();
		return userDataConnectionFactory;
	}
);