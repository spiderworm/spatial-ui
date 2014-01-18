define(
	[
		'react',
		'./weapons/data/connectionFactory',
		'jsx!./ui/Master'
	],
	function(
		React,
		weaponsDataConnectionFactory,
		MasterUI
	) {

		function App() {
			var dataConnection = weaponsDataConnectionFactory.getConnection(true);
			var model = dataConnection.getModel();

			setInterval(function() {
				model.torpedos++;
				model.setUpdated();
			});

			React.renderComponent(
				MasterUI({}),
				document.body
			);
		}

		return App;

	}

);