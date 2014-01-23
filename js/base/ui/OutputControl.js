define(
	[
		'react',
		'jsx!./Control'
	],
	function(
		React,
		Control
	) {



		var OutputControl = React.createClass({
			mixins: [Control.mixin],
			getInitialState: function() {
				return {
					value: 0
				};
			},
			render: function() {

				return (
					<Control>
						<span title={this.props.definition.description}>
							{this.props.definition.label}
						</span>
						<span>
							{this.state.value}
						</span>
					</Control>
				);

			}
		});


		OutputControl.supportsDefinition = function(definition) {
			return (
				Control.supportsDefinition(definition) &&
				definition.outputOnly
			);
		}


		return OutputControl;

	}
);