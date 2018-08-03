const CORALINE_DIR = '/packages';

function getCoralineResources (name) {
	let path = CORALINE_DIR + '/' + name;
	let avatar = require(path + '/avatar.png');

	return {
		avatar
	}
}

exports.getCoralineResources = getCoralineResources;