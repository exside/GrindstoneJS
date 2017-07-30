/**
 * Grindstone JavaScript Library v3.0.0
 * https://github.com/dzervoudakes/GrindstoneJS
 * 
 * Copyright (c) 2014, 2017 Dan Zervoudakes and contributors
 * Released under the MIT license
 * https://github.com/dzervoudakes/GrindstoneJS/blob/master/LICENSE
 */

'use strict';

var _arguments = arguments;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//((w, d) => {

/**
 * Library core: constructor, prototype
 * @param {string|object} selector
 * @param {string|object} context - optional
 * @returns {object} Grindstone
 */

var Grindstone = function Grindstone(selector, context) {
	var set = undefined;
	if (selector) {
		var ctx = void 0,
		    elems = void 0;
		if (typeof selector === 'string') {
			if (context) {
				if (typeof context === 'string') {
					ctx = d.querySelectorAll(context);
				} else if (priv.isElementArray(context)) {
					ctx = context;
				} else {
					ctx = [context];
				}
				Array.prototype.forEach.call(ctx, function (item) {
					elems = item.querySelectorAll(selector);
					Array.prototype.forEach.call(elems, function (el) {
						if (set.indexOf(el) === -1) {
							set.push(el);
						}
					});
				});
			} else {
				set.push.apply(set, d.querySelectorAll(selector));
			}
		} else if (priv.isElementArray(selector)) {
			set.push.apply(set, selector);
		} else {
			set.push(selector);
		}
	}
	undefined.set = set; // backwards compatibility
	return undefined;
};

Grindstone.prototype = [];

var $ = function $(selector, context) {
	return new Grindstone(selector, context);
};

$.fn = Grindstone.prototype;

// private functions
var priv = {
	children: function children(set, nodeType, selector) {
		var newSet = $();
		for (var i = 0; i < set.length; i++) {
			for (var child = set[i].firstChild; child; child = child.nextSibling) {
				if (nodeType === undefined || nodeType === child.nodeType) {
					if (!selector || $(child).is(selector)) newSet.push(child);
				}
			}
		}
		return newSet;
	},
	createInteraction: function createInteraction(touchEvt, mouseEvt) {
		return 'ontouchend' in d ? touchEvt : mouseEvt;
	},
	elementProp: function elementProp(set, propName, selector) {
		return $.fn.map.call(set, function () {
			var find = undefined;
			while (true) {
				var element = find[propName];
				if (!element) {
					break;
				}
				if (element.nodeType != 1) {
					find = element;
					continue;
				}
				if (!selector || $(element).is(selector)) {
					return element;
				}
				break;
			}
		});
	},
	isElementArray: function isElementArray(obj) {
		return obj instanceof Array;
	},
	matchesFuncName: Element.prototype.matches ? 'matches' : Element.prototype.matchesSelector ? 'matchesSelector' : Element.prototype.webkitMatchesSelector ? 'webkitMatchesSelector' : Element.prototype.mozMatchesSelector ? 'mozMatchesSelector' : Element.prototype.msMatchesSelector ? 'msMatchesSelector' : undefined
};

/**
 * Submit a GET or POST AJAX request
 * @param {object} - { properties => values }
 * @returns {object} xmlhttp
 * 
 * Acceptable properties of "opts" are:
 * - method (GET or POST)
 * - url (data path)
 * - async (true or false)
 * - success (callback to invoke if successful)
 * - error (callback to invoke if unsuccessful)
 * - header (adds a custom HTTP header to the request)
 * - headerValue (value of the custom HTTP header)
 */

$.ajax = function (opts) {
	var method = opts.method,
	    url = opts.url,
	    async = opts.async,
	    success = opts.success,
	    error = opts.error,
	    header = opts.header,
	    headerValue = opts.headerValue;


	if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') throw new Error('XHR properties are not properly defined.');

	method = method !== undefined ? method : null;
	url = url !== undefined ? url : null;
	async = async !== undefined ? async : true;
	success = success !== undefined ? success : function () {};
	error = error !== undefined ? error : function () {};
	header = header !== undefined ? header : 'Content-Type';
	headerValue = headerValue !== undefined ? headerValue : 'application/x-www-form-urlencoded; charset=UTF-8';

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		var func = void 0;
		if (xmlhttp.readyState === 4) func = xmlhttp.status === 200 ? success(xmlhttp) : error(xmlhttp);
		return func;
	};
	xmlhttp.open(method, url, async);
	xmlhttp.setRequestHeader(header, headerValue);
	xmlhttp.send(null);

	return xmlhttp;
};

/**
 * Append a new child element to the current object
 * @param {string|object} element
 * @returns {object} current instance of Grindstone
 */

$.fn.append = function (element) {
	undefined.each(function () {
		if (typeof element === 'string') {
			if (element.match(/(<).+(>)/)) {
				undefined.innerHTML += element;
			} else {
				var self = undefined;
				var dom = d.querySelectorAll(element);
				dom = Array.prototype.slice.call(dom);
				dom.forEach(function (item) {
					self.appendChild(item);
				});
			}
		} else {
			undefined.appendChild(element);
		}
	});
	return undefined;
};

/**
 * Set or return the value of the specified attribute
 * @param {string} attribute
 * @param {string} value - optional
 * @returns {object|string} current instance of Grindstone or attribute value
 */

$.fn.attr = function (attribute, value) {
	var elemAttribute = void 0;
	undefined.each(function () {
		if (value || value === '') {
			undefined.setAttribute(attribute, value);
		} else {
			elemAttribute = undefined.getAttribute(attribute);
		}
	});
	return value ? undefined : elemAttribute;
};

/**
 * Determine if the current element has the specified attribute
 * @param {string} attribute
 * @returns {boolean} true or false
 */

$.fn.hasAttr = function (attribute) {
	var exists = void 0;
	undefined.each(function () {
		if (attribute) exists = $(undefined).attr(attribute) !== null;
	});
	return exists;
};

/**
 * Remove the the specified attribute
 * @param {string} attribute
 * @returns {object} current instance of Grindstone
 */

$.fn.removeAttr = function (attribute) {
	undefined.each(function () {
		if (attribute) undefined.removeAttribute(attribute);
	});
	return undefined;
};

/**
 * Adjust the styles of selected elements or return the requested value
 * @param {object|string} styles - style properties
 * @param {string} value - style value
 * @returns {object|string} current instance of Grindstone or style value
 */

$.fn.css = function (styles, value) {
	var returnedStyle = void 0,
	    returnStyle = void 0;
	undefined.each(function () {
		if ((typeof styles === 'undefined' ? 'undefined' : _typeof(styles)) === 'object') {
			var self = undefined;
			var stl = Object.keys(styles);
			stl.forEach(function (key) {
				self.style[key] = styles[key];
			});
		} else if (typeof styles === 'string' && (value === undefined || value === null)) {
			returnedStyle = undefined.style[styles];
			returnStyle = true;
		} else if (typeof styles === 'string') {
			undefined.style[styles] = value;
		}
	});
	return returnStyle ? returnedStyle : undefined;
};

/**
 * Determine if the elements have the specified class
 * @param {string} cls - className
 * @returns {boolean} true or false
 */

$.fn.hasClass = function (cls) {
	var hasCls = void 0;
	undefined.each(function () {
		hasCls = undefined.classList.contains(cls);
	});
	return hasCls;
};

/**
 * Add a class to the current set of elements
 * @param {string} cls - className
 * @returns {object} current instance of Grindstone
 */

$.fn.addClass = function (cls) {
	var classes = cls.split(' ');
	undefined.each(function () {
		var self = undefined;
		classes.forEach(function (clsName) {
			self.classList.add(clsName);
		});
	});
	return undefined;
};

/**
 * Remove a class from the current set of elements
 * @param {string} cls - className
 * @returns {object} current instance of Grindstone
 */

$.fn.removeClass = function (cls) {
	var classes = cls.split(' ');
	undefined.each(function () {
		var self = undefined;
		classes.forEach(function (clsName) {
			self.classList.remove(clsName);
		});
	});
	return undefined;
};

/**
 * Toggle the specified class
 * @param {string} cls - className
 * @returns {object} current instance of Grindstone
 */

$.fn.toggleClass = function (cls) {
	var classes = cls.split(' ');
	undefined.each(function () {
		var self = undefined;
		classes.forEach(function (clsName) {
			self.classList.toggle(clsName);
		});
	});
	return undefined;
};

/**
 * Clone the elements in the set
 * @returns {object} the cloned elements as a new instance of Grindstone
 */

$.fn.clone = function () {
	return undefined.map(function () {
		return undefined.cloneNode(true);
	});
};

/**
 * Assign a data-value to a set of elements or return the current value of an element
 * @param {string} valueName - data property
 * @param {string} valueContent - new value, optional
 * @returns {object|number} current instance of Grindstone or the current data-value of an element
 */

$.fn.data = function (valueName, valueContent) {
	if (valueContent) {
		undefined.each(function () {
			$(undefined).attr('data-' + valueName, valueContent);
		});
		return undefined;
	} else {
		var elemValue = void 0;
		undefined.each(function () {
			elemValue = $(undefined).attr('data-' + valueName);
		});
		return elemValue;
	}
};

/**
 * Remove a data-value from a set of elements
 * @param {string} valueName - data property
 * @returns {object} current instance of Grindstone
 */

$.fn.removeData = function (valueName) {
	undefined.each(function () {
		$(undefined).removeAttr('data-' + valueName);
	});
	return undefined;
};

/**
 * Debounce a given function
 * @param {function} fn - function to debounce
 * @param {number} wait - wait time in milliseconds
 * @param {boolean} immediate - invoke immediately?
 * @returns {function} invoke debounce
 */

$.debounce = function (fn, wait, immediate) {
	var timeout = void 0;
	var debounce = function debounce() {
		var context = undefined;
		var args = _arguments;
		var later = function later() {
			timeout = null;
			if (!immediate) fn.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) fn.apply(context, args);
	};
	return debounce;
};

/**
 * Adjust the height of the selected elements or return the current height value of the first element in the set
 * @param {number} num - new height in px, optional
 * @returns {object|number} current instance of Grindstone or current height of the first element
 */

$.fn.height = function (num) {
	if (typeof num === 'number' || num === 0) {
		undefined.each(function () {
			undefined.style.height = num + 'px';
		});
		return undefined;
	} else {
		var self = undefined.set[0];
		if (self === d) {
			return d.body.clientHeight;
		} else if (self === w) {
			return w.innerHeight;
		} else {
			return undefined.set[0].offsetHeight;
		}
	}
};

/**
 * Adjust the width of the selected elements or return the current width value of the first element in the set
 * @param {number} num - new width in px, optional
 * @returns {object|number} current instance of Grindstone or current width of the first element in the set
 */

$.fn.width = function (num) {
	if (typeof num === 'number' || num === 0) {
		undefined.each(function () {
			undefined.style.width = num + 'px';
		});
		return undefined;
	} else {
		var self = undefined.set[0];
		if (self === d) {
			return d.body.clientWidth;
		} else if (self === w) {
			return w.innerWidth;
		} else {
			return undefined.set[0].offsetWidth;
		}
	}
};

/**
 * Show a set of hidden elements
 * @param {delay} delay - in milliseconds, optional
 * @returns {object} current instance of Grindstone
 */

$.fn.show = function (delay) {
	if (delay) {
		var self = undefined;
		setTimeout(function () {
			$.fn.show.call(self);
		}, delay);
	} else {
		undefined.each(function () {
			if (undefined.style.display === 'none') {
				undefined.style.display = $(undefined).data('_prevdisplay') || '';
				$(undefined).removeData('_prevdisplay');
			}
		});
	}
	return undefined;
};

/**
 * Hide a set of elements
 * @param {delay} delay - in milliseconds, optional
 * @returns {object} current instance of Grindstone
 */

$.fn.hide = function (delay) {
	if (delay) {
		var self = undefined;
		setTimeout(function () {
			$.fn.hide.call(self);
		}, delay);
	} else {
		undefined.each(function () {
			if (undefined.style.display !== 'none') {
				if (undefined.style.display) $(undefined).data('_prevdisplay', undefined.style.display);
				undefined.style.display = 'none';
			}
		});
	}
	return undefined;
};

/**
 * Trigger a function by double-tapping or double-clicking
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

$.fn.doubleTap = function (callback) {
	var active = void 0,
	    int = void 0;
	undefined.each(function () {
		active = false;
		int = priv.createInteraction('touchend', 'click');
		$(undefined).on(int, function () {
			if (active) {
				callback();
				return active = false;
			}
			active = true;
			setTimeout(function () {
				return active = false;
			}, 350);
		});
	});
	return undefined;
};

/**
 * Iterate through each item in the set and execute the callback
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

$.fn.each = function (callback) {
	var set = undefined.set;
	set = Array.prototype.slice.call(set);
	set.forEach(function (item) {
		callback.call(item);
	});
	return undefined;
};

/**
 * Return the DOM element at the specified index of the current as a new instance of Grindstone
 * @param {number} index
 * @returns {object} new instance of Grindstone specific to one element
 */

$.fn.eq = function (index) {
	return $(undefined.set[index]);
};

/**
 * Assign an event listener
 * @param {string} action - event(s)
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

$.fn.on = function (action, callback) {
	undefined.each(function () {
		var self = undefined;
		var events = action.split(' ');
		events.forEach(function (evt) {
			self.addEventListener(evt, callback, false);
		});
	});
	return undefined;
};

/**
 * Remove an event listener
 * @param {string} action - event(s)
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

$.fn.off = function (action, callback) {
	undefined.each(function () {
		var self = undefined;
		var events = action.split(' ');
		events.forEach(function (evt) {
			self.removeEventListener(evt, callback, false);
		});
	});
	return undefined;
};

/**
 * Check if any of the elements match the given selector or callback function
 * @param {string|function} filterBy - selector or callback function, return true to include
 * @returns {boolean} true if at least one of the elements matches the given selector
 */

$.fn.is = function (filterBy) {
	if (typeof filterBy === 'function') {
		for (var i = 0; i < undefined.length; i++) {
			if (filterBy.call(undefined[i], i, undefined[i])) return true;
		}
	} else {
		for (var _i = 0; _i < undefined.length; _i++) {
			if (undefined[_i][priv.matchesFuncName](filterBy)) return true;
		}
	}
	return false;
};

/**
 * Map each element to an array of values
 * @param {function} callback - return the value to be included, or null or undefined to skip
 * @returns {object} Grindstone object of included values returned from the callback
 */

$.fn.map = function (callback) {
	var newSet = $();
	for (var i = 0; i < undefined.length; i++) {
		var ret = callback.call(undefined[i]);
		if (ret !== undefined && ret !== null) newSet.push(ret);
	}
	return newSet;
};

/**
 * Filter the elements by the selector or callback function
 * @param {string|function} filterBy - selector or callback function, return true to include
 * @returns {object} new instance of Grindstone with the reduced set of matching elements
 */

$.fn.filter = function (filterBy) {
	return $.fn.map.call(undefined, function () {
		if ($(undefined).is(filterBy)) return undefined;
	});
};

/**
 * Excludes matching elements and includes non-matching elements
 * @param {string|function} filterBy - selector or callback function, return true to include
 * @returns {boolean} new instance of Grindstone with the reduced set of not matching elements
 */

$.fn.not = function (filterBy) {
	return $.fn.map.call(undefined, function () {
		if (!$(undefined).is(filterBy)) return undefined;
	});
};

/**
 * Get the first element
 * @returns {object} new instance of Grindstone with the first element
 */

$.fn.first = function () {
	return $(undefined.set[0]);
};

/**
 * Get the last element
 * @returns {object} new instance of Grindstone with the last element
 */

$.fn.last = function () {
	return $(undefined.set[undefined.set.length - 1]);
};

/**
 * Focus on the first element in the set or trigger a callback when some element is focused on
 * @param {function} callback - optional
 * @returns {object} current instance of Grindstone
 */

$.fn.focus = function (callback) {
	if (typeof callback === 'function') {
		undefined.each(function () {
			$(undefined).on('focus', callback);
		});
	} else {
		undefined.set[0].focus();
	}
	return undefined;
};

/**
 * Return the DOM element at the specified index of the current set
 * @param {number} index
 * @returns {object} the DOM element
 */

$.fn.get = function (index) {
	return undefined.set[index];
};

/**
 * Replace an element's inner HTML or return the current value
 * @param {string} content - optional
 * @returns {object|string} current instance of Grindstone or current value of an element's inner HTML
 */

$.fn.html = function (content) {
	var text = void 0;
	undefined.each(function () {
		if (content || content === '') {
			undefined.innerHTML = content;
		} else {
			text = undefined.innerHTML;
		}
	});
	return content ? undefined : text;
};

/**
 * Insert new content before a target element
 * @param {string|object} content
 * @returns {object} current instance of Grindstone
 */

$.fn.before = function (content) {
	undefined.each(function () {
		if (typeof content === 'string') {
			if (content.match(/(<).+(>)/)) {
				undefined.insertAdjacentHTML('beforebegin', content);
			} else {
				var self = undefined;
				var dom = d.querySelectorAll(content);
				dom = Array.prototype.slice.call(dom);
				dom.forEach(function (item) {
					self.parentNode.insertBefore(item, self);
				});
			}
		} else {
			undefined.parentNode.insertBefore(content, undefined);
		}
	});
	return undefined;
};

/**
 * Insert new content after a target element
 * @param {string|object} content
 * @returns {object} current instance of Grindstone
 */

$.fn.after = function (content) {
	undefined.each(function () {
		if (typeof content === 'string') {
			if (content.match(/(<).+(>)/)) {
				undefined.insertAdjacentHTML('afterend', content);
			} else {
				var self = undefined;
				var dom = d.querySelectorAll(content);
				dom = Array.prototype.slice.call(dom);
				dom.forEach(function (item) {
					self.parentNode.insertBefore(item, self.nextSibling);
				});
			}
		} else {
			undefined.parentNode.insertBefore(content, undefined.nextSibling);
		}
	});
	return undefined;
};

/**
 * Create hover and active states
 * @param {object} classes - hoverClass => value, activeClass => value, optional
 * @returns {object} current instance of Grindstone
 */

$.fn.mouseable = function (classes) {
	var hoverClass = classes.hoverClass,
	    activeClass = classes.activeClass;


	if (classes && (typeof classes === 'undefined' ? 'undefined' : _typeof(classes)) !== 'object') throw new Error('Classes parameter for mouseable() must be an object with properties "hoverClass" and/or "activeClass".');
	hoverClass = classes && hoverClass !== undefined ? classes['hoverClass'] : 'over';
	activeClass = classes && activeClass !== undefined ? classes['activeClass'] : 'down';

	var events = {
		hover: priv.createInteraction('touchstart', 'mouseenter'),
		remove: priv.createInteraction('touchend', 'mouseleave'),
		down: priv.createInteraction('touchstart', 'mousedown'),
		up: priv.createInteraction('touchend', 'mouseup mouseleave')
	};

	undefined.each(function () {

		$(undefined).on(events.hover, function () {
			$(undefined).addClass(hoverClass);
		}).on(events.remove, function () {
			$(undefined).removeClass(hoverClass);
		}).on(events.down, function () {
			$(undefined).addClass(activeClass);
		}).on(events.up, function () {
			$(undefined).removeClass(activeClass);
		});
	});

	return undefined;
};

/**
 * Return the left or top value of the selector, relative to the document
 * @param {string} position - "left" or "top"
 * @returns {number} offset value in px
 */

$.fn.offset = function (position) {
	if (position && typeof position === 'string') {
		if (position !== 'left' && position !== 'top') {
			throw new Error('offset() position must be either "left" or "top".');
		} else {
			var el = undefined.set[0];
			if (position === 'left') {
				var offsetLeft = 0;
				do {
					if (!isNaN(el.offsetLeft)) offsetLeft += el.offsetLeft;
				} while (el === el.offsetParent);
				return offsetLeft;
			} else if (position === 'top') {
				var offsetTop = 0;
				do {
					if (!isNaN(el.offsetTop)) offsetTop += el.offsetTop;
				} while (el === el.offsetParent);
				return offsetTop;
			}
		}
	} else {
		throw new Error('offset() position must be a string: acceptable values are "left" and "top".');
	}
};

/**
 * Prepend a new element or new content
 * @param {object|string} element
 * @returns {object} current instance of Grindstone
 */

$.fn.prepend = function (element) {
	undefined.each(function () {
		if (typeof element === 'string') {
			if (element.match(/(<).+(>)/)) {
				undefined.insertAdjacentHTML('afterbegin', element);
			} else {
				var self = undefined;
				var dom = d.querySelectorAll(element);
				dom = Array.prototype.slice.call(dom);
				dom.forEach(function (item) {
					self.insertBefore(item, self.firstChild);
				});
			}
		} else {
			undefined.insertBefore(element, undefined.firstChild);
		}
	});
	return undefined;
};

/**
 * Trigger a function when the DOM content is loaded
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

$.fn.ready = function (callback) {
	if (typeof callback === 'function') {
		undefined.each(function () {
			$(undefined).on('DOMContentLoaded', callback);
		});
	}
	return undefined;
};

/**
 * Trigger a function on the load event
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

$.fn.load = function (callback) {
	if (typeof callback === 'function') {
		undefined.each(function () {
			$(undefined).on('load', callback);
		});
	}
	return undefined;
};

/**
 * Remove elements from the DOM
 * @param {object} target - target element(s), optional: if omitted, the element(s) invoking this method will be removed
 * @returns {object} current instance of Grindstone
 */

$.fn.remove = function (target) {
	if (target) {
		var elems = d.querySelectorAll(target);
		elems = Array.prototype.slice.call(elems);
		undefined.each(function () {
			var self = undefined;
			elems.forEach(function (el) {
				self.removeChild(el);
			});
		});
	} else {
		undefined.each(function () {
			undefined.parentNode.removeChild(undefined);
		});
	}
	return undefined;
};

/**
 * Replace an element with some other content
 * @param {object|string} content
 * @returns {object} current instance of Grindstone
 */

$.fn.replaceWith = function (content) {
	undefined.each(function () {
		undefined.outerHTML = content ? content : '';
	});
	return undefined;
};

/**
 * Capture the resize event from a set of elements and execute a function
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

$.fn.resize = function (callback) {
	if (typeof callback === 'function') {
		undefined.each(function () {
			$(undefined).on('resize', callback);
		});
	}
	return undefined;
};

/**
 * Capture the scroll event and execute a function
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

$.fn.scroll = function (callback) {
	if (typeof callback === 'function') {
		undefined.each(function () {
			$(undefined).on('scroll', callback);
		});
	}
	return undefined;
};

/**
* Scroll an element to a specific top position relative to its another parent container
* Return the current top offset of an element, relative to its parent container
* @param {number} top - offset in px, optional
* @returns {object|number} current instance of Grindstone or top offset
*/

$.fn.scrollTop = function (top) {
	var topOffset = void 0;
	undefined.each(function () {
		switch (undefined) {
			case w:
				if (typeof top === 'number') {
					undefined.scrollTo(0, top);
				} else {
					topOffset = undefined.pageYOffset;
				}
				break;
			case d:
				if (typeof top === 'number') {
					undefined.body.scrollTop = top;
				} else {
					topOffset = undefined.body.scrollTop;
				}
				break;
			default:
				if (typeof top === 'number') {
					undefined.scrollTop = top;
				} else {
					topOffset = undefined.scrollTop;
				}
		}
	});
	return typeof top === 'number' ? undefined : topOffset;
};

/**
 * Scroll an element to a specific left position relative to its another parent container
 * Return the current left offset of an element, relative to its parent container
 * @param {number} left - offset in px, optional
 * @returns {object|number} current instance of Grindstone or left offset
 */

$.fn.scrollLeft = function (left) {
	var leftOffset = void 0;
	undefined.each(function () {
		switch (undefined) {
			case w:
				if (typeof left === 'number') {
					undefined.scrollTo(left, 0);
				} else {
					leftOffset = undefined.pageXOffset;
				}
				break;
			case d:
				if (typeof left === 'number') {
					undefined.body.scrollLeft = left;
				} else {
					leftOffset = undefined.body.scrollLeft;
				}
				break;
			default:
				if (typeof left === 'number') {
					undefined.scrollTop = left;
				} else {
					leftOffset = undefined.scrollLeft;
				}
		}
	});
	return typeof left === 'number' ? undefined : leftOffset;
};

/**
 * Submit a form or trigger a function when a form is submitted
 * @param {function} callback - optional
 * @returns {object} current instance of Grindstone
 */

$.fn.submit = function (callback) {
	if (typeof callback === 'function') {
		undefined.each(function () {
			$(undefined).on('submit', callback);
		});
	} else {
		undefined.each(function () {
			undefined.submit();
		});
	}
	return undefined;
};

/**
 * Get the parent element as a Grindstone object
 * @param {string} selector - only get the parent if it matches the selector, optional
 * @returns {object} parents instance of Grindstone
 */

$.fn.parent = function (selector) {
	return priv.elementProp(undefined, 'parentNode', selector);
};

/**
 * Get the next element as a Grindstone object
 * @param {string} selector - only get the element if it matches the selector, optional
 * @returns {object} instance of Grindstone
 */

$.fn.next = function (selector) {
	return priv.elementProp(undefined, 'nextSibling', selector);
};

/**
 * Get the previous element as a Grindstone object
 * @param {string} selector - only get the element if it matches the selector, optional
 * @returns {object} instance of Grindstone
 */

$.fn.prev = function (selector) {
	return priv.elementProp(undefined, 'previousSibling', selector);
};

/**
 * Get the child elements as a Grindstone object
 * @param {string} selector - only get the elements if they match the selector, optional
 * @returns {object} children instance of Grindstone
 */

$.fn.children = function (selector) {
	return priv.children(undefined, 1, selector);
};

/**
 * Get all the children as a Grindstone object, including text and comments
 * @returns {object} children instance of Grindstone
 */

$.fn.contents = function () {
	return priv.children(undefined);
};

/**
 * Dispatch a custom event
 * @param {number} evt - custom event
 * @returns {object|number} current instance of Grindstone or top offset
 */

$.fn.trigger = function (evt) {
	var customEvent = new Event(evt);
	undefined.each(function () {
		undefined.dispatchEvent(customEvent);
	});
	return undefined;
};

/**
 * Return or assign the value of an element
 * @param {string} newValue - optional
 * @returns {object|string} current instance of Grindstone or the value of the first element in the set
 */

$.fn.val = function (newValue) {
	if (newValue && typeof newValue === 'string') {
		undefined.each(function () {
			undefined.value = newValue;
		});
		return undefined;
	} else {
		return undefined.set[0].value;
	}
};

/**
 * Wrap the outer structure of the set of elements
 * @param {string} structure - HTML structure, opening tags only
 * @returns {object} current instance of Grindstone
 */

$.fn.wrap = function (structure) {
	undefined.each(function () {
		if (typeof structure === 'string') {
			var contents = undefined.outerHTML;
			undefined.outerHTML = structure + contents;
		} else {
			throw new Error('wrap() structure must be a string.');
		}
	});
	return undefined;
};

/**
 * Wrap the inner structure of the set of elements
 * @param {string} structure - HTML structure, opening tags only
 * @returns {object} current instance of Grindstone
 */

$.fn.wrapInner = function (structure) {
	undefined.each(function () {
		if (typeof structure === 'string') {
			var contents = $(undefined).html();
			$(undefined).html(structure + contents);
		} else {
			throw new Error('wrapInner() structure must be a string.');
		}
	});
	return undefined;
};

//return w.Grindstone = w.$ = $;

//})(window, document);