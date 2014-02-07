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
					<Control className="output-control" definition={this.props.definition} appModel={this.props.appModel} inline={this.props.inline}>
						<span>
							{this._getValueDisplay()}
						</span>
					</Control>
				);

			}
		});


		OutputControl.supportsDefinition = function(definition) {
			return (
				Control.supportsDefinition(definition)
			);
		}


		return OutputControl;

	}
);