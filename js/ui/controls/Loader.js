define(
	[
		'react'
	],
	function(
		React
	) {

		var ControlLoader = React.createClass({
			getDefaultProps: function() {
				var view = this;
				require(
					[
						'jsx!ui/controls/Slider',
						'jsx!ui/controls/Output',
						'jsx!ui/controls/Button',
						'jsx!ui/controls/Checkbox',
						'jsx!ui/controls/Select',
						'jsx!ui/controls/Multi',
						'jsx!ui/controls/Text'
					],
					function(
						SliderControl,
						OutputControl,
						ButtonControl,
						CheckboxControl,
						SelectControl,
						MultiControl,
						TextControl
					) {
						setTimeout(function() {
							view.setState({
								Controls: [
									SliderControl,
									OutputControl,
									ButtonControl,
									CheckboxControl,
									SelectControl,
									MultiControl,
									TextControl
								]
							});
						},100);
					}
				);

				return {
					path: '',
					definition: null,
					inline: false
				};
			},
			render: function() {

				var appModel = this.props.appModel;

				var definition = this.props.definition;
				if(!definition && this.props.path) {
					definition = appModel.controls[this.props.path];
				}

				if(definition) {

					if(this.state && this.state.Controls) {

						for(var i=0; i<this.state.Controls.length; i++) {
							if(this.state.Controls[i].supportsDefinition(definition)) {
								return new this.state.Controls[i]({
									definition: definition,
									appModel: appModel,
									inline: this.props.inline
								});
							}
						}

					} else {

						if(this.props.inline) {
							return <span>Loading...</span>;
						} else {
							return <div>Loading...</div>;
						}

					}

				}

				if(this.props.inline) {
					return <span>Control "{this.props.path}" unavailable.</span>;
				} else {
					return <div>Control "{this.props.path}" unavailable.</div>;
				}

			}
		});

		return ControlLoader;

	}
);