define(
	[
		'react',
	],
	function(
		React
	) {

		var ready = false;
		var readyHandlers = [];
		var ScreenGroup, Screen, PanelGroup, Panel, ControlGroup, ControlLoader, VisualizationLoader;

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
				'jsx!ui/ScreenGroup',
				'jsx!ui/Screen',
				'jsx!ui/PanelGroup',
				'jsx!ui/Panel',
				'jsx!ui/ControlGroup',
				'jsx!ui/controls/Loader',
				'jsx!ui/visualization/Loader'
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

				ScreenGroup = A;
				Screen = B;
				PanelGroup = C;
				Panel = D;
				ControlGroup = E;
				ControlLoader = F;
				VisualizationLoader = G;

				setReady();

			}
		);




		var Piece = React.createClass({
			getInitialState: function() {

				var piece = this;

				this.props.definition.$subscribeTo(function() {
					piece.forceUpdate();
				});

				if(!ready) {
					onReady(function() {
						if(piece.isMounted()) {
							piece.forceUpdate();
						}
					});
				}

				return {};
			},
			render: function() {

				var options = this.props.options || {};
				var editable = options.editable || false;

				if(ready) {
					switch(this.props.definition.type) {
						case "screen-group":
							return (
								<ScreenGroup
									definition={this.props.definition}
									appModel={this.props.appModel}
									editable={editable}
								></ScreenGroup>
							);
						break;
						case "screen":
							return (
								<Screen
									definition={this.props.definition}
									appModel={this.props.appModel}
									hidden={options.activeScreen !== this.props.definition}
									editable={editable}
								></Screen>
							);
						break;
						case "panel-group":
							return (
								<PanelGroup
									definition={this.props.definition}
									appModel={this.props.appModel}
									editable={editable}
								></PanelGroup>
							);
						break;
						case "panel":
							return (
								<Panel
									appModel={this.props.appModel}
									definition={this.props.definition}
									gridMode={options.gridMode || false}
									editable={editable}
								></Panel>
							);
						break;
						case "control-group":
							return (
								<ControlGroup
									appModel={this.props.appModel}
									definition={this.props.definition}
									editable={editable}
								></ControlGroup>
							);
						break;
						case "control":
							return (
								<ControlLoader
									appModel={this.props.appModel}
									definition={this.props.definition}
									editable={editable}
								></ControlLoader>
							);
						break;
						case "visualization":
							return (
								<VisualizationLoader
									definition={this.props.definition}
									appModel={this.props.appModel}
								></VisualizationLoader>
							);
						break;
					}
					console.info('couldnt figure out',this.props.definition.type,this.props.definition);
				}
				return <div className="undetermined-piece"></div>;

			}
		});





		Piece.mixin = {
			_mapSubPieces: function(definitions,callback) {
				var pieces = this._getSubPieces(definitions);

				var results = pieces.map(
					function(piece) {
						if(piece) {
							return callback(piece.definition,piece.id);
						}
					}
				);

				return results;
			},
			_getSubPieces: function(definitions) {
				var result = [];
				definitions.$map(function(definition,id) {
					if(definition && typeof(definition) === "object" && definition.$hasKey('index')) {
						result[definition.index] = {
							id: id,
							definition: definition
						};
					}
				});
				return result;
			},
			_getSubPieceNodes: function(definitionModel,appModel,options) {
				return this._mapSubPieces(definitionModel,function(definition,id) {
					return <Piece key={id} definition={definition} appModel={appModel} options={options}></Piece>;
				});
			}
		};

		return Piece;

	}
);