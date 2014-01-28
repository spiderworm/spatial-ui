define(
	[
		'react',
		'jsx!./Panel'
	],
	function(
		React,
		Panel
	) {

		var Section = React.createClass({
			render: function() {
				var ship = this.props.ship;
				var user = this.props.user;
				return (
					<div className="section">
						{this.props.panels.map(function(panel) {
							return <Panel ship={ship} user={user} display={panel.display} controls={panel.controls}></Panel>;
						})}
						{this.props.children}
					</div>
				);
			}
		});

		return Section;

	}
);