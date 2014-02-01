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

		function MockUniverseDataConnection(user) {

			this._model = new MockModel();

	
			var rads = 0;
			var speed = .01;
			var planetModel = this._model.objects[1];
			var shipModel = this._model.objects[2];
			var distance = 6371000 + 100000;

			function animateShip() {

				requestAnimationFrame( animateShip );

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

			animateShip();

		}

		MockUniverseDataConnection.prototype.getModel = function() {
			return this._model;
		}




		function MockModel() {
			return new Model({
				sky: {
					type: 'box',
					textures: [
						'/spatial-ui/demo-resources/skies/space1/right1.jpg',
						'/spatial-ui/demo-resources/skies/space1/left2.jpg',
						'/spatial-ui/demo-resources/skies/space1/top3.jpg',
						'/spatial-ui/demo-resources/skies/space1/bottom4.jpg',
						'/spatial-ui/demo-resources/skies/space1/front5.jpg',
						'/spatial-ui/demo-resources/skies/space1/back6.jpg'
					]
				},
				objects: [
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
				]
			});
		}




		return MockUniverseDataConnection;

	}
);