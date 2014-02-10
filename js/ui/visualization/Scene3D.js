define(
	[
		'THREE',
		'./BaseObject3D',
		'./Sky3D',
		'./Object3D',
		'../../util/InstanceStore'
	],
	function(
		THREE,
		BaseObject3D,
		Sky3D,
		Object3D,
		InstanceStore
	) {

		function Scene3D(model,camera) {

			this.__kids = [];

			var threeScene = new THREE.Scene();
			BaseObject3D.apply(this,[threeScene,camera]);

			var scene = this;

			model.$subscribeTo(function() {
				if(model.sky) {
					var sky = new Sky3D(model.sky);
					scene.add(sky);
				}
				if(model.objects) {
					model.objects.$each(function(objectDefinition) {
						var obj = new Object3D(objectDefinition,camera);
						if(objectDefinition.id === "myShip") {
							obj.add(camera);
							camera.__ship = obj;
						}
						scene.add(obj);
						obj.onReplaceNeeded(function(oldTHREE,newTHREE) {
							scene.getTHREE().remove(oldTHREE);
							scene.getTHREE().add(newTHREE);
						});
					});
				}

			});

		}

		Scene3D.prototype = new BaseObject3D();

		Scene3D.prototype.add = function(obj) {
			var three = obj.getTHREE ? obj.getTHREE() : obj;
			if(three.parent !== this.getTHREE()) {
				this.__kids.push(obj);
				BaseObject3D.prototype.add.apply(this,arguments);
			}
		}

		Scene3D.prototype.remove = function(obj) {
			var three = obj.getTHREE ? obj.getTHREE() : obj;
			if(three.parent === this.getTHREE()) {
				var i = this.__kids.indexOf(obj);
				if(i !== -1) {
					this.__kids.splice(i,1);
				}
				BaseObject3D.prototype.remove.apply(this,arguments);
			}
		}

		Scene3D.prototype.start = function(canvas) {
			this.__renderer = new THREE.WebGLRenderer({canvas:canvas, alpha: true});

			var scene = this;

			function draw() {

				requestAnimationFrame( draw );
				scene.__renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );
				scene.getCamera().getTHREE().aspect = canvas.offsetWidth / canvas.offsetHeight;
				scene.getCamera().getTHREE().updateProjectionMatrix();

				for(var i=0; i<scene.__kids.length; i++) {
					if(scene.__kids[i].prepareForRender) {
						scene.__kids[i].prepareForRender();
					}
				}

				scene.__renderer.render(
					scene.getTHREE(),
					scene.getCamera().getTHREE()
				);

			}

			draw();

		}

		return Scene3D;

	}
);