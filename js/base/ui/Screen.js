define(
	[
		'react',
		'jsx!./Section'
	],
	function(
		React,
		Section
	) {

		var Screen = React.createClass({
			render: function() {
				var ship = this.props.ship;
				var user = this.props.user;
				return (
					<article className="screen">
						<h1>
							<a name={"#" + this.props.id}>{this.props.display}</a>
						</h1>
						{this.props.sections.map(function(section) {
							return <Section ship={ship} user={user} display={section.display} panels={section.panels}></Section>;
						})}
						{this.props.children}
					</article>
				);
			}
		});

		return Screen;

	}
);