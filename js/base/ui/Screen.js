define(
	[
		'react',
		'jsx!./Panel'
	],
	function(
		React,
		Panel
	) {

		var Screen = React.createClass({
			render: function() {
				var ship = this.props.ship;
				return (
					<article class="screen">
						<h1>
							<a name={"#" + this.props.id}>{this.props.display}</a>
						</h1>
						{this.props.panels.map(function(panel) {
							return <Panel ship={ship} display={panel.display} controls={panel.controls}></Panel>;
						})}
						{this.props.children}
					</article>
				);
			}
		});

		return Screen;

	}
);