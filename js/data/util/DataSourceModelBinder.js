define(
	[
		'../../base/Model'
	],
	function(
		Model
	) {

		function DataSourceModelBinder(dataSource) {
			this._source = dataSource;
		}
		DataSourceModelBinder.prototype.bind = function(data,model) {
			var updates = {};
			var updated = false;

			for(var i in data) {
				switch(i) {
					case "@push":
						if(!model.__pushed) {
							model.__pushed = {};
						}
						if(!model.__pushed[data[i]]) {
							model.__pushed[data[i]] = [];
						}
						model.__pushed[data[i]].unshift(model[data[i]]);
						delete model[data[i]];
						updated = true;
					break;
					case "@pop":
						if(!model.__pushed) {
							model.__pushed = {};
						}
						if(!model.__pushed[data[i]]) {
							model.__pushed[data[i]] = [];
						}
						var result = model.__pushed[data[i]].shift();
						model[data[i]] = result;
						update = true;
					break;
					case "@clear":
						if(!model.__pushed) {
							model.__pushed = {};
						}
						if(!model.__pushed[data[i]]) {
							model.__pushed[data[i]] = [];
						}
						while(model.__pushed[data[i]][0]) {
							model.__pushed[data[i]].shift();
						}
						delete model[data[i]];
						updated = true;
					break;
					case "@remove":
						delete model[data[i]];
						updated = true;
					break;
					default:
						if(data[i] && typeof data[i] === "object") {
							if(model[i] instanceof Model === false) {
								model[i] = new Model();
								updated = true;
							}
							this.bind(data[i],model[i]);
						} else {
							updates[i] = data[i];
						}
					break;
				}
			}

			if(updated) {
				model.$setUpdated(null,this._source);
			}

			model.$update(updates,this._source);

		}


		return DataSourceModelBinder;

	}
);