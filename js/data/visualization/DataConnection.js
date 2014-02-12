define(
	[
		'../base/DataConnection',
		'../../base/Model',
		'../util/comm',
		'../../registry'
	],
	function(
		DataConnection,
		Model,
		comm,
		registry
	) {

		var scale = registry.get('3D-scale');

		function VisualizationDataConnection(user) {
			DataConnection.apply(this);
		}
		VisualizationDataConnection.prototype = new DataConnection();
		VisualizationDataConnection.prototype.loadModel = function(url,callback) {
			var connection = this;
			comm.ajax(
				url,
				function(response) {
					response = JSON.parse(response);
					response = connection.__scaleResponse(response);

					var model = new Model(response);
					callback.apply(connection,[model]);

				}
			);
		}
		VisualizationDataConnection.prototype.__scaleResponse = function(response) {
			if(response.position) {
				response.position.x *= scale;
				response.position.y *= scale;
				response.position.z *= scale;
			}

			if(response.hasOwnProperty('scale')) {
				response.scale *= scale;
			}

			if(response.hasOwnProperty('geometry') && !response.hasOwnProperty('scale')) {
				response.scale = scale;
			}

			if(response.objects) {
				for(var i=0; i<response.objects.length; i++) {
					response.objects[i] = this.__scaleResponse(response.objects[i]);
				}
			}

			return response;
		}



		DataConnection.extend(VisualizationDataConnection);


		return VisualizationDataConnection;

	}
);