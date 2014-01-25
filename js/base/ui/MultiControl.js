define(
	[
		'react',
		'jsx!./Control',
		'jsx!./ControlLoader'
	],
	function(
		React,
		Control,
		ControlLoader
	) {



		var MultiControl = React.createClass({
			mixins: [Control.mixin],
			getInitialState: function() {
				return {
					value: ""
				};
			},
			render: function() {
				var baseModel = this.props.baseModel;
				return (
					<Control definition={this.props.definition} baseModel={this.props.baseModel} inline={this.props.inline}>
						{this.props.definition.inlineControls.map(function(definition) {
							return <ControlLoader baseModel={baseModel} definition={definition} inline={true}></ControlLoader>;
						})}
					</Control>
				);

			}

		});


		MultiControl.supportsDefinition = function(definition) {
			return (
				Control.supportsDefinition(definition) &&
				definition.inlineControls
			);
		}


		return MultiControl;

	}
);