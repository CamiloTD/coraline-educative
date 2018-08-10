let $ = require('jquery');
let Anime = require('anime');
let Cookies = require('js-cookie');

module.exports = (force_play) => {
	return new Promise((done, err) => {
		if(!force_play && Cookies.get('intro_done')) return done();

		let w = window.innerWidth, h = window.innerHeight;
		let fontSize = w/20;
		let ml5 = $('<h1>').css({
		  "position": "absolute",
		  "font-size": fontSize,
		  "font-weight": 300,
		  "color": "#402d2d",
		  top: 0,
		  left: 0,
		  margin: 0,
		  width: w,
		  height: h,
		  overflow: 'hidden',
		  background: "white"
		});

		let text_wrapper = $('<span>').css({
		  "position": "relative",
		  "display": "inline-block",
		  "padding-top": "0.1em",
		  "padding-right": "0.05em",
		  "padding-bottom": "0.15em",
		  "line-height": "1em",
		  top: "calc(50% - " + fontSize/2 + 'px)',
		  left: "calc(50% - " + 4*fontSize + "px)"
		});

		let line1 = $('<span>').css({
		  "position": "absolute",
		  "left": 0,
		  "top": 0,
		  "bottom": 0,
		  "margin": "auto",
		  "height": "3px",
		  "width": "100%",
		  "background-color": "#402d2d",
		  "transform-origin": "0.5 0"
		});

		let line2 = $('<span>').css({
		  "position": "absolute",
		  "left": 0,
		  "top": 0,
		  "bottom": 0,
		  "margin": "auto",
		  "height": "3px",
		  "width": "100%",
		  "background-color": "#402d2d",
		  "transform-origin": "0.5 0"
		});

		let ampersand = $('<img src="/img/logo/64.png">').css({
		  "vertical-align": "middle",
		  "font-weight": 400,
		  "margin-right": "0.2em",
		  "margin-left": "0.2em"
		}).html('&amp;');

		let letter1 = $('<span>').css({ display: "inline-block", opacity: 0, "font-family": "Normal" }).html('Coraline');
		let letter2 = $('<span>').css({ display: "inline-block", opacity: 0, "font-family": "Normal" }).html('Educative');

		ml5.append(text_wrapper);
		text_wrapper.append(line1);
		text_wrapper.append(letter1);
		text_wrapper.append(ampersand);
		text_wrapper.append(letter2);
		text_wrapper.append(line2);

		Anime.timeline()
		  .add({
		    "targets": [line1[0], line2[0]],
		    "opacity": [0.5,1],
		    "scaleX": [0, 1],
		    "easing": "easeInOutExpo",
		    duration: 700
		  }).add({
		    "targets": [line1[0], line2[0]],
		    "duration": 600,
		    "easing": "easeOutExpo",
		    translateY: function(e, i, l) {
		      var offset = -0.625 + 0.625*2*i;
		      return offset + "em";
		    }
		  }).add({
		    "targets": ampersand[0],
		    "opacity": [0,1],
		    "scaleY": [0.5, 1],
		    "easing": "easeOutExpo",
		    "duration": 600,
		    offset: '-=600'
		  }).add({
		    "targets": letter1[0],
		    "opacity": [0,1],
		    "translateX": ["0.5em", 0],
		    "easing": "easeOutExpo",
		    "duration": 600,
		    offset: '-=300'
		  }).add({
		    "targets": letter2[0],
		    "opacity": [0,1],
		    "translateX": ["-0.5em", 0],
		    "easing": "easeOutExpo",
		    "duration": 600,
		    offset: '-=600'
		  }).add({
		  	"targets": ml5[0],
		  	"opacity": [1, 0],
		  	"delay": 500,
		  	"duration": 2000,
		  	complete: () => {
		  		Cookies.set('intro_done', true);
		  		ml5.remove();
		  		done();
		  	}
		  });

		$(document.body).append(ml5);
	});
};