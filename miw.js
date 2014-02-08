var height_marker;

$(document).ready(function() {

    console.log("document ready");
    var boxes = $("#drawbox").children('.box');

    // Set the hooks and make the boxes editable 
    boxes.each(function() {set_box_attr($(this));});
    // boxes.each(set_box_attr);
    size_drawbox();
});

$(window).on("load", function() { 
    console.log("doc load"); 
    size_drawbox();
});

$(window).resize( size_drawbox );

function set_box_attr(ele) {
    ele.attr('contenteditable', true);
    ele.attr('spellcheck', false);
    ele.on("keypress", check_add_box);
    ele.on("input", size_drawbox);
};


// On enter, adds an extra line 
default_line_text = "empty text line";

function check_add_box(event) {
    if(event.which == 13) {
	event.preventDefault(); // Suppress the enter

	var ele = $('<div class="box"></div>');
	ele.text(default_line_text);
	set_box_attr(ele);

	// Set the focus to the newline
	$(this).after(ele);
	ele.focus();
	size_drawbox();
    }
}

function size_drawbox() {
    height_marker = 0;
    var target = $("#drawbox");
    var boxes = target.children('.box');
    boxes.each(remove_empty);
    boxes.each(size_width);
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
    parent = ele.closest("#drawbox");
    target_width = parent.width();
    console.log(target_width);
    
    var dims = measure(ele);
    var scale = target_width/dims.w;
    ele.css({transform:'scale('+scale+')'});  
    ele.css({top:height_marker});

    height_marker += scale*dims.h;
    // console.log(height_marker);
}

function measure(ele) {
    var w = ele.width();
    var h = ele.height();
    
    return {w:w, h:h,a:w/h};
}