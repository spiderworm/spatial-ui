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
					<Control definition={this.props.definition} appModel={this.props.appModel} inline={this.props.inline}>
						<button type="button" name={this.props.modelPropertyName} onClick={this._nextValue} disabled={this._isDisabled()}>
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