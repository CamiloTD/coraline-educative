let $ = require('jquery');
let Lang = require('/lang');
let Vue = require('vue');
let Utils = require('./utils');
			require('/css/base.css');
			require('/components/intro')();

let app = new Vue({
	el: '#app',

	data: {
		Lang: Lang(),
		Categories: require('/data/categories.json'),
		coralines: {}
	},

	methods: {
		scrollTo: Utils.scrollToAnchor,
		scrollTop: () => Utils.scrollTo(0)
	}
});

require('semantic-ui');
require('/css/index.css');