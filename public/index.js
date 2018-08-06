let $ = require('jquery');
let Lang = require('/lang');
let Vue = require('vue');
let io = require('/socket.io/socket.io.js');
let Utils = require('./utils');
let Cookies = require('js-cookie');

function desc (id) {
	window.location = '/markdown.kmi?target=/packages/' + id + '/README';
}

function play (id) {
	window.location = '/play.kmi?target=' + id;
}

let app = new Vue({
	el: '#app',

	data: {
		Lang: Lang(),
		Categories: require('/data/categories.json'),
		coralines: {}
	},

	methods: {
		scrollTo: Utils.scrollToAnchor,
		scrollTop: () => Utils.scrollTo(0),
		desc: desc,
		play: play
	}
});

let info = io('/info');

info.on('packages', (data) => {
	let coralines = {};

	for(let i in data) {
		let cora = data[i];
		cora.lang = Lang.load('/packages/' + i + '/lang');

		cora.categories && cora.categories.forEach((cat) => {
			if(!coralines[cat]) coralines[cat] = {};
			coralines[cat][i] = cora;
		});
	}

	app.coralines = coralines;
});

info.emit('packages');


require('./css/index.css');
require('semantic-ui');