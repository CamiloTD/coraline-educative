let browser_lang = (navigator.language || navigator.userLanguage).substring(0, 2);

function loadLang (base_folder, primary_lang = browser_lang) {
	let Lang = {};

	try {
		Lang = require(base_folder + '/en.json');
		let lang = require(base_folder + '/' + primary_lang + '.json');
		merge(Lang, lang);

	} catch (exc) {
	}

	return Lang;
}

function merge(tar, src) {
	for(let i in src) {
		if(typeof src[i] === typeof tar[i] && typeof src[i] === "object") merge(tar[i], src[i]);
		else tar[i] = src[i];
	}
}

let Lang = loadLang('.', browser_lang);

exports = module.exports = () => Lang;
exports.load = loadLang;
