
var response = "\
{\
	\"connectionDefinitions\": {\
		\"controls\": {\
			\"url\": \"demo-resources/services/controls.json\",\
			\"type\": \"ajax\",\
			\"format\": \"json\"\
		},\
		\"values\": {\
			\"url\": \"demo-resources/services/values/websocket.osc.js\",\
			\"type\": \"websocket\",\
			\"format\": \"osc\"\
		},\
		\"ui\": {\
			\"url\": \"demo-resources/services/ui/websocket.osc.js\",\
			\"type\": \"websocket\",\
			\"format\": \"osc\"\
		},\
		\"camera1\": {\
			\"url\": \"demo-resources/services/visualization/camera1/websocket.json.js\",\
			\"type\": \"websocket\",\
			\"format\": \"json\"\
		}\
	}\
}\
";

self.postMessage(response);
