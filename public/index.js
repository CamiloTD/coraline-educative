let $ = require('jquery');
let Lang = require('/lang');
let Vue = require('vue');
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

require('./css/index.css');
require('semantic-ui');