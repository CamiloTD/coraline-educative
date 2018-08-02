// Requires
	let $ = require('jquery');
	let Categories = require('./data/categories.json');
	let Lang = require('/lang');
	
	// Components
		let navbar = require('./navbar');
		let background = $('<div class="slider"><img class="background" src="/img/high-res/romanesco.jpg"></div>');
		let categories = $('<div class="ui raised very padded center aligned container segment">')
				 .append($(`<h2 class="ui header">
				 				<img class="ui circular mini avatar image" src="/img/icons/misc/slack.png">
				 				<div class="content">${Lang.pages.index.header}</div>
				 				<img class="ui circular mini avatar image" src="/img/icons/misc/slack.png">
				 			</h2>`), $('<div class="ui horizontal divider"><img src="/img/logo/32.png"></div>'));

		let grid = $('<div class="ui center aligned grid">');

		Categories.forEach((category, id) => {
			grid.append($(`<div class="column four wide">
							<a class="ui basic fluid image label category_label">
								<img src="/img/icons/categories/${category}.png">
								<span class="fluid">${Lang.categories[category]}</span>
							</a>
						   </div>`));
		});

		categories.append(grid)

	$(document.body).append(categories);
	$('head').append('<link rel="icon" type="image/png" href="img/logo/16.png"/>')

// CSS Requires
	require('./css/index.css');
	require('semantic-ui');
