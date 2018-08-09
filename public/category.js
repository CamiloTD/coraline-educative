let Vue = require('vue');
let io = require('/socket.io/socket.io.js');
let info = io('/info');
let Lang = require('/lang');

let category = window.location.href.substring(window.location.href.indexOf("category=") + 9);
let app;

info.on('packages', (data) => {
	let packages = {};
	let is_empty = true;

	for(let i in data) {
		let cora = data[i];

		if(cora.categories && cora.categories.indexOf(category) !== -1) {
			cora.lang = Lang.load('/packages/' + i + '/lang');
			packages[i] = cora;
			is_empty = false;
		}
	}

	app = new Vue({
		el: '#app',
		data: { category, packages, is_empty, Lang: Lang() }
	});
});

info.emit('packages');
require('semantic-ui');
require('./css/category.css');
require('./css/base.css');