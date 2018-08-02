const $ = require('jquery');
const Lang = require('/lang');

let logo = $('<div class="item"><img src="img/logo/64.png"></div>');
let menu = $('<div class="ui stackable menu">').append(logo);

for(let i in Lang.navbar) menu.append($('<a class="item">').html(Lang.navbar[i]));

module.exports = menu;