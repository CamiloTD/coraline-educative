let Vue = require('vue');
let io = require('/socket.io/socket.io.js');
let info = io('/info');
let Lang = require('/lang');

function desc (id) { window.location = '/markdown.kmi?target=/packages/' + id + '/README';}
function play (id) { window.location = '/play.kmi?target=' + id; }

let category = window.location.href.substring(window.location.href.indexOf("category=") + 9);
let app = new Vue({
	el: '#app',
	data: {
		is_empty: false,
		Lang: Lang(),
		category: category,
		packages: {}
	},
	
	methods: { play, desc }
});

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

	app.packages = packages;
	app.is_empty = is_empty;
});

info.emit('packages');

require('semantic-ui');
require('./css/category.css');