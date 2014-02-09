var height_marker;

$(document).ready(function() {
    console.log("document ready");
    var boxes = $("#drawbox").children('.box');

    // Set the hooks and make the boxes editable 
    boxes.each(function() {set_box_attr($(this));});
    size_drawbox();
});

$(window).on("load", function() { 
    console.log("doc load"); 
    size_drawbox();
});

$(window).resize( size_drawbox );

function set_box_attr(ele) {
    ele.css('position', "absolute");
    ele.css('white-space', "nowrap");
    ele.css('outline', "0px solid transparent");

    /* Safari and Chrome */
    ele.css("-webkit-transform-origin","0% 0%");

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
    var target = $("#drawbox");
    var boxes = target.children('.box');
    boxes.each(remove_empty);

    height_marker = 0;
    boxes.each(size_width);

    target.height(height_marker);
}

// Remove a box if the contents are empty
function remove_empty() {
    if ($(this).text() == '') {
	$(this).remove();
	size_drawbox();
    }
}


function size_width() {
    ele = $(this);
    parent = ele.closest("#drawbox");
    target_width = parent.width();
    
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