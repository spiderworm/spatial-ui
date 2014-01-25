define(
	[
		'react',
		'jsx!./Control'
	],
	function(
		React,
		Control
	) {



		var ButtonControl = React.createClass({
			mixins: [Control.mixin],
			getInitialState: function() {
				return {
					value: ""
				};
			},
			render: function() {

				return (
					<Control definition={this.props.definition} baseModel={this.props.baseModel} inline={this.props.inline}>
						<button type="button" onClick={this._nextValue}>
							{this._getValueDisplay()}
						</button>
					</Control>
				);

			}

		});


		ButtonControl.supportsDefinition = function(definition) {
			return (
				Control.supportsDefinition(definition) &&
				definition.button
			);
		}


		return ButtonControl;

	}
);