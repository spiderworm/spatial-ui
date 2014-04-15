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
					<Control
						className="button-control"
						definition={this.props.definition}
						appModel={this.props.appModel}
						inline={this.props.inline}
						style={this.props.style}
					>
						<span className="button-wrap label-control">
							<button type="button" name={this.props.modelPropertyName} onClick={this._nextValue} disabled={this._isDisabled()}>
								{this._getValueDisplay()}
							</button>
						</span>
					</Control>
				);

			}

		});


		return ButtonControl;

	}
);