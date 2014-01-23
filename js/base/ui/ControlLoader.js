define(
	[
		'react',
		'jsx!./SliderControl',
		'jsx!./OutputControl',
		'jsx!./ButtonControl',
		'jsx!./SelectControl'
	],
	function(
		React,
		SliderControl,
		OutputControl,
		ButtonControl,
		SelectControl
	) {

		var ControlLoader = React.createClass({
			getDefaultProps: function() {
				var controlDefinition = this.props.ship.controls[this.props.path];

				return {
					controlDefinition: controlDefinition
				};
			},
			render: function() {
				if(this.props.controlDefinition) {

					if(SliderControl.supportsDefinition(this.props.controlDefinition)) {
						return (
							<SliderControl definition={this.props.controlDefinition} baseModel={this.props.ship}></SliderControl>
						);
					} 

					if(OutputControl.supportsDefinition(this.props.controlDefinition)) {
						return (
							<OutputControl definition={this.props.controlDefinition} baseModel={this.props.ship}></OutputControl>
						);
					}

					if(ButtonControl.supportsDefinition(this.props.controlDefinition)) {
						return (
							<ButtonControl definition={this.props.controlDefinition} baseModel={this.props.ship}></ButtonControl>
						);
					}

					if(SelectControl.supportsDefinition(this.props.controlDefinition)) {
						return (
							<SelectControl definition={this.props.controlDefinition} baseModel={this.props.ship}></SelectControl>
						);
					}

				}

				return (
					<div>
						Control "{this.props.path}" unavailable.
					</div>
				);

				/*
				if(this.state.Module) {
					return (
						this.state.Module(
							{
								ship: this.props.ship,
								user: this.props.user
							}
						)
					);
				} else {
					return <span>loading</span>;
				};*/
			}
		});

		return ControlLoader;

	}
);