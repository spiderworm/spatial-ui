define(
	[
		'react',
		'jsx!./Control',
		'jsx!./Button'
	],
	function(
		React,
		Control,
		ButtonControl
	) {



		var SelectControl = React.createClass({
			mixins: [Control.mixin],
			getInitialState: function() {
				return {
					value: ""
				};
			},
			render: function() {

				var view = this;

				return (
					<Control definition={this.props.definition} appModel={this.props.appModel} inline={this.props.inline}>
						<select value={this.state.value} onChange={this.handleValueChange} disabled={this._isDisabled()}>
							{this.props.definition.allowedValues.map(function(allowedValue) {
								return (
									<option
										key={view.getKey([view,allowedValue])}
									value={allowedValue}>
										{view._getValueDisplay(allowedValue)}
									</option>
								);
							})}
						</select>
					</Control>
				);

			},
			handleValueChange: function(event) {
				this._setValue(event.target.value);
			}

		});


		SelectControl.supportsDefinition = function(definition) {
			return (
				Control.supportsDefinition(definition) &&
				definition.allowedValues &&
				!ButtonControl.supportsDefinition(definition)
			);
		}


		return SelectControl;

	}
);