# make-it-work.js

A small javascript library that uses CSS3 transforms to adjust content size to fit beautifully. 

## **See it [live](http://thoppe.github.io/make-it-work.js/).**

Create a `div` with `id="drawbox"` and all the subelement divs with `class="box"` will be sized to the width of the drawbox. 
Don't forget to set an inital width explictly or with stylesheets!

    <div id="drawbox" style="width:50%"> 
      <div class="box">foo</div>
      <div class="box">bar</div>
    </div>     

You can make content editable with the class:

    <div id="drawbox editable">...</div>     

Pressing enter in any field will create a new line, while deleting all the text will erase the line. Arrows will navigate inside a drawbox.


