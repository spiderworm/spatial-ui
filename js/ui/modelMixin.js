define(
	[
		'react',
		'../base/Model'
	],
	function(
		React,
		Model
	) {

		var modelMixin = {
			_deepSubscribeTo: function(model,path,callback) {
				var mixin = this;
				if(!path) debugger;
				var matches = path.match(/^\/?([^\/]*)(?:\/(.*))?$/);
				if(matches) {
					var nextPath = matches[1];
					var nextNextPath = matches[2];
					return model.$subscribeTo(
						nextPath,
						function(subModel) {
							if(nextNextPath) {
								if(subModel instanceof Model) {
									mixin._deepSubscribeTo(subModel,nextNextPath,callback);
								}
							} else {
								callback(subModel);
							}
						}
					);
				}

			},
			_deepSetValue: function(model,path,value) {
				var nodes = path.split('/');
				while(nodes.length > 1) {
					var node = nodes.shift();
					if(node === ""){
						continue;
					}
					if(!model[node]) {
						model[node] = {};
						model.$setUpdated();
					}
					model = model[node];
				}
				model[nodes[0]] = value;
				model.$setUpdated();
			},
			_deepPing: function(model,path,value) {
				var nodes = path.split('/');
				while(nodes.length > 1) {
					var node = nodes.shift();
					if(node === ""){
						continue;
					}
					if(!model[node]) {
						model[node] = {};
						model.$setUpdated();
					}
					model = model[node];
				}
				var ping = {};
				ping[nodes[0]] = value;
				model.$ping(ping);
			},
			__subscriptions: []
		};

		return modelMixin;

	}
)