define(
	[
		'../base/Model'
	],
	function(
		Model
	) {

		function ModelUtil(){
			this.__rootModel = null;
		}

		ModelUtil.prototype.setRootModel = function(model) {
			this.__rootModel = model;
		}

		ModelUtil.prototype.subscribeTo = function(model,path,callback) {
			var modelUtil = this;
			var info = this.__resolvePath(model,this.__rootModel,path);
			return info.model.$subscribeTo(
				info.property,
				function(subModel) {

					if(!info.remainingPath) {

						if(subModel instanceof Model && subModel['.data']) {
							var newPath = subModel['.data'];
							modelUtil.subscribeTo(subModel,newPath,callback);
						} else {
							callback(subModel);
						}

					} else {

						if(subModel instanceof Model) {
							var newPath = info.remainingPath;
							if(subModel['.data']) {
								var data = subModel['.data'];
								if(data[data.length - 1] !== "/") {
									data += "/";
								}
								newPath = data + newPath;
							}
							modelUtil.subscribeTo(subModel,newPath,callback);
						}

					}

				}
			);
		}

		ModelUtil.prototype.__resolvePath = function(relativeModel,absoluteModel,path) {
			var result = {
				model: relativeModel,
				property: path,
				remainingPath: undefined
			};
			var matches = path.match(/^(\/)?([^\/]+)(?:\/(.*))?$/);
			if(matches) {
				if(matches[1]) {
					result.model = absoluteModel;
				}
				result.property = matches[2];
				result.remainingPath = matches[3];
			}
			return result;
		}


		var modelUtil = new ModelUtil();
		return modelUtil;

	}
);