define(
	[
		'react',
		'jsx!../Piece',
		'../util/reactKeyGenerator',
		'../modelMixin',
		'./util/ValueManager'
	],
	function(
		React,
		Piece,
		keyGenerator,
		modelMixin,
		ValueManager
	) {














		var controlMixin = {
			mixins: [modelMixin],
			getKey: function(signature) {
				return keyGenerator.mixin.getKey(signature);
			},
			getDefaultProps: function() {
				var view = this;

				this._valueManager = new ValueManager(
					this.props.definition,
					this.props.appModel,
					this.props.user,
					function(value) {

						if(!view.state || value !== view.state.value) {
							view.setState({
								value: value
							});
							if(view.state.inactiveValue === undefined) {
								view.setState({
									inactiveValue: value
								});
							}
						}

					}
				);

				return {};

			},
			_nextValue: function() {
				var value = this.state.value;

				var allowedValues = this.__getPropertyForValue('allowedValues',this.state.value);

				if(allowedValues) {

					var first, foundCurrent=false, set=false;
					for(var i in allowedValues.$getKeys()) {
						if(first===undefined) {
							first = allowedValues[i];
						}
						if(foundCurrent) {
							value = allowedValues[i];
							set = true;
							break;
						}
						if(allowedValues[i] === this.state.value) {
							foundCurrent = true;
							continue;
						}
					}

					if(!set) {
						value = first;
					}

				}

				this._setValue(value);
			},
			_setValue: function(value) {
				var message = this.__getPropertyForValue('message',value);
				if(message) {
					if(this.props.definition.valuePath) {
						this._deepPing(
							this.props.appModel,
							this.props.definition.valuePath,
							message,
							this.props.user
						);
					} else {
						this.props.definition.$ping({value: value},this.props.user);
					}
				} else {
					this.setState({value: value});
					this._valueManager.userUpdatedValue(value);
				}
			},
			_getControlNode: function(children) {
				var clss = "control ";
				if(this.props.className) {
					clss += this.props.className;
				}
				clss += this._getClassName();
				clss = clss.match(/^(.*[^ ]) ?$/)[1];
				return (
					<div
						className={clss}
						title={this._getDescription()}
						data-layout={this.props.layout}
						style={this.props.style}
					>
						{children}
					</div>
				);
			},
			_getLabelTextNode: function() {
				if(!this._getLabel() || this._getLabel().length === 0) {
					return "";
				}
				return (
					<span className="label-text">
						{this._getLabel()}
					</span>
				);
			},
			_getValueDisplay: function(value) {
				value = arguments.length > 0 ? value : this.state.value;
				
				var display = this.__getPropertyForValue('display',value) || value;

				var format = this._getDisplayFormat();
				switch(format) {
					case "%":
						return (display * 100).toFixed(0) + "%";
					break;
					default:
						if(typeof display === "number") {
							display = display.toFixed(2);
						}
						return display;
					break;
				}
			},
			_getDisplayFormat: function(value) {
				if(this.state) {
					value = arguments.length !== 0 ? value : this.state.value;
				}
				return this.__getPropertyForValue('format',value) || null;
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
			_getSize: function(value) {
				if(this.state) {
					value = arguments.length !== 0 ? value : this.state.value;
				}
				return this.__getPropertyForValue('size',value) || null;
			},
			_isDisabled: function(value) {
				if(this.state) {
					value = arguments.length !== 0 ? value : this.state.value;
				}
				return this.__getPropertyForValue('disabled',value) || false;
			},
			_liveEditEnabled: function(value) {
				if(this.state) {
					value = arguments.length !== 0 ? value : this.state.value;
				}
				var canLiveEdit = this.__getPropertyForValue('liveEdit',value);
				if(canLiveEdit === null) canLiveEdit = true;
				return canLiveEdit;
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
				var result = null;
				
				if(this.props.definition.valueMap) {
					var valueMap = this.props.valueMap;
					this.props.definition.valueMap.$each(function(map) {
						if(map.value === value) {
							result = map;
						}
					});
				}

				return result;

			},
			__findModelAndProperty: function() {

				var result = {
					model: null,
					modelPropertyName: null
				}

				if(this.props.definition.valuePath) {

					var propertyName = this.props.definition.valuePath;
					var model = this.props.appModel;
					var matches;

					do {
						matches = propertyName.match(/^\/?([^\/]*)\/(.*)$/);
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
				var labelText = this._getLabelTextNode();

				var contents = (
					<label data-label-text={labelText ? "true" : "false"}>
						{labelText}
						{this.props.children}
					</label>
				);
				return this._getControlNode([contents]);
			}
		});

		Control.mixin = controlMixin;

		return Control;

	}
);