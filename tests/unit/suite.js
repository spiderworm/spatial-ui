define(
	[
		'buster',
		'./ui/controls/util/ValueManager'
	],
	function(
		buster,
		valueManagerTests
	) {

		function suite() {

			valueManagerTests();



		}


		return suite;

	}
)