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
					<Control
						className="select-control"
						definition={this.props.definition}
						appModel={this.props.appModel}
						inline={this.props.inline}
						style={this.props.style}
					>
						<select value={this.state.value} onChange={this.handleValueChange} disabled={this._isDisabled()} className="label-control">
							{this.props.definition.allowedValues.$map(function(allowedValue) {
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


		return SelectControl;

	}
);