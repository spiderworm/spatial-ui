(function() {
	var x = new XMLHttpRequest();
	x.open('GET','../../js/require-config.json',false);
	x.send();
	var config = JSON.parse(x.responseText);
	require.config(config);
	require.config({baseUrl: '../../js/'});
})();