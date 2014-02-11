define(
	[
		'react',
		'jsx!./Piece'
	],
	function(
		React,
		Piece
	) {

		var Screen = React.createClass({
			mixins: [Piece.mixin],
			getDefaultProps: function() {
				return {};
			},
			render: function() {
				return (
					<article 
						className={
							"screen" +
							(this.props.hidden ? " hidden" : "")
						}
					>
						<h1>
							<a
								className="label"
								name={this.props.definition.id}
							>
								{this.props.definition.label}
							</a>
						</h1>
						{this._getSubPieceNodes(
							this.props.definition,
							this.props.appModel,
							{
								editable: this.props.editable
							}
						)}
						{this.props.children}
					</article>
				);
			}
		});



		return Screen;

	}
);