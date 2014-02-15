define(
	function() {



		var urlUtil = {

			getQueryValues: function() {
				var result = {};

				var str = document.location.search.substring(1);
				if(str !== "") {
					var all = str.split("&");
					for(var i=0; i<all.length; i++) {
						var pair = all[i].split("=");
						var name = pair[0];
						var value = pair[1] || null;
						if(value === "false") {
							value = false;
						}
						else if(value === "true") {
							value = true;
						}
						else {
							value = decodeURIComponent(value);
						}
						result[name] = value;
					}
				}

				return result;
			}


		};


		return urlUtil;

	}
);