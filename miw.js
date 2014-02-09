var height_marker;

$(document).ready(function() {

    // Set position style for the drawbox
    $("#drawbox").css("position","relative");

    var boxes = $("#drawbox").children('.box');

    // Set the hooks and make the boxes editable 
    boxes.each(function() {set_box_attr($(this));});
    size_drawbox();
}); 

$(window).on("load", function() { 
    console.log("Starting make-it-work.js initial resize"); 
    size_drawbox();
});

$(window).resize( size_drawbox );

function set_box_attr(ele) {

    ele.css({"position":"absolute",
	     "white-space":"nowrap",
	     "outline":"0px solid transparent"});

    transform_origin(ele,0,0);

    parent = ele.closest("#drawbox");
    if(parent.hasClass("editable")) {
	ele.attr({
	    contenteditable:true,
	    spellcheck:false});

	ele.on("keypress", check_add_box);
	ele.on("input", size_drawbox);
    }

};


// On enter, adds an extra line 
default_line_text = "empty text line";

function check_add_box(event) {
    if(event.which == 13) {
	event.preventDefault(); // Suppress the enter

	var ele = $('<div class="box"></div>');
	ele.text(default_line_text);

	// Set the focus to the newline
	$(this).after(ele);
	set_box_attr(ele);
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
    
    var scale = target_width/ele.width();
    transform_scale(ele, scale);
    ele.css({top:height_marker});

    height_marker += scale*ele.height();
}

/* Cross browser CSS3 functions */                 

function transform_origin(ele, x_pct, y_pct) {
    var coords = x_pct + "% " + y_pct + "%";
    ele.css("transform-origin",coords);
    ele.css("-webkit-transform-origin",coords);
    ele.css("-ms-transform-origin",coords);
    ele.css("-o-transform-origin",coords);
}

function transform_scale(ele, scale) {
    var coords = 'scale('+scale+')';
    ele.css({"-webkit-transform":coords});
    ele.css({"-ms-transform":coords});
    ele.css({"-o-transform":coords});
    ele.css({"transform":coords});
}



