define(
	[
		'react',
		'jsx!./Control'
	],
	function(
		React,
		Control
	) {



		var CheckboxControl = React.createClass({
			mixins: [Control.mixin],
			getInitialState: function() {
				return {
					value: ""
				};
			},
			render: function() {
				var subControls = this._getSubControlNodes();

				return this._getControlNode([
					React.DOM.label(
						{},
						[
							React.DOM.input(
								{
									type:"checkbox",
									checked:this.state.value === this.props.definition.allowedValues[0],
									onClick:this._nextValue
								}
							),
							this._getLabelTextNode()
						]
					),
					subControls
				]);

			}

		});


		CheckboxControl.supportsDefinition = function(definition) {
			return (
				Control.supportsDefinition(definition) &&
				definition.checkbox &&
				definition.allowedValues
			);
		}


		return CheckboxControl;

	}
);