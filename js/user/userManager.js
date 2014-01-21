define(
	[
		'./User'
	],
	function(
		User
	) {


		function UserManager() {
			this._user = new User();
		}
		UserManager.prototype.getCurrentUser = function() {
			return this._user;
		}

		var userManager = new UserManager();
		return userManager;

	}
);