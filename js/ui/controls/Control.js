define(
	[
		'react',
		'jsx!./Loader',
		'../util/reactKeyGenerator'
	],
	function(
		React,
		ControlLoader,
		keyGenerator
	) {

		var controlMixin = {
			getKey: function(signature) {
				return keyGenerator.mixin.getKey(signature);
			},
			getDefaultProps: function() {

				var vals = this.__findModelAndProperty();

				if(vals.model) {
					var view = this;
					var modelSubscription = vals.model.$subscribeTo(
						vals.modelPropertyName,
						function(value) {
							view.setState({
								inactiveValue: value,
								value: value
							});
						}
					);
				}

				return {
					model: vals.model,
					modelPropertyName: vals.modelPropertyName,
					modelSubscription: modelSubscription
				};

			},
			componentWillUnmount: function() {
				if(this.props.modelSubscription) {
					this.props.modelSubscription.off();
				}
			},
			_nextValue: function() {
				var allowedValues = this.__getPropertyForValue('allowedValues',this.state.value);

				if(!allowedValues) {
					return;
				}

				var first, next, foundCurrent=false;
				for(var i in allowedValues.$getKeys()) {
					if(first===undefined) {
						first = allowedValues[i];
					}
					if(foundCurrent) {
						next = allowedValues[i];
						break;
					}
					if(allowedValues[i] === this.state.value) {
						foundCurrent = true;
						continue;
					}
				}

				if(next===undefined) {
					next = first;
				}

				this._setValue(next);
			},
			_setValue: function(value) {
				if(this.props.model) {
					this.props.model[this.props.modelPropertyName] = value;
					this.props.model.$setUpdated();
				}
			},
			_getControlNode: function(children) {
				var clss = "control ";
				if(this.props.inline) {
					clss += "inline-control ";
				}
				if(this.props.className) {
					clss += this.props.className;
				}
				clss += this._getClassName();
				clss = clss.match(/^(.*[^ ]) ?$/)[1];
				if(this.props.inline) {
					return <span className={clss} title={this._getDescription()}>{children}</span>;
				} else {
					return <div className={clss} title={this._getDescription()}>{children}</div>;
				}
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
			_getSubControlNodes: function() {
				var appModel = this.props.appModel;

				var view = this;

				var subControls = this._getSubControls();

				if(subControls) {

					return this._getSubControls().$map(function(val) {
						var path=undefined, definition=undefined;

						if(typeof val === "string") {
							path = val;
						} else if(val && typeof val === "object") {
							definition = val;
						}

						return (
							<ControlLoader key={view.getKey([view,definition,path])} appModel={appModel} definition={definition} path={path}></ControlLoader>
						);
					});

				}

				return null;

			},
			_getValueDisplay: function(value) {
				if(!this.props.definition.dataPath) {
					return value;
				}
				if(this.state) {
					value = arguments.length !== 0 ? value : this.state.value;
				}
				var display = this.__getPropertyForValue('display',value) || value;

				var format = this._getDisplayFormat();
				switch(format) {
					case "%":
						return (display * 100) + "%";
					break;
					default:
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
			_getSubControls: function(value) {
				if(this.state) {
					value = arguments.length !== 0 ? value : this.state.value;
				}
				return this.__getPropertyForValue('subControls',value) || null;
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

				if(this.props.definition.valueMap) {
					for(var i in this.props.definition.valueMap) {
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
					var model = this.props.appModel.values;
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