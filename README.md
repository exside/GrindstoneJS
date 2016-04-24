# GrindstoneJS

A lightweight jQuery alternative for modern browsers.

Full documentation and examples: http://grindstonejs.drzwebdev.com/

```
npm install grindstone
```

GrindstoneJS does not aim to "replace" jQuery or reinvent the wheel... it is merely an ensemble of the functions I use most often, along with a few of my own.

##### Browser Support:

* IE 9+
* Firefox 3.5+
* Chrome 4.0+
* Safari 3.2+
* Opera 10.0+
* Mobile

##### For Custom Builds:

* Download the GrindstoneJS-master .zip file and extract in a local folder on your machine
* Install Node.js on your machine
* Navigate to the root directory of your project in the CLI and install Grunt (make sure to explicitly install the "Grunt CLI")
* After installing Grunt, install the Grunt plugins "grunt-contrib-concat" and "grunt-contrib-uglify" (minimum version dependencies listed in "package.json")
* Within "Gruntfile.js", you will see an array of all the specific modules which are being concatenated and minified: simply add and remove modules as you see fit, and feel free to rename the resultant uncompressed/compressed files as you please
* If everything went smoothly, you should be able to simply navigate to your local project in the CLI and type in "grunt" > enter/return...

### Abbreviated Documentation/Examples

For full documentation/examples, navigate to the official site. (link provided above)

##### $()

_Creates a new instance of the "Grindstone" object and allows method chaining on DOM elements._

```
$(selector, [context]);
```

##### $.fn

_"Grindstone.prototype": Use this to create new methods/modules._

```
$.fn.newMethod = function() {};
```

##### eq()

_Returns an element from the set as specified by the corresponding index value._

```
$(selector).eq(index);
```

##### ajax()

_Basic AJAX call for pulling external data into the DOM and sending data to external servers._

* method
* url
* async
* success
* header
* header value
* send string

```
$.ajax({ properties: values });
```

##### append()

_Appends a new child element to the current object. New content can be either HTML input as a string or existing DOM elements._

```
$(selector).append(content);
```

##### attr()

_Sets or returns the value of the specified attribute._

```
$(selector).attr(attribute, value);
```

##### hasAttr()

_Checks to see if the specified element has the specified attribute._

```
$(selector).hasAttr(attribute); => returns "true" or "false"
```

##### removeAttr()

_Removes the specified attribute._

```
$(selector).removeAttr(attribute);
```

##### hasClass()

_Detects whether or not the target element has the specified class._

```
$(selector).hasClass(class); => returns "true" or "false"
```

##### addClass()

_Adds the specified class._

```
$(selector).addClass(class);
```

##### removeClass()

_Removes the specified class._

```
$(selector).removeClass(class);
```

##### toggleClass()

_Removes the specified class._

```
$(selector).toggleClass(class);
```

##### clone()

_Returns an exact duplicate of the first element matching the selector, including its children._

```
$(selector).clone();
```

##### css()

_Adjusts the CSS styles of a selected element if an object is passed as the argument or if both the styles and value arguments are passed as strings. Returns the specified CSS value if a string is passed as the styles argument and the value argument is null._

```
$(selector).css({ properties: values });
$(selector).css(property, value);
$(selector).css(property);
```

##### height()

_Returns the height value of the specified selector as an integer. To change the height (in px), enter in the "num" parameter. If simply returning the current height, this will only apply to the first match in the set and includes padding. Setting the height will apply to all elements in the set._

```
$(selector).height();
$(selector).height(number);
```

##### width()

_Returns the width value of the specified selector as an integer. To change the width (in px), enter in the "num" parameter. If simply returning the current width, this will only apply to the first match in the set and includes padding. Setting the width will apply to all elements in the set._

```
$(selector).width();
$(selector).width(number);
```

##### show()

_Shows a hidden element. May be instant or delayed._

```
$(selector).show();
$(selector).show(delay);
```

##### hide()

_Hides a visible element. May be instant or delayed._

```
$(selector).hide();
$(selector).hide(delay);
```

##### doubleTap()

_Custom double-tapping/double-clicking method._

```
$(selector).doubleTap(callback);
```

##### each()

_Iterates through each item in the set and executes the callback._

```
$(selector).each(callback);
```

##### on()

_Adding event listeners._

```
$(selector).on(event[s], callback);
```

##### off()

_Removing event listeners._

```
$(selector).off(event[s], callback);
```

##### html()

_Returns the selected element's innerHTML, or replaces it if the "content" argument is entered._

```
$(selector).html();
$(selector).html(content);
```

##### before()

_Inserts new content before the target element. New content can be either HTML input as a string or existing DOM elements._

```
$(selector).before(content);
```

##### after()

_Inserts new content after the target element. New content can be either HTML input as a string or existing DOM elements._

```
$(selector).after(content);
```

##### mouseable()

_Dynamically adds class "over" to elements as a hover state (default). Dynamically adds class "down" to elements as an active state (default). Removes the need for applicable CSS pseudo-states. Handles both standard mouse events and touch events. Developers may define their own hover/active classes with the optional "classes" object._

```
$(selector).mouseable();
$(selector).mouseable({hoverClass: "hover", activeClass: "active"});
```

##### newEl()

_Creates a new DOM element._

```
$.newEl(type, [id, class, innerHTML]);
```

##### offset()

_Returns the left/top offset value of the specified selector relative to the document (as a number). This will only apply to the first match in the set and includes margins._

```
$(selector).offset("left");
$(selector).offset("top");
```

##### prepend()

_Inserts a new element or content to the front of the target's childNode list. New content can be either HTML input as a string or existing DOM elements._

```
$(selector).prepend(content);
```

##### ready()

_Triggers when the DOM structure of the selected element is ready._

```
$(selector).ready(callback);
```

##### load()

_Triggers when the full DOM content of the selected element is loaded._

```
$(selector).load(callback);
```

##### remove()

_Removes the specified child element from the current object if the target is specified. If no target is specified, the parent of the current node will remove the node from the DOM._

```
$(selector).remove(child);	
```

##### replaceWith()

_Replaces the selected element contents with the specified content._

```
$(selector).replaceWith(content);
```

##### resize()

_Captures the native resize event and executes a function each time the event triggers._

```
$(selector).resize(callback);
```

##### scroll()

_Captures the native scroll event and executes a function each time the event triggers._

```
$(selector).scroll(callback);
```

##### scrollTop()

_Returns the scrollTop value of the given scrollable element if the "top" argument is not supplied._
_Scrolls the element to a specific pixel value if the "top" argument is supplied._
_Scrolling overflow must be enabled on the selector._

```
$(selector).scrollTop();
$(selector).scrollTop(top);
```

##### trigger()

_Dispatches custom event listeners._

```
$(selector).trigger(customEvent);
```

##### val()

_Assigns an arbitrary value to a specified element._

```
$(selector).val(valueName, content);
```

##### getVal()

_Returns the arbitrary value defined by val()._

```
$(selector).getVal(valueName);
```

##### 

_Removes the arbitrary value defined by val()._

```
$(selector).removeVal(valueName);
```

##### wrapInner()

_Wraps the innerHTML of the selected element(s) within the specified structure._

```
$(selector).wrapInner(structure); => use opening tags only for "structure"
```
