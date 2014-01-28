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
				var baseModel = this.props.ship;
				var user = this.props.user;

				return (
					<section className="panel">
						<h1>{this.props.display}</h1>
						{this.props.controls.map(function(control) {
							return <ControlLoader baseModel={baseModel} path={control.path} user={user} />;
						})}
						{this.props.children}
					</section>
				);
			}
		});

		return Panel;

	}
);