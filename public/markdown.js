let Showdown = require('showdown');
let converter = new Showdown.Converter();
let $ = require('jquery');
let Lang = require('/lang');

let container =  $('<div class="ui raised very padded container segment markdown-body">');
let url = window.location.href.substring(window.location.href.indexOf("target=") + 7);

if(Lang.lang === "en") {
	$.get(url + ".md").then((data) => {
		container.append(converter.makeHtml(data));
	})
} else {
	$.get(url + '.' + Lang.lang + '.md').then((data) => {
		container.append(converter.makeHtml(data));
	}).catch((exc) => {
		$.get(url + ".md").then((data) => {
			container.append(converter.makeHtml(data));
		})	
	});
}


$(document.body).append(container);

require('/css/markdown.css');
require('./css/base.css');
require('github-markdown.css');
require('semantic-ui')