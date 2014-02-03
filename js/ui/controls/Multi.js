define(
	[
		'react',
		'jsx!./Control',
		'jsx!./Loader'
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
				var appModel = this.props.appModel;
				var view = this;
				var inlineControls = this.props.definition.inlineControls.map(function(definition) {
					return (
						<ControlLoader
							key={view.getKey([view,definition])}
							appModel={appModel}
							definition={definition}
							inline={true}
						></ControlLoader>
					);
				});
				var subControls = this._getSubControlNodes();

				return this._getControlNode([
					this._getLabelTextNode(),
					inlineControls,
					subControls
				]);

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