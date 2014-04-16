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
				var user = this.props.user;
				var view = this;

				var subcontrols = this.props.definition.$map(function(definition,id) {
					if(definition && definition.type === "control") {
						return (
							<ControlLoader
								key={view.getKey([view,definition])}
								appModel={appModel}
								definition={definition}
								user={user}
							></ControlLoader>
						);
					}
				});

				var node = this._getControlNode([
					this._getLabelTextNode(),
					subcontrols
				]);
				node.props.className += " multi-control";

				return node;
			}

		});


		return MultiControl;

	}
);