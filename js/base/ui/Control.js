define(
	[
		'react',
		'./ControlLoader'
	],
	function(
		React,
		ControlLoader
	) {

		var controlMixin = {
			getDefaultProps: function() {

				var vals = this.__findModelAndProperty();

				if(vals.model) {
					var view = this;
					vals.model.subscribeTo(
						vals.modelPropertyName,
						function(value) {
							view.setState({value: value});
						}
					);
				}

				return {
					model: vals.model,
					modelPropertyName: vals.modelPropertyName
				};

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
			_getControlNode: function(children) {
				var className = "control " + this._getClassName();
				className = className.match(/^(.*[^ ]) ?$/)[0];
				if(this.props.inline) {
					return <span className={className}>{children}</span>;
				} else {
					return <div className={className}>{children}</div>;
				}
			},
			_getLabelTextNode: function() {
				return (
					<span title={this._getDescription()}>
						{this._getLabel()}
					</span>
				);
			},
			_getSubControlNodes: function() {
				var baseModel = this.props.baseModel;

				return this._getSubControls().map(function(val) {
					var path=undefined, definition=undefined;

					if(typeof val === "string") {
						path = val;
					} else if(val && typeof val === "object") {
						definition = val;
					}

					return (
						<ControlLoader baseModel={baseModel} definition={definition} path={path}></ControlLoader>
					);
				});

			},
			_getValueDisplay: function(value) {
				if(this.state) {
					value = arguments.length !== 0 ? value : this.state.value;
				}
				return this.__getPropertyForValue('display',value) || value;
			},
			_getClassName: function(value) {
				if(this.state) {
					value = arguments.length !== 0 ? value : this.state.value;
				}
				return this.__getPropertyForValue('className',value) || "";
			},
			_getDescription: function(value) {
				if(this.state) {
					value = arguments.length !== 0 ? value : this.state.value;
				}
				return this.__getPropertyForValue('description',value) || "";
			},
			_getLabel: function(value) {
				if(this.state) {
					value = arguments.length !== 0 ? value : this.state.value;
				}
				return this.__getPropertyForValue('label',value) || "";
			},
			_getSubControls: function(value) {
				if(this.state) {
					value = arguments.length !== 0 ? value : this.state.value;
				}
				return this.__getPropertyForValue('subControls',value) || [];
			},
			__getPropertyForValue: function(property,value) {
				var map = this.__getValueMap(value);
				if(map && map.hasOwnProperty(property)) {
					return map[property];
				}
				if(this.props.definition.hasOwnProperty(property)) {
					return this.props.definition[property];
				}
				return null;
			},
			__getValueMap: function(value) {

				if(this.props.definition.valueMap) {
					for(var i=0; i<this.props.definition.valueMap.length; i++) {
						if(this.props.definition.valueMap[i].value === value) {
							return this.props.definition.valueMap[i];
						}
					}
				}

				return null;

			},
			__findModelAndProperty: function() {

				var result = {
					model: null,
					modelPropertyName: null
				}

				if(this.props.definition.dataPath) {

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

					result.model = model;
					result.modelPropertyName = propertyName;
				}

				return result;
			}
		};


		var Control = React.createClass({
			mixins: [controlMixin],
			render: function() {
				var contents = (
					<label>
						{this._getLabelTextNode()}
						{this.props.children}
					</label>
				);
				var subControls = this._getSubControlNodes();
				return this._getControlNode([contents,subControls]);
			}
		});

		Control.mixin = controlMixin;

		Control.supportsDefinition = function(definition) {
			return definition && typeof definition === "object";
		}

		return Control;

	}
);