// Requires
	let $ = require('jquery');
	let Pixi = require('pixi');
// Init
	$('head').append('<link rel="icon" type="image/png" href="img/logo/16.png"/>')
	;
// Components
	let navbar = require('./navbar/index');

	$(document.body).append(navbar);
// Css
	require('./css/index.css');
	require('semantic-ui/menu.min.css');