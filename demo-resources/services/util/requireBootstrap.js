
function requireBoostrap(jsPath) {
	importScripts(jsPath + '/require-config.js');
	importScripts(jsPath + '/external/require.js');
	require.config({
		baseUrl: jsPath + '/'
	});
}
