define(
	[
		'react',
		'jsx!./Piece'
	],
	function(
		React,
		Piece
	) {

		var PanelGroup = React.createClass({

			mixins: [Piece.mixin],

			getInitialState: function() {

				var screen = this;

				var layoutCheckingInterval = setInterval(function() {
					screen.__checkLayout();
				},1000);

				return {
					gridMode: false,
					layoutCheckingInterval: layoutCheckingInterval
				};
			},

			render: function() {
				var appModel = this.props.appModel;
				var editable = this.props.editable;
				var gridMode = this.state.gridMode;

				return (
					<div
						className="panel-group"
						data-layout={gridMode ? "grid" : "default"}
					>
						{this._getSubPieceNodes(
							this.props.definition,
							this.props.appModel,
							{
								gridMode: gridMode,
								editable: editable
							}
						)}
					</div>
				);

			},

			componentWillUnmount: function() {
				clearInterval(this.state.layoutCheckingInterval);
			},

			__checkLayout: function() {
				var node = this.getDOMNode();
				var gridMode = false;
				if(node.offsetWidth > 400) {
					gridMode = true;
				}
				if(this.state.gridMode !== gridMode) {
					this.setState({
						gridMode: gridMode
					});
				}
			}

		});

		return PanelGroup;

	}
);