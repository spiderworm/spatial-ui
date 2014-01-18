define(
	[
		'react',
		'jsx!./ControlLoader'
	],
	function(
		React,
		ControlLoader
	) {

		var Panel = React.createClass({
			render: function() {
				var ship = this.props.ship;

				return (
					<section class="panel">
						<h1>{this.props.display}</h1>
						{this.props.controls.map(function(control) {
							return <ControlLoader ship={ship} path={control.path} />;
						})}
						{this.props.children}
					</section>
				);
			}
		});

		return Panel;

	}
);