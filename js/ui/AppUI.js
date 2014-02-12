define(
	[
		'react',
		'jsx!./Piece',
		'../base/Model'
	],
	function(
		React,
		Piece,
		Model
	) {

		var AppUI = React.createClass({
			mixins: [Piece.mixin],
			getDefaultProps: function() {
				var view = this;

				this.props.model.$subscribeTo('ui',function(model) {
					if(model instanceof Model) {
						this.$subscribeTo(function() {
							view.forceUpdate();
						});
					}
				});

				return {};
			},
			render: function() {
				return (
					<main className="spatial-master">
						{
							this.props.model.ui &&
							this._getSubPieceNodes(this.props.model.ui,this.props.model)
						}
					</main>
				);
			}
		});

		return AppUI;

	}
);