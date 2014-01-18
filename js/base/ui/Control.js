define(
	[
		'react'
	],
	function(
		React
	) {

		var Control = React.createClass({
			render: function() {
				return (
					<div
						className={
							"control" + (this.props.className ? " " + this.props.className : "")
						}
					>
						{this.props.children}
					</div>
				);
			}
		});

		return Control;

	}
);