define(
	[
		'./base/Model'
	],
	function(
		Model
	) {


		function ModelBinder() {

		}
		ModelBinder.prototype.subscribeTo = function(modelPath,callback) {
			var model = this.lookupModel(modelPath);
			var binding = new ModelBinding(model,callback);
			binding.refresh();
			return binding;
		}
		ModelBinder.prototype.lookupModel = function(modelPath) {
			var model = new Model(
				{
					torpedos: 1000000,
					screens: [
						{
							id: 'weapons',
							display: "Weapons",
							panels: [
								{
									display: 'ammo',
									controls: [
										{
											path: 'jsx!weapons/ui/TorpedoStockControl'
										}
									]
								}
							]
						},
						{
							id: 'engineering',
							display: "Engineering",
							panels: []
						},
						{
							id: 'helm',
							display: "Helm",
							panels: []
						}
					]
				}
			);

			return model;
		}








		function ModelBinding(model,callback) {
			this.__model = model;
			this.__callback = callback;
			var binding = this;
			model.subscribeTo(function() {
				binding.refresh();
			});
		}
		ModelBinding.prototype.refresh = function() {
			this.__callback.apply(this.__model,[this.__model]);
		}





		var modelBinder = new ModelBinder();

		modelBinder.reactMixin = {
			getInitialState: function() {
				var state = {};
				if(this.modelPath) {
					var view = this;
					modelBinder.subscribeTo(this.modelPath,function(model) {
						if(view.state) {
							view.setState(model);
						} else {
							state = model;
						}
					});
				}
				return state;
			}
		};

		return modelBinder;

	}
);