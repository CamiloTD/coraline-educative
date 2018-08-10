let $ = require('jquery');
let Lang = require('/lang');
let Vue = require('vue');
let io = require('/socket.io/socket.io.js');
let info = io('/info');
let Categories = require('/data/categories.json');
let Utils = require('./utils');
			require('/css/base.css');
			require('/components/intro')();

let app = new Vue({
	el: '#app',

	data: {
		Lang: Lang(),
		Categories: require('/data/categories.json'),
		coralines: {},
		package_count: {}
	},

	methods: {
		scrollTo: Utils.scrollToAnchor,
		scrollTop: () => Utils.scrollTo(0)
	}
});


info.on('packages', (data) => {
	let package_count = {};
	
	Categories.forEach((c) => package_count[c] = 0);

	for(let i in data) {
		let cora = data[i];

		cora.categories.forEach((cat) => package_count[cat]++);
	}

	app.package_count = package_count;
});

info.emit('packages');

require('semantic-ui');
require('/css/index.css');