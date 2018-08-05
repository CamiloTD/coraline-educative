// Requires
	let $ = require('jquery');
	let io = require('/socket.io/socket.io.js');
	let Categories = require('./data/categories.json');
	let Lang = require('/lang');
	let Utils = require('./utils');
	let Packages = require('./packages');
// Defines
	let info = io('/info');
	let body = $(document.body);
	let coralines = {};

// Components
	let container =  $('<div class="ui raised very padded center aligned container segment">')
			 .append($(`<h2 class="ui header">
			 				<img class="ui circular mini avatar image" src="/img/icons/misc/slack.png">
			 				<div class="content">${Lang.pages.index.header}</div>
			 				<img class="ui circular mini avatar image" src="/img/icons/misc/slack.png">
			 			</h2>`), $('<div class="ui horizontal divider"><img src="/img/logo/32.png"></div>'));

	let grid = $('<div class="ui center aligned grid">');

	Categories.forEach((category, id) => {
		grid.append($(`<div class="column four wide">
						<a class="ui basic fluid image label category_label"">
							<img src="/img/icons/categories/${category}.png">
							<span class="fluid">${Lang.categories[category]}</span>
						</a>
					   </div>`)
					.click(() => Utils.scrollToAnchor(category)));
	});

	container.append(grid)

	body.append(container);
	$('head').append('<link rel="icon" type="image/png" href="img/logo/16.png"/>')

// Each Category

	info.on('packages', (data) => {
		coralines = {};

		for(let i in data) {
			let cora = data[i];
			cora.categories && cora.categories.forEach((cat) => {
				if(!coralines[cat]) coralines[cat] = {};
				coralines[cat][i] = cora;
			});
		}

		Categories.forEach((category) => {
			let div = $('<div class="category_container">');
			let divider = $('<div class="ui horizontal divider" name="' + category + '">');

			divider.append(`<img src="/img/icons/categories/${category}.png">`,
							$('<span>').html(Lang.categories[category]),
						   `<img src="/img/icons/categories/${category}.png">`);
			
			div.append(divider);

			let category_coralines = coralines[category];
			let counter = 0;

			let cards = $('<div class="ui cards">');
			for(let i in category_coralines) {
				cards.append(CoralineCard(i, category_coralines[i]));

				counter++;
			}

			div.append(cards);

			if(counter === 0) {
				return;
			}

			div.append(`<button class="ui basic button scrolltop">
							<img src="/img/icons/misc/scrolltop.png">
						</button>`).click(() => Utils.scrollTo(0));
			container.append(div);
		});
	});

	info.emit('packages');

	// Functions
		function CoralineCard (name, coraline) {
			let card = $('<div class="card">');
			let content = $('<div class="content">');
				content.append(`<img class="right floated mini ui image" src="/packages/${name}/avatar.png">`);
				content.append('<div class="header">' + coraline.name + '</div>');
				content.append('<div class="description">' + coraline.description + '</div>');

			let extra = $('<div class="extra content">');
			let buttons = $('<div class="ui two fluid buttons">');
			let play = $('<button class="ui basic blue button">').html(Lang.pages.index.play);
			let desc = $('<button class="ui basic green button">').html(Lang.pages.index.desc);

			play.click(() => {
				window.location.href = '/packages/' + name + '.kmi';
			});

			desc.click(() => {
				window.location.href = '/packages/' + name + '/README.md';
			});

			buttons.append(play, desc);
			extra.append(buttons);
			card.append(content, extra);
			return card;
		}

// CSS Requires
	require('./css/index.css');
	require('semantic-ui');
