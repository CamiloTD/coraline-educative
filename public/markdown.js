let Showdown = require('showdown');
let converter = new Showdown.Converter();
let $ = require('jquery');

let container =  $('<div class="ui raised very padded container segment markdown-body">');

$.get(new URL(window.location.href).pathname + "?").then((data) => {
	container.append(converter.makeHtml(data));
});


$(document.body).append(container);

require('/css/markdown.css');
require('github-markdown.css');
require('semantic-ui')