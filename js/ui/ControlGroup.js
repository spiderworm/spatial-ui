define(
	[
		'react',
		'jsx!./Piece'
	],
	function(
		React,
		Piece
	) {

		var ControlGroup = React.createClass({

			render: function() {
				var appModel = this.props.appModel;
				var editable = this.props.editable;

				return (
					<div
						className="control-group"
					>
						{this.props.definition.$map(function(definition) {
							if(typeof definition === "object") {
								return (
									<Piece
										definition={definition}
										appModel={appModel}
										editable={editable}
									></Piece>
								);
							}
						})}
					</div>
				);

			}

		});

		return ControlGroup;

	}
);