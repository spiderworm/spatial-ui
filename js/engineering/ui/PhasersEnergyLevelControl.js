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
			systemDataName: 'phasers',
			mixins: [systemEnergyLevelControlMixin],
			render: function() {
				return this.getNode(
					'Phasers Energy',
					'phasers-energy-level-control'
				);
			}
		});

		return TubesEnergyLevelControl;

	}
);