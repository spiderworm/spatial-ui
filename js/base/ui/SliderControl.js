define(
	[
		'react',
		'jsx!./Control'
	],
	function(
		React,
		Control
	) {



		var SliderControl = React.createClass({
			mixins: [Control.mixin],
			getInitialState: function() {
				return {
					value: 0,
					editValueMode: false,
					temporaryValue: 0
				};
			},
			render: function() {

				return (
					<Control>
						<label>
							<span title={this.props.definition.description}>
								{this.props.definition.label}
							</span>
							{
								this.state.editValueMode ?
									<input type="text" value={this.state.temporaryValue} onChange={this.handleTemporaryValueUpdate} onBlur={this.handleTemporaryValueReady} />
								:
									<span onClick={this.enterEditValueMode}>
										{this.state.value}
									</span>
							}
							<input type="range" value={this.state.value} min={this.props.definition.min} max={this.props.definition.max} onChange={this.handleValueChange} />
						</label>
					</Control>
				);

			},
			handleTemporaryValueUpdate: function(event) {
				value = this.__validateValue(event.target.value);
				this.setState({
					temporaryValue: value
				});
			},
			handleTemporaryValueReady: function(event) {
				this.setValue(event.target.value);
				this.setState({
					editValueMode: false
				});
			},
			enterEditValueMode: function() {
				this.setState({
					editValueMode: true,
					temporaryValue: this.state.value
				});
			},
			handleValueChange: function(event) {
				this.setValue(event.target.value);
			},
			setValue: function(value) {
				value = this.__validateValue(value);
				this._setValue(value);
			},
			__validateValue: function(value) {
				if(value < this.props.definition.min) {
					value = this.props.definition.min;
				}
				if(value > this.props.definition.max) {
					value = this.props.definition.max;
				}
				return value;
			}
		});


		SliderControl.supportsDefinition = function(definition) {
			return (
				Control.supportsDefinition(definition) &&
				(definition.min || definition.min === 0) &&
				(definition.max || definition.max === 0)
			);
		}


		return SliderControl;

	}
);