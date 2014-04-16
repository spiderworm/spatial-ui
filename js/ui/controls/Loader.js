define(
	[
		'react',
		'../modelMixin'
	],
	function(
		React,
		modelMixin
	) {


		var ready = false;
		var readyHandlers = [];
		var SliderControl, ButtonControl, CheckboxControl, SelectControl, MultiControl, TextControl, OutputControl;

		function setReady() {
			ready = true;
			for(var i=0; i<readyHandlers.length; i++) {
				readyHandlers[i]();
			}
		}

		function onReady(callback) {
			readyHandlers.push(callback);
		}


		require(
			[
				'jsx!ui/controls/Slider',
				'jsx!ui/controls/Button',
				'jsx!ui/controls/Checkbox',
				'jsx!ui/controls/Select',
				'jsx!ui/controls/Multi',
				'jsx!ui/controls/Text',
				'jsx!ui/controls/Output'
			],
			function(
				A,
				B,
				C,
				D,
				E,
				F,
				G
			) {

				SliderControl = A;
				ButtonControl = B;
				CheckboxControl = C;
				SelectControl = D;
				MultiControl = E;
				TextControl = F;
				OutputControl = G;

				setReady();
			}
		);


		var ControlLoader = React.createClass({
			mixins: [modelMixin],
			getDefaultProps: function() {

				if(!ready) {
					var loader = this;
					onReady(function() {
						loader.forceUpdate();
					});
				}

				return {
					path: '',
					definition: null
				};
				
			},
			getInitialState: function() {

				var view = this;

				if(this.props.definition) {

					this._deepSubscribeTo(
						this.props.definition,
						'path',
						function(path) {
							if(path) {
								view.setState({
									path: path
								});
								view._deepSubscribeTo(
									view.props.appModel,
									path,
									function(definition) {
										view.setState({
											definition: definition
										});
									}
								);


							}
						}
					);

				}

				return {
					path: this.props.path || '',
					definition: this.props.definition
				};

			},
			render: function() {

				var appModel = this.props.appModel;
				var definition = this.state.definition;

				var x = this.props.definition.x || 0;
				var y = this.props.definition.y || 0;
				var z = this.props.definition.z || 1;
				var width = this.props.definition.width || 8;
				var height = this.props.definition.height || 2;

				var style = {
					left: x + 'cm',
					top: y + 'cm',
					zIndex: z,
					width: width + 'cm',
					height: height + 'cm'
				};

				if(definition) {

					if(ready) {

						var Constructor;
						switch(definition.subtype) {
							case "text":
								Constructor = TextControl;
							break;
							case "range":
								Constructor = SliderControl;
							break;
							case "button":
								Constructor = ButtonControl;
							break;
							case "multi":
								Constructor = MultiControl;
							break;
							case "drop-list":
								Constructor = SelectControl;
							break;
							case "checkbox":
								Constructor = CheckboxControl;
							break;
							case "output":
							default:
								Constructor = OutputControl;
							break;
						}

						if(Constructor) {
							return Constructor({
								definition: definition,
								appModel: appModel,
								user: this.props.user,
								style: style
							});
						}

					} else {

						return <div style={style}>Loading...</div>;

					}

				}

				return <div style={style}>Control "{this.state.path}" unavailable.</div>;

			}
		});

		return ControlLoader;

	}
);