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
						style={this.props.style}
					>
						<span className="label-control">
							{this._getValueDisplay()}
						</span>
					</Control>
				);

			}
		});

		return OutputControl;

	}
);