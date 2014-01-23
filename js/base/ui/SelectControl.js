define(
	[
		'react',
		'jsx!./Control',
		'jsx!./ButtonControl'
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
					<Control>
						<label>
							<span title={this.props.definition.description}>
								{this.props.definition.label}
							</span>
							<select value={this.state.value} onChange={this.handleValueChange}>
								{this.props.definition.allowedValues.map(function(allowedValue) {
									return <option value={allowedValue}>{view._getValueOutput(allowedValue)}</option>;
								})}
							</select>
						</label>
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