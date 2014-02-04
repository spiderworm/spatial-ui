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
			getInitialState: function() {

				var path = this.props.path || '';
				var definition = this.props.definition;

				if(typeof this.props.definition === "string") {
					path = this.props.definition;
					definition = this.props.appModel.controls[path];
				}

				return {
					path: path,
					definition: definition
				};

			},
			render: function() {

				var appModel = this.props.appModel;

				var definition = this.state.definition;
				if(!definition && this.state.path) {
					definition = appModel.controls[this.state.path];
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
					return <span>Control "{this.state.path}" unavailable.</span>;
				} else {
					return <div>Control "{this.state.path}" unavailable.</div>;
				}

			}
		});

		return ControlLoader;

	}
);