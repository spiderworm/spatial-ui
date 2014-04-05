define(
	[
		'react',
		'jsx!./Control',
		'../util/mouseTracker'
	],
	function(
		React,
		Control,
		mouseTracker
	) {



		var SliderControl = React.createClass({
			mixins: [Control.mixin],
			getInitialState: function() {
				return {
					value: 0,
					editValueMode: false,
					temporaryValue: 0
				};
			},
			render: function() {

				return (
					<Control
						className="slider-control"
						definition={this.props.definition}
						appModel={this.props.appModel}
						inline={this.props.inline}
						layout={this.props.definition.layout === "vertical" ? "vertical" : "horizontal"}
						style={this.props.style}
					>
						{
							this.state.editValueMode ?
								<span
									className="value-editor"
								>
									<input
										type="text"
										name="value"
										value={this.state.temporaryValue}
										onChange={this.handleTemporaryValueUpdate}
										onBlur={this.handleTemporaryValueReady}
										disabled={this._isDisabled()}
									></input>
								</span>
							:
								<span
									className="value-display"
									onClick={this.enterEditValueMode}
								>
									{this._getValueDisplay()}
								</span>
						}
						<input
							type="range"
							value={this.state.value}
							min={this.props.definition.min}
							max={this.props.definition.max}
							onChange={this.handleValueChange}
							disabled={this._isDisabled()}
						></input>
						<AlternateSlider
							value={this.state.value}
							min={this.props.definition.min}
							max={this.props.definition.max}
							onChange={this.setValue}
							disabled={this._isDisabled()}
							layout={this.props.definition.layout === "vertical" ? "vertical" : "horizontal"}
						></AlternateSlider>
					</Control>
				);

			},
			handleTemporaryValueUpdate: function(event) {
				value = this.__validateValue(event.target.value);
				this.setState({
					temporaryValue: value
				});
			},
			handleTemporaryValueReady: function(event) {
				this.setValue(event.target.value);
				this.setState({
					editValueMode: false
				});
			},
			enterEditValueMode: function() {
				if(!this.props.definition.disabled) {
					this.setState({
						editValueMode: true,
						temporaryValue: this.state.value
					});
				}
			},
			handleValueChange: function(event) {
				this.setValue(event.target.value);
			},
			setValue: function(value) {
				value = this.__validateValue(value);
				this._setValue(value);
			},
			__validateValue: function(value) {
				value = parseFloat(value);
				if(value < this.props.definition.min) {
					value = this.props.definition.min;
				}
				if(value > this.props.definition.max) {
					value = this.props.definition.max;
				}
				return value;
			}
		});








		var AlternateSlider = React.createClass({
			render: function() {
				var vertical = this.props.layout === "vertical" ? true : false;
				var percent = 100 * (this.props.value - this.props.min) / (this.props.max - this.props.min);
				
				var nodes = (
					<span
						className="alternate-slider alternate-input"
						data-layout={vertical ? "vertical" : "horizontal"}
						onMouseDown={this.__handleMouseDown}
						onMouseMove={this.__handleMouseMove}
					>
						<span className="lower-range"></span>
						<span className="value-knob"></span>
						<span className="higher-range"></span>
					</span>
				);

				if(vertical) {
					nodes.props.children[0].props.style={
						display: 'inline-block',
						position: 'absolute',
						top: (100-percent) + '%',
						left: 0,
						bottom: 0,
						right: 0
					};
					nodes.props.children[1].props.style = {
						display: 'block',
						position: 'absolute',
						top: (100-percent) + '%',
						right: 0,
						left: 0
					};
					nodes.props.children[2].props.style = {
						display: 'block',
						position: 'absolute',
						top: 0,
						left: 0,
						bottom: percent + '%',
						right: 0
					};
				} else {
					nodes.props.children[0].props.style={
						display: 'inline-block',
						position: 'absolute',
						top: 0,
						left: 0,
						bottom: 0,
						right: (100-percent) + '%'
					};
					nodes.props.children[1].props.style = {
						display: 'block',
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: percent + '%'
					};
					nodes.props.children[2].props.style = {
						display: 'block',
						position: 'absolute',
						top: 0,
						left: percent + '%',
						bottom: 0,
						right: 0
					};
				}

				return nodes;
			},
			__handleMouseDown: function() {
				this.__doUpdate(event);
			},
			__handleMouseMove: function(event) {
				if(mouseTracker.button1Down()) {
					this.__doUpdate();
				}
			},
			__doUpdate: function(event) {
				if(this.isMounted()) {
					var node = this.getDOMNode();
					var pos = mouseTracker.getRelativePosition(node);
					var percent;
					if(this.props.layout === "horizontal") {
						percent = pos.x / node.offsetWidth;
					} else {
						percent = (node.offsetHeight - pos.y) / node.offsetHeight;
					}
					var newValue = this.props.min + percent * (this.props.max - this.props.min);
					this.props.onChange(newValue);
				}
			}
		});

		return SliderControl;

	}
);