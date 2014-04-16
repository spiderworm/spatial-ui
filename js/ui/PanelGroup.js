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

				var panelGroup = this;

				var layoutCheckingInterval = setInterval(function() {
					panelGroup.__checkLayout();
				},1000);

				return {
					gridMode: false,
					layoutCheckingInterval: layoutCheckingInterval
				};
			},

			render: function() {
				var panelGroup = this;
				setTimeout(function() {
					panelGroup.__checkLayout();
				},0);

				var appModel = this.props.appModel;
				var editable = this.props.editable;
				var gridMode = true;

				return (
					<div
						className="panel-group"
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
				if(this.isMounted()) {
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
			}

		});

		return PanelGroup;

	}
);