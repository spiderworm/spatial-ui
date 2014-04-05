define(
	[
		'react',
		'jsx!./Control'
	],
	function(
		React,
		Control
	) {


		var SubmitButton = React.createClass({
			render: function() {
				return (
					<button type="button" onClick={this.__handleClicked}>
						{this.props.definition.display}
					</button>
				);
			},
			__handleClicked: function(e) {
				if(this.props.onClick) {
					this.props.onClick(e);
				}
			}
		});






		var TextControl = React.createClass({
			mixins: [Control.mixin],
			getInitialState: function() {
				return {
					value: ""
				};
			},
			render: function() {
				return (
					<Control className="text-control" definition={this.props.definition} appModel={this.props.appModel} inline={this.props.inline}>
						<input
							type="text"
							value={this._getValueDisplay(this.state.inactiveValue)}
							placeholder={this._getPlaceholderText()}
							onChange={this.handleTemporaryValueUpdate}
							size={
								this._getSize() ?
								this._getSize() :
								""
							}
						></input>
						{
							this.props.definition.submitButton ?
							<SubmitButton
								definition={this.props.definition.submitButton}
								onClick={this.__handleSubmitted}
							></SubmitButton>
							:
							""
						}
					</Control>
				);

			},
			handleTemporaryValueUpdate: function(event) {
				if(this._liveEditEnabled()) {
					this._setValue(event.target.value);
				}
				this.setState({
					inactiveValue: this._getValueDisplay(event.target.value)
				});
			},
			_getPlaceholderText: function() {
				return this.props.definition.placeholder || "";
			},
			__handleSubmitted: function() {
				this._setValue(this.state.inactiveValue);
			}
		});

		return TextControl;

	}
);