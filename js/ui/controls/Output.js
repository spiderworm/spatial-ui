define(
	[
		'react',
		'jsx!./Control'
	],
	function(
		React,
		Control
	) {



		var OutputControl = React.createClass({
			mixins: [Control.mixin],
			getInitialState: function() {
				return {
					value: 0
				};
			},
			render: function() {

				return (
					<Control
						className="output-control"
						definition={this.props.definition}
						appModel={this.props.appModel}
						inline={this.props.inline}
						style={this.props.style}
					>
						<span>
							{this._getValueDisplay()}
						</span>
					</Control>
				);

			}
		});

		return OutputControl;

	}
);