let $ = require('jquery');

function scrollToAnchor(aid){
    var aTag = $("*[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

function scrollTo(y){
    $('html,body').animate({scrollTop: y},'slow');
}


exports.scrollToAnchor = scrollToAnchor;
exports.scrollTo = scrollTo;