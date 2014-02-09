var height_marker;

$(document).ready(function() {

    // Set position style for the drawbox
    $(".drawbox").css("position","relative");

    // Set the hooks and make the boxes editable 
    $(".drawbox .box").each(function() {
	set_box_attr($(this));});

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

    parent = ele.closest(".drawbox");
    if(parent.hasClass("editable")) {
	ele.attr({
	    contenteditable:true,
	    spellcheck:false});

	ele.on("keypress", box_keypress);
	ele.on("input", size_drawbox);
    }

};

default_line_text = "empty text line";
function empty_box() {
    var ele = $('<div class="box"></div>');
    ele.text(default_line_text);
    return ele;
}


function box_keypress(event) {

    // On enter, adds an extra line 
    if(event.which == 13) {
	event.preventDefault(); // Suppress the enter

	// Add a new empty box
	ele = $(this).after(empty_box()).next();
	set_box_attr(ele);
	ele.focus();

	size_drawbox();
    }
}



function size_drawbox() {

    // Loop over the drawboxes
    $(".drawbox").each(function(i,x) {
	var boxes = $(this).children('.box');
	boxes.each(remove_if_empty);
	
	// If we've removed _everything_ add an empty box
	if(boxes.length==0) {
	    ele = empty_box();
	    $(this).append(ele);
	    set_box_attr(ele);
	    boxes = $(this).children('.box');
	}

	height_marker = 0;
	boxes.each(size_width);
	$(this).height(height_marker);
    });

}

function find_neighbor(ele) {
    if( ele.next().length ) { return ele.next(); };
    return ele.prev();
}

// Remove a box if the contents are empty
function remove_if_empty() {
    if ($(this).text() == '') {

	// Set the focus on a good neighbor
	find_neighbor($(this)).focus();

	$(this).remove();
	size_drawbox();
    }
}

function size_width() {
    ele = $(this);
    parent = ele.closest(".drawbox");
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



