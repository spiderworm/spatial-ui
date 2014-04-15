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
				var labelText = this._getLabelTextNode();
				return this._getControlNode([
					React.DOM.label(
						{
							"data-label-text": labelText ? true : false
						},
						[
							React.DOM.span(
								{
									className: "label-control"
								},
								[
									React.DOM.input(
										{
											type: "checkbox",
											className: "label-control",
											checked: this.state.value === this.props.definition.allowedValues[0],
											onClick: this._nextValue,
											disabled: this._isDisabled()
										}
									)
								]
							),
							labelText
						]
					)
				]);
			}

		});

		return CheckboxControl;

	}
);