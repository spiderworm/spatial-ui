define(
	[
		'../base/EventObject'
	],
	function(
		EventObject
	) {

		function User(){
			EventObject.apply(this);
		}
		User.prototype = new EventObject();


		return User;

	}
);