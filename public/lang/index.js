let Lang = require('./en.json');
let browser_lang = (navigator.language || navigator.userLanguage).substring(0, 2);

try {
	let lang = require('./' + browser_lang + '.json');

	merge(Lang, lang);
} catch (exc) {
}

function merge(tar, src) {
	for(let i in src) {
		if(typeof src === typeof tar && typeof src === "object") merge(tar[i], src[i]);
		else tar[i] = src[i];
	}
}

module.exports = Lang;