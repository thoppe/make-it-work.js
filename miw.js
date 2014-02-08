var target_width = 400;

var height_marker;

$(document).ready(function() {

    console.log("document ready");
    var boxes = $("#drawbox").children('.box');

    // Set the hooks and make the boxes editable 
    boxes.each(function() { 
	b = $(this)
	b.attr('contenteditable', true);
	b.attr('spellcheck', false);
	b.on("keyup", size_drawbox);
    });
    size_drawbox();

});

$(window).on("load", function() { 
    console.log("doc load"); 
    size_drawbox();
});

function size_drawbox() {
    console.log("start draw");

    height_marker = 0;
    var boxes = $("#drawbox").children('.box');
    boxes.each(remove_empty);
    boxes.each(size_width);

    console.log("end draw");
}


function remove_empty() {
    var text = $(this).text().trim();
   
    if (text == '') {
	console.log("Killed a div");
	$(this).remove();
	size_drawbox();
    }

}


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