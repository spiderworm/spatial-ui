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
				return this._getControlNode([
					React.DOM.label(
						{},
						[
							React.DOM.input(
								{
									type: "checkbox",
									checked: this.state.value === this.props.definition.allowedValues[0],
									onClick: this._nextValue,
									disabled: this._isDisabled()
								}
							),
							this._getLabelTextNode()
						]
					)
				]);
			}

		});

		return CheckboxControl;

	}
);