define(
	function() {

		var dataUtil = {
			dataHasProp: function(data,path) {
				var result = this.delve(data,path);
				return result && result.data.hasOwnProperty(result.prop);
			},
			getValue: function(data,path) {
				var result = this.delve(data,path);
				if(result && result.data.hasOwnProperty(result.prop)) {
					return result.data[result.prop];
				}
			},
			update: function(data,update) {

				function delve(data,update) {
					for(var i in update) {
						if(update.hasOwnProperty(i)) {
							if(typeof update[i] === "object") {
								if(typeof data[i] !== "object") {
									data[i] = {};
								}
								delve(data[i],update[i]);
							} else {
								data[i] = update[i];
							}
						}
					}
				}

				delve(data,update);

			},
			updatePath: function(data,path,value) {

				var prop = path;
				var paths = path.split('/');

				while(paths.length > 0) {
					path = paths.shift();
					if(path !== "") {
						prop = path;
						if(paths.length !== 0) {
							if(!data[path]) {
								data[path] = {};
							}
							data = data[path];
						}
					}
				}

				data[prop] = value;

			},
			delve: function(data,path) {

				var prop = path;
				var paths = path.split('/');
				while(paths.length > 0) {
					path = paths.shift();
					if(path !== "") {
						prop = path;
						if(paths.length !== 0) {
							if(data[path]) {
								data = data[path];
							} else {
								return undefined;
							}
						}
					}
				}

				return {data: data, prop: prop};

			},
			clone: function(data) {
				if(data && typeof data === "object") {
					var result = {};
					for(var i in data) {
						if(data.hasOwnProperty(i)) {
							if(typeof data[i] === "object") {
								result[i] = this.clone(data[i]);
							} else {
								result[i] = data[i];
							}
						}
					}
					return result;
				}
				return data;
			}
		};

		return dataUtil;

	}
);