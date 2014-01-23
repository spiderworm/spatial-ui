define(
	[
		'../../registry'
	],
	function(
		registry
	) {


		function ConnectionFactory(Constructor,MockConstructor) {
			this.__Constructor = Constructor;
			this.__MockConstructor = MockConstructor;
		}
		ConnectionFactory.prototype.getConnection = function() {
			var Constructor = this.__Constructor;

			if(registry.get('mock')) {
				Constructor = this.__MockConstructor;
			}
			var command = 'instance = new Constructor(';
			for(var i=0; i<arguments.length; i++) {
				if(i>0) {
					command += ',';
				}
				command += 'arguments[' + i + ']';
			}
			command += ');';
			var instance;
			eval(command);
			return instance;
		}



		return ConnectionFactory;

	}
);