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
						'jsx!base/ui/SliderControl',
						'jsx!base/ui/OutputControl',
						'jsx!base/ui/ButtonControl',
						'jsx!base/ui/CheckboxControl',
						'jsx!base/ui/SelectControl',
						'jsx!base/ui/MultiControl',
						'jsx!base/ui/TextControl'
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
					}
				);

				return {
					path: '',
					definition: null,
					inline: false
				};
			},
			render: function() {

				var definition = this.props.definition;
				if(!definition && this.props.path && this.props.baseModel && this.props.baseModel.controls) {
					definition = this.props.baseModel.controls[this.props.path];
				}

				if(definition) {

					if(this.state && this.state.Controls) {

						for(var i=0; i<this.state.Controls.length; i++) {
							if(this.state.Controls[i].supportsDefinition(definition)) {
								return new this.state.Controls[i]({
									definition: definition,
									baseModel: this.props.baseModel,
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