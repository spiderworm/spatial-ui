define(
	[
		'react',
		'jsx!./systemEnergyLevelControlMixin'
	],
	function(
		React,
		systemEnergyLevelControlMixin
	) {

		var TubesEnergyLevelControl = React.createClass({
			systemDataName: 'tubes',
			mixins: [systemEnergyLevelControlMixin],
			render: function() {
				return this.getNode(
					'Tubes Energy',
					'tubes-energy-level-control'
				);
			}
		});

		return TubesEnergyLevelControl;

	}
);