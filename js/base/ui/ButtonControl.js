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
					<Control>
						<label>
							<span title={this.props.definition.description}>
								{this.props.definition.label}
							</span>
							<button type="button" onClick={this._nextValue}>
								{this._getValueOutput()}
							</button>
						</label>
					</Control>
				);

			}

		});


		ButtonControl.supportsDefinition = function(definition) {
			return (
				Control.supportsDefinition(definition) &&
				definition.button
			);
		}


		return ButtonControl;

	}
);