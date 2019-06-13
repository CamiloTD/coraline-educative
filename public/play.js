let $ = require('jquery');
let path = window.location.href.substring(window.location.href.indexOf("target=") + 7);
let Lang = require(`./packages/${path}/lang/es.json`);
let Module = require(`./packages/${path}/index.js`);
let Pad = require(`./packages/${path}/pad.js`);

if(window.innerWidth > window.innerHeight) Module(Lang);
else Pad(Lang, +prompt("Insert the ID"));