var target_width = 400;


window.onload = function() {
    size_drawbox();
}


var height_marker;

function size_drawbox() {
    height_marker = 0;
    var boxes = $("#drawbox").children('.box');

    boxes.each(size_width);
    boxes.each(function() { 
	b = $(this)
	b.attr('contenteditable', true);
	b.attr('spellcheck', false);
	b.change(size_drawbox);
    });
}

$("#drawbox").change(size_drawbox);

function size_width() {
    ele = $(this);
    var dims = measure(ele);
    var scale = target_width/dims.w;
    ele.css({transform:'scale('+scale+')'});  
    ele.css({top:height_marker});

    height_marker += scale*dims.h;
    console.log(height_marker);
}

function measure(ele) {
    var w = ele.width();
    var h = ele.height();
    
    return {w:w, h:h,a:w/h};
}