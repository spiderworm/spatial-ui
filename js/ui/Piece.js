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

		function checkReady() {
			if(ScreenGroup && Screen && PanelGroup && Panel && ControlGroup && ControlLoader && VisualizationLoader) {
				setReady();
			}
		}

		function setReady() {
			ready = true;
			for(var i=0; i<readyHandlers.length; i++) {
				readyHandlers[i]();
			}
		}

		function onReady(callback) {
			readyHandlers.push(callback);
		}

		require(['jsx!ui/ScreenGroup'],function(module) {
			ScreenGroup = module; checkReady();
		});
		require(['jsx!ui/Screen'],function(module) {
			Screen = module; checkReady();
		});
		require(['jsx!ui/PanelGroup'],function(module) {
			PanelGroup = module; checkReady();
		});
		require(['jsx!ui/Panel'],function(module) {
			Panel = module; checkReady();
		});
		require(['jsx!ui/ControlGroup'],function(module) {
			ControlGroup = module; checkReady();
		});
		require(['jsx!ui/controls/Loader'],function(module) {
			ControlLoader = module; checkReady();
		});
		require(['jsx!ui/visualization/Loader'],function(module) {
			VisualizationLoader = module; checkReady();
		});


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
									user={this.props.user}
									editable={editable}
								></ScreenGroup>
							);
						break;
						case "screen":
							return (
								<Screen
									definition={this.props.definition}
									appModel={this.props.appModel}
									user={this.props.user}
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
									user={this.props.user}
									editable={editable}
								></PanelGroup>
							);
						break;
						case "panel":
							return (
								<Panel
									appModel={this.props.appModel}
									definition={this.props.definition}
									user={this.props.user}
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
									user={this.props.user}
									editable={editable}
								></ControlGroup>
							);
						break;
						case "control":
							return (
								<ControlLoader
									appModel={this.props.appModel}
									definition={this.props.definition}
									user={this.props.user}
									editable={editable}
								></ControlLoader>
							);
						break;
						case "visualization":
							return (
								<VisualizationLoader
									definition={this.props.definition}
									appModel={this.props.appModel}
									user={this.props.user}
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
					if(definition && typeof(definition) === "object") {
						result.push({
							id: id,
							definition: definition
						});
					}
				});
				return result;
			},
			_getSubPieceNodes: function(definitionModel,appModel,options) {
				var user = this.props.user;
				return this._mapSubPieces(definitionModel,function(definition,id) {
					return <Piece key={id} definition={definition} appModel={appModel} options={options} user={user}></Piece>;
				});
			}
		};

		return Piece;

	}
);