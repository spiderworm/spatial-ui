define(
	[
		'buster',
		'ui/controls/util/ValueManager'
	],
	function(
		buster,
		ValueManager
	) {


		define(
			"ui/modelMixin",
			function(Model) {

				function modelMixin() {

				}

				return modelMixin;
			}
		);


		function MockModel() {

		}


		function valueManagerTests() {

			buster.spec.expose();

			describe("ValueManager",function() {

				it("doesnt suck",function() {
					
					//var manager = new ValueManager(model,baseModel,user,onValue);

				});

			});

		}


		return valueManagerTests;

	}
);