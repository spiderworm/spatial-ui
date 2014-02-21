define(
	[
		'react',
		'jsx!../modelMixin'
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
					definition: null,
					inline: false
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
				var inline = this.props.inline;
				var definition = this.state.definition;

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
								inline: inline
							});
						}

					} else {

						if(inline) {
							return <span>Loading...</span>;
						} else {
							return <div>Loading...</div>;
						}

					}

				}

				if(inline) {
					return <span>Control "{this.state.path}" unavailable.</span>;
				} else {
					return <div>Control "{this.state.path}" unavailable.</div>;
				}

			}
		});

		return ControlLoader;

	}
);