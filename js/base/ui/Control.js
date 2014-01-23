define(
	[
		'react'
	],
	function(
		React
	) {

		var Control = React.createClass({
			render: function() {
				return (
					<div
						className={
							"control" + (this.props.className ? " " + this.props.className : "")
						}
					>
						{this.props.children}
					</div>
				);
			}
		});

		Control.mixin = {
			getDefaultProps: function() {

				var vals = this.__findModelAndProperty();

				var view = this;
				vals.model.subscribeTo(
					vals.modelPropertyName,
					function(value) {
						view.setState({value: value});
					}
				);

				return vals;

			},
			_nextValue: function() {
				if(!this.props.definition.allowedValues) {
					return;
				}

				var i=0;
				while(i < this.props.definition.allowedValues.length) {
					if(this.props.definition.allowedValues[i] === this.state.value) {
						break;
					}
					i++;
				}

				i++;
				if(i > this.props.definition.allowedValues.length - 1) {
					i = 0;
				}

				this._setValue(this.props.definition.allowedValues[i]);
			},
			_setValue: function(value) {
				this.props.model[this.props.modelPropertyName] = value;
				this.props.model.setUpdated();
			},
			_getValueOutput: function(value) {
				value = arguments.length !== 0 ? value : this.state.value;
				var output = value;
				if(this.props.definition.valuesMap) {
					for(var i=0; i<this.props.definition.valuesMap.length; i++) {
						if(this.props.definition.valuesMap[i].value === value) {
							output = this.props.definition.valuesMap[i].label;
							break;
						}
					}
				}
				return output;
			},
			__findModelAndProperty: function() {

				var propertyName = this.props.definition.dataPath;
				var model = this.props.baseModel;
				var matches;

				do {
					matches = propertyName.match(/^([^\/]*)\/(.*)$/);
					if(matches) {
						model = model[matches[1]];
						propertyName = matches[2];
					}
				} while(matches);

				return {
					model: model,
					modelPropertyName: propertyName
				};

			}
		};

		Control.supportsDefinition = function(definition) {
			return definition && definition.dataPath;
		}

		return Control;

	}
);