define(
	[
		'../../base/Model',
		'THREE',
		'THREE.GeometryExporter'
	],
	function(
		Model,
		THREE,
		THREEGeometryExporter
	) {

		var exporter = new THREEGeometryExporter();

		function MockViewportDataConnection(user) {

			this._model = new MockModel();

	
			var rads = 0;
			var speed = .01;
			var model = this._model;
			var distance = 6371000 + 100000;

			function animateShip() {

				if(model.objects) {
					var planetModel = model.objects[1];
					var shipModel = model.objects[2];

					rads += speed;

					shipModel.position.x = planetModel.position.x + distance * Math.cos(rads);
					shipModel.position.y = planetModel.position.y + distance * Math.sin(rads);
					shipModel.position.z = planetModel.position.z;
					shipModel.rotation.x = 0;
					shipModel.rotation.y = 0;
					shipModel.rotation.z = rads;

					shipModel.position.setUpdated();
					shipModel.rotation.setUpdated();

				}

				requestAnimationFrame( animateShip );

			}

			animateShip();

		}

		MockViewportDataConnection.prototype.getModel = function() {
			return this._model;
		}




		function MockModel() {
			var model = new Model();

			setTimeout(function() {
				model.sky = {
					type: 'box',
					textures: [
						'/spatial-ui/demo-resources/skies/space1/right1.jpg',
						'/spatial-ui/demo-resources/skies/space1/left2.jpg',
						'/spatial-ui/demo-resources/skies/space1/top3.jpg',
						'/spatial-ui/demo-resources/skies/space1/bottom4.jpg',
						'/spatial-ui/demo-resources/skies/space1/front5.jpg',
						'/spatial-ui/demo-resources/skies/space1/back6.jpg'
					]
				};
				model.objects = [
					{
						id: 'moon',
						geometry: exporter.parse(
							new THREE.SphereGeometry(
								1700000,80,60
							)
						),
						position: {
							x: 38500000,
							y: 0,
							z: 0
						},
						rotation: {
							x: 0,
							y: 0,
							z: 0
						},
						textures: []
					},
					{
						id: 'Teaatis',
						geometry: exporter.parse(
							new THREE.SphereGeometry(
								6371000,80,60
							)
						),
						position: {
							x: 0,
							y: 0,
							z: 0
						},
						rotation: {
							x: 0,
							y: 0,
							z: 0
						},
						textures: [
							'/spatial-ui/demo-resources/planet-maps/Teaatis/Colormap.png'
						]
					},
					{
						id: 'myShip',
						geometry: exporter.parse(
							new THREE.CubeGeometry(500,500,500)
						),
						position: {
							x: 0,
							y: 0,
							z: 0
						},
						rotation: {
							x: 0,
							y: 0,
							z: 0
						},
						textures: []
					}
				];
				model.setUpdated();
			},1000);

			return model;

		}




		return MockViewportDataConnection;

	}
);