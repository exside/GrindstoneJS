/**
 * Grindstone JavaScript Library v3.0.0
 * https://github.com/dzervoudakes/GrindstoneJS
 * 
 * Copyright (c) 2014, 2017 Dan Zervoudakes and contributors
 * Released under the MIT license
 * https://github.com/dzervoudakes/GrindstoneJS/blob/master/LICENSE
 */

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (w, d) {

	// TODO: BUILD THE INTRO AND OUTRO DYNAMICALLY
	// TODO: MAKE SURE JSDOC COMMENTS TAB CORRECTLY AT TIME OF TRANSPILE
	// TODO: MAKE JSDOC WORK (and add @module and/or @memberOf to all the things)

	/**
  * @function Grindstone
  * @param {string|object} selector
  * @param {string|object} context optional
  * @returns {object} Grindstone
  * @example
  * $('.selector');
  * $('.selector', '#container');
  * @description Create new instances of our constructor.
  */

	var Grindstone = function Grindstone(selector, context) {
		var set = this;
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
		this.set = set; // backwards compatibility
		return this;
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
				var find = this;
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
  * @method ajax
  * @param {object} opts required, you may adhere to the default properties by passing in a blank object
  * @returns {object} XMLHttpRequest
  * @example
  * $.ajax({});
  * $.ajax({ opts: 'values' });
  * @description
  * Submit a GET or POST AJAX request.
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

		if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') throw new Error('XHR properties are not properly defined.');

		var _opts$method = opts.method,
		    method = _opts$method === undefined ? null : _opts$method,
		    _opts$url = opts.url,
		    url = _opts$url === undefined ? null : _opts$url,
		    _opts$async = opts.async,
		    async = _opts$async === undefined ? true : _opts$async,
		    _opts$success = opts.success,
		    success = _opts$success === undefined ? function () {} : _opts$success,
		    _opts$error = opts.error,
		    error = _opts$error === undefined ? function () {} : _opts$error,
		    _opts$header = opts.header,
		    header = _opts$header === undefined ? 'Content-Type' : _opts$header,
		    _opts$headerValue = opts.headerValue,
		    headerValue = _opts$headerValue === undefined ? 'application/x-www-form-urlencoded; charset=UTF-8' : _opts$headerValue;


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
  * @method append
  * @param {object|string} element
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').append('#element');
  * $('#selector').append('<p>Hello World</p>');
  * @description Append a new element or new content.
  */

	$.fn.append = function (element) {
		this.each(function () {
			if (typeof element === 'string') {
				if (element.match(/(<).+(>)/)) {
					this.innerHTML += element;
				} else {
					var self = this;
					var dom = d.querySelectorAll(element);
					dom = Array.prototype.slice.call(dom);
					dom.forEach(function (item) {
						self.appendChild(item);
					});
				}
			} else {
				this.appendChild(element);
			}
		});
		return this;
	};

	/**
  * @method attr
  * @param {string} attribute
  * @param {string} value optional
  * @returns {object|string} current instance of Grindstone or attribute value
  * @example
  * $('#selector').attr('example');
  * $('#selector').attr('example', 'test');
  * @description Set or return the value of the specified attribute.
  */

	$.fn.attr = function (attribute, value) {
		var elemAttribute = void 0;
		this.each(function () {
			if (value || value === '') {
				this.setAttribute(attribute, value);
			} else {
				elemAttribute = this.getAttribute(attribute);
			}
		});
		return value ? this : elemAttribute;
	};

	/**
  * @method hasAttr
  * @param {string} attribute
  * @returns {boolean}
  * @example $('#selector').hasAttr('example');
  * @description Determine if the current element has the specified attribute.
  */

	$.fn.hasAttr = function (attribute) {
		var exists = void 0;
		this.each(function () {
			if (attribute) exists = $(this).attr(attribute) !== null;
		});
		return exists;
	};

	/**
  * @method removeAttr
  * @param {string} attribute
  * @returns {object} current instance of Grindstone
  * @example $('#selector').removeAttr('example');
  * @description Remove the the specified attribute.
  */

	$.fn.removeAttr = function (attribute) {
		this.each(function () {
			if (attribute) this.removeAttribute(attribute);
		});
		return this;
	};

	/**
  * @method css
  * @param {object|string} styles object with style properties or single style in a string
  * @param {string} value new style value to apply
  * @returns {object|string} current instance of Grindstone or style value
  * @example
  * $('#selector').style('display');
  * $('#selector').style('display', 'block');
  * $('#selector').style({ display: 'block', color: 'red' });
  * @description Adjust the styles of selected elements or return the requested value.
  */

	$.fn.css = function (styles, value) {
		var returnedStyle = void 0,
		    returnStyle = void 0;
		this.each(function () {
			if ((typeof styles === 'undefined' ? 'undefined' : _typeof(styles)) === 'object') {
				var self = this;
				var stl = Object.keys(styles);
				stl.forEach(function (key) {
					self.style[key] = styles[key];
				});
			} else if (typeof styles === 'string' && (value === undefined || value === null)) {
				returnedStyle = this.style[styles];
				returnStyle = true;
			} else if (typeof styles === 'string') {
				this.style[styles] = value;
			}
		});
		return returnStyle ? returnedStyle : this;
	};

	/**
  * @method hasClass
  * @param {string} cls className
  * @returns {boolean}
  * @example $('#selector').hasClass('example');
  * @description Determine if the elements have the specified class.
  */

	$.fn.hasClass = function (cls) {
		var hasCls = void 0;
		this.each(function () {
			hasCls = this.classList.contains(cls);
		});
		return hasCls;
	};

	/**
  * @method addClass
  * @param {string} cls className
  * @returns {object} current instance of Grindstone
  * @example $('#selector').addClass('example');
  * @description Add a class to the current set of elements.
  */

	$.fn.addClass = function (cls) {
		var classes = cls.split(' ');
		this.each(function () {
			var self = this;
			classes.forEach(function (clsName) {
				self.classList.add(clsName);
			});
		});
		return this;
	};

	/**
  * @method removeClass
  * @param {string} cls className
  * @returns {object} current instance of Grindstone
  * @example $('#selector').removeClass('example');
  * @description Remove a class from the current set of elements.
  */

	$.fn.removeClass = function (cls) {
		var classes = cls.split(' ');
		this.each(function () {
			var self = this;
			classes.forEach(function (clsName) {
				self.classList.remove(clsName);
			});
		});
		return this;
	};

	/**
  * @method toggleClass
  * @param {string} cls className
  * @returns {object} current instance of Grindstone
  * @example $('#selector').toggleClass('example');
  * @description Toggle the specified class.
  */

	$.fn.toggleClass = function (cls) {
		var classes = cls.split(' ');
		this.each(function () {
			var self = this;
			classes.forEach(function (clsName) {
				self.classList.toggle(clsName);
			});
		});
		return this;
	};

	/**
  * @method clone
  * @returns {object} current instance of Grindstone
  * @example $('#selector').clone();
  * @description Clone the elements in the set.
  */

	$.fn.clone = function () {
		return this.map(function () {
			return this.cloneNode(true);
		});
	};

	/**
  * @method data
  * @param {string} valueName
  * @param {string} newValue optional
  * @returns {object|string} current instance of Grindstone or the current data-value of an element
  * @example
  * $('#selector').data('name');
  * $('#selector').data('name', 'value');
  * @description Assign a data-value to a set of elements or return the current value of an element.
  */

	$.fn.data = function (valueName, newValue) {
		if (newValue) {
			this.each(function () {
				$(this).attr('data-' + valueName, newValue);
			});
			return this;
		} else {
			var elemValue = void 0;
			this.each(function () {
				elemValue = $(this).attr('data-' + valueName);
			});
			return elemValue;
		}
	};

	/**
  * @method removeData
  * @param {string} valueName
  * @returns {object} current instance of Grindstone
  * @example $('#selector').removeData('name');
  * @description Remove a data-value from a set of elements.
  */

	$.fn.removeData = function (valueName) {
		this.each(function () {
			$(this).removeAttr('data-' + valueName);
		});
		return this;
	};

	/**
  * @method debounce
  * @param {function} fn function to debounce
  * @param {number} wait delay in ms
  * @param {boolean} immediate invoke immediately, optional
  * @returns {function}
  * @example $.debounce(function(){}, 300);
  * @description Debounce a given function.
  */

	$.debounce = function (fn, wait, immediate) {
		var timeout = void 0;
		var debounce = function debounce() {
			var context = this;
			var args = arguments;
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
  * @method height
  * @param {number} num px, optional
  * @returns {object|number} current instance of Grindstone or current height of the first element in the set
  * @example
  * $('#selector').height();
  * $('#selector').height(30);
  * @description Adjust the height of the selected elements or return the current height value of the first element in the set.
  */

	$.fn.height = function (num) {
		if (typeof num === 'number' || num === 0) {
			this.each(function () {
				this.style.height = num + 'px';
			});
			return this;
		} else {
			var self = this.set[0];
			if (self === d) {
				return d.body.clientHeight;
			} else if (self === w) {
				return w.innerHeight;
			} else {
				return this.set[0].offsetHeight;
			}
		}
	};

	/**
  * @method width
  * @param {number} num px, optional
  * @returns {object|number} current instance of Grindstone or current width of the first element in the set
  * @example
  * $('#selector').width();
  * $('#selector').width(30);
  * @description Adjust the width of the selected elements or return the current width value of the first element in the set.
  */

	$.fn.width = function (num) {
		if (typeof num === 'number' || num === 0) {
			this.each(function () {
				this.style.width = num + 'px';
			});
			return this;
		} else {
			var self = this.set[0];
			if (self === d) {
				return d.body.clientWidth;
			} else if (self === w) {
				return w.innerWidth;
			} else {
				return this.set[0].offsetWidth;
			}
		}
	};

	/**
  * @method show
  * @param {delay} delay ms, optional
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').show();
  * $('#selector').show(100);
  * @description Show a set of hidden elements.
  */

	$.fn.show = function (delay) {
		if (delay) {
			var self = this;
			setTimeout(function () {
				$.fn.show.call(self);
			}, delay);
		} else {
			this.each(function (item) {
				if (item.style.display === 'none') {
					item.style.display = $(item).data('_prevdisplay') || '';
					$(item).removeData('_prevdisplay');
				}
			});
		}
		return this;
	};

	/**
  * @method hide
  * @param {delay} delay ms, optional
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').hide();
  * $('#selector').hide(100);
  * @description Hide a set of elements.
  */

	$.fn.hide = function (delay) {
		if (delay) {
			var self = this;
			setTimeout(function () {
				$.fn.hide.call(self);
			}, delay);
		} else {
			this.each(function (item) {
				if (item.style.display !== 'none') {
					if (item.style.display) $(item).data('_prevdisplay', item.style.display);
					item.style.display = 'none';
				}
			});
		}
		return this;
	};

	/**
  * @method doubleTap
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example $('#selector').doubleTap(function(){});
  * @description Trigger a function by double-tapping or double-clicking.
  */

	$.fn.doubleTap = function (callback) {
		var active = void 0,
		    int = void 0;
		this.each(function () {
			active = false;
			int = priv.createInteraction('touchend', 'click');
			$(this).on(int, function () {
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
		return this;
	};

	/**
  * @method each
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example $('.selector').each(function(){});
  * @description Iterate through each item in the set and execute the callback.
  */

	$.fn.each = function (callback) {
		var set = this.set;
		set = Array.prototype.slice.call(set);
		set.forEach(function (item) {
			callback.call(item);
		});
		return this;
	};

	/**
  * @method eq
  * @param {number} index
  * @returns {object} new set in a Grindstone instance containing the specified element
  * @example $('.selector').eq(2);
  * @description Return the DOM element at the specified index of the current as a new instance of Grindstone.
  */

	$.fn.eq = function (index) {
		return $(this.set[index]);
	};

	/**
  * @method on
  * @param {string} action event(s)
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').on('change', function(){});
  * $('#selector').on('click touchend', function(){});
  * @description Assign an event listener.
  */

	$.fn.on = function (action, callback) {
		this.each(function () {
			var self = this;
			var events = action.split(' ');
			events.forEach(function (evt) {
				self.addEventListener(evt, callback, false);
			});
		});
		return this;
	};

	/**
  * @method off
  * @param {string} action event(s)
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').off('change', function(){});
  * $('#selector').off('click touchend', function(){});
  * @description Remove an event listener.
  */

	$.fn.off = function (action, callback) {
		this.each(function () {
			var self = this;
			var events = action.split(' ');
			events.forEach(function (evt) {
				self.removeEventListener(evt, callback, false);
			});
		});
		return this;
	};

	/**
  * @method is
  * @param {string|function} filterBy selector or callback function, return true to include
  * @returns {boolean} true if at least one of the elements matches the given selector
  * @example $('.selector').is('.visible');
  * @description Check if any of the elements match the given selector or callback function.
  */

	$.fn.is = function (filterBy) {
		if (typeof filterBy === 'function') {
			for (var i = 0; i < this.length; i++) {
				if (filterBy.call(this[i], i, this[i])) return true;
			}
		} else {
			for (var _i = 0; _i < this.length; _i++) {
				if (this[_i][priv.matchesFuncName](filterBy)) return true;
			}
		}
		return false;
	};

	/**
  * @method map
  * @param {function} callback return the value to be included, or null or undefined to skip
  * @returns {object} Grindstone object of included values returned from the callback
  * @example $(array).map(function(){});
  * @description Map each element to an array of values.
  */

	$.fn.map = function (callback) {
		var newSet = $();
		for (var i = 0; i < this.length; i++) {
			var ret = callback.call(this[i]);
			if (ret !== undefined && ret !== null) newSet.push(ret);
		}
		return newSet;
	};

	/**
  * @method filter
  * @param {string|function} filterBy selector or callback function, return true to include
  * @returns {object} new instance of Grindstone with the reduced set of matching elements
  * @example $('.selector').filter('.visible');
  * @description Filter the elements by the selector or callback function.
  */

	$.fn.filter = function (filterBy) {
		return $.fn.map.call(this, function () {
			if ($(this).is(filterBy)) return this;
		});
	};

	/**
  * @method not
  * @param {string|function} filterBy selector or callback function, return true to include
  * @returns {object} new instance of Grindstone with the reduced set of not matching elements
  * @example $('.selector').not('.hidden');
  * @description Excludes matching elements and includes non-matching elements.
  */

	$.fn.not = function (filterBy) {
		return $.fn.map.call(this, function () {
			if (!$(this).is(filterBy)) return this;
		});
	};

	/**
  * @method first
  * @returns {object} new instance of Grindstone with the first element of the original set
  * @example $('.selector').first();
  * @description Get the first element.
  */

	$.fn.first = function () {
		return $(this.set[0]);
	};

	/**
  * @method last
  * @returns {object} new instance of Grindstone with the last element of the original set
  * @example $('.selector').last();
  * @description Get the last element.
  */

	$.fn.last = function () {
		return $(this.set[this.set.length - 1]);
	};

	/**
  * @method focus
  * @param {function} callback optional
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').focus();
  * $('#selector').focus(function(){});
  * @description Focus on the first element in the set or trigger a callback when some element is focused on.
  */

	$.fn.focus = function (callback) {
		if (typeof callback === 'function') {
			this.each(function () {
				$(this).on('focus', callback);
			});
		} else {
			this.set[0].focus();
		}
		return this;
	};

	/**
  * @method get
  * @param {number} index
  * @returns {object} the DOM element
  * @example $('.selector').get(2);
  * @description Return the DOM element at the specified index of the current set.
  */

	$.fn.get = function (index) {
		return this.set[index];
	};

	/**
  * @method html
  * @param {string} content optional
  * @returns {object|string} current instance of Grindstone or current innerHTML of an element
  * @example
  * $('#selector').html();
  * $('#selector').html('<p>Hello World</p>');
  * @description Replace an element's innerHTML or return the current innerHTML.
  */

	$.fn.html = function (content) {
		var text = void 0;
		this.each(function () {
			if (content || content === '') {
				this.innerHTML = content;
			} else {
				text = this.innerHTML;
			}
		});
		return content ? this : text;
	};

	/**
  * @method before
  * @param {string|object} content
  * @returns {object} current instance of Grindstone
  * @example $('#selector').before('<p>Hello World</p>');
  * @description Insert new content before a target element.
  */

	$.fn.before = function (content) {
		this.each(function () {
			if (typeof content === 'string') {
				if (content.match(/(<).+(>)/)) {
					this.insertAdjacentHTML('beforebegin', content);
				} else {
					var self = this;
					var dom = d.querySelectorAll(content);
					dom = Array.prototype.slice.call(dom);
					dom.forEach(function (item) {
						self.parentNode.insertBefore(item, self);
					});
				}
			} else {
				this.parentNode.insertBefore(content, this);
			}
		});
		return this;
	};

	/**
  * @method after
  * @param {string|object} content
  * @returns {object} current instance of Grindstone
  * @example $('#selector').after('<p>Hello World</p>');
  * @description Insert new content after a target element.
  */

	$.fn.after = function (content) {
		this.each(function () {
			if (typeof content === 'string') {
				if (content.match(/(<).+(>)/)) {
					this.insertAdjacentHTML('afterend', content);
				} else {
					var self = this;
					var dom = d.querySelectorAll(content);
					dom = Array.prototype.slice.call(dom);
					dom.forEach(function (item) {
						self.parentNode.insertBefore(item, self.nextSibling);
					});
				}
			} else {
				this.parentNode.insertBefore(content, this.nextSibling);
			}
		});
		return this;
	};

	/**
  * @method mouseable
  * @param {object} classes optional
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').mouseable();
  * $('#selector').mouseable({ hoverClass: 'stuff', activeClass: 'things' });
  * @description Create hover and active states.
  */

	$.fn.mouseable = function (classes) {

		if (classes && (typeof classes === 'undefined' ? 'undefined' : _typeof(classes)) !== 'object') throw new Error('Classes parameter for mouseable() must be an object with properties "hoverClass" and/or "activeClass".');

		var hoverClass = classes && classes.hasOwnProperty('hoverClass') ? classes['hoverClass'] : 'over';
		var activeClass = classes && classes.hasOwnProperty('activeClass') ? classes['activeClass'] : 'down';

		var events = {
			hover: priv.createInteraction('touchstart', 'mouseenter'),
			remove: priv.createInteraction('touchend', 'mouseleave'),
			down: priv.createInteraction('touchstart', 'mousedown'),
			up: priv.createInteraction('touchend', 'mouseup mouseleave')
		};

		this.each(function () {
			var _this = this;

			$(this).on(events.hover, function () {
				$(_this).addClass(hoverClass);
			}).on(events.remove, function () {
				$(_this).removeClass(hoverClass);
			}).on(events.down, function () {
				$(_this).addClass(activeClass);
			}).on(events.up, function () {
				$(_this).removeClass(activeClass);
			});
		});

		return this;
	};

	/**
  * @method offset
  * @param {string} position 'left' or 'top'
  * @returns {number} offset value in px
  * @example
  * $('#selector').offset('left');
  * $('#selector').offset('right');
  * @description Return the left or top value of the selector, relative to the document.
  */

	$.fn.offset = function (position) {
		if (position && typeof position === 'string') {
			if (position !== 'left' && position !== 'top') {
				throw new Error('offset() position must be either "left" or "top".');
			} else {
				var el = this.set[0];
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
  * @method prepend
  * @param {object|string} element
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').prepend('#element');
  * $('#selector').prepend('<p>Hello World</p>');
  * @description Prepend a new element or new content.
  */

	$.fn.prepend = function (element) {
		this.each(function () {
			if (typeof element === 'string') {
				if (element.match(/(<).+(>)/)) {
					this.insertAdjacentHTML('afterbegin', element);
				} else {
					var self = this;
					var dom = d.querySelectorAll(element);
					dom = Array.prototype.slice.call(dom);
					dom.forEach(function (item) {
						self.insertBefore(item, self.firstChild);
					});
				}
			} else {
				this.insertBefore(element, this.firstChild);
			}
		});
		return this;
	};

	/**
  * @method ready
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example $(document).ready(function(){});
  * @description Trigger a function when the DOM content is loaded.
  */

	$.fn.ready = function (callback) {
		if (typeof callback === 'function') {
			this.each(function () {
				$(this).on('DOMContentLoaded', callback);
			});
		}
		return this;
	};

	/**
  * @method load
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example $(window).load(function(){});
  * @description Trigger a function on the load event.
  */

	$.fn.load = function (callback) {
		if (typeof callback === 'function') {
			this.each(function () {
				$(this).on('load', callback);
			});
		}
		return this;
	};

	/**
  * @method remove
  * @param {object} target element(s), optional
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').remove();
  * $('#selector').remove('.selector');
  * @description Remove elements from the DOM.
  */

	$.fn.remove = function (target) {
		if (target) {
			var elems = d.querySelectorAll(target);
			elems = Array.prototype.slice.call(elems);
			this.each(function () {
				var self = this;
				elems.forEach(function (el) {
					self.removeChild(el);
				});
			});
		} else {
			this.each(function () {
				this.parentNode.removeChild(this);
			});
		}
		return this;
	};

	/**
  * @method replaceWith
  * @param {object|string} content
  * @returns {object} current instance of Grindstone
  * @example $('#selector').replaceWith('<p>Hello World</p>');
  * @description Replace an element with some other content.
  */

	$.fn.replaceWith = function (content) {
		this.each(function () {
			this.outerHTML = content ? content : '';
		});
		return this;
	};

	/**
  * @method resize
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example $(window).resize(function(){});
  * @description Capture the resize event from a set of elements and execute a function.
  */

	$.fn.resize = function (callback) {
		if (typeof callback === 'function') {
			this.each(function () {
				$(this).on('resize', callback);
			});
		}
		return this;
	};

	/**
  * @method scroll
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example $(window).scroll(function(){});
  * @description Listen for the scroll event and trigger a function.
  */

	$.fn.scroll = function (callback) {
		if (typeof callback === 'function') {
			this.each(function () {
				$(this).on('scroll', callback);
			});
		}
		return this;
	};

	/**
  * @method scrollTop
  * @param {number} top offset in px, optional
  * @returns {object|number} current instance of Grindstone or top offset
  * @example
  * $('#selector').scrollTop();
  * $('#selector').scrollTop(50);
  * @description
  * Scroll an element to a specific top position relative to its another parent container.
  * Return the current top offset of an element, relative to its parent container.
  */

	$.fn.scrollTop = function (top) {
		var topOffset = void 0;
		this.each(function () {
			switch (this) {
				case w:
					if (typeof top === 'number') {
						this.scrollTo(0, top);
					} else {
						topOffset = this.pageYOffset;
					}
					break;
				case d:
					if (typeof top === 'number') {
						this.body.scrollTop = top;
					} else {
						topOffset = this.body.scrollTop;
					}
					break;
				default:
					if (typeof top === 'number') {
						this.scrollTop = top;
					} else {
						topOffset = this.scrollTop;
					}
			}
		});
		return typeof top === 'number' ? this : topOffset;
	};

	/**
  * @method scrollLeft
  * @param {number} left offset in px, optional
  * @returns {object|number} current instance of Grindstone or left offset
  * @example
  * $('#selector').scrollLeft();
  * $('#selector').scrollLeft(50);
  * @description
  * Scroll an element to a specific left position relative to its another parent container.
  * Return the current left offset of an element, relative to its parent container.
  */

	$.fn.scrollLeft = function (left) {
		var leftOffset = void 0;
		this.each(function () {
			switch (this) {
				case w:
					if (typeof left === 'number') {
						this.scrollTo(left, 0);
					} else {
						leftOffset = this.pageXOffset;
					}
					break;
				case d:
					if (typeof left === 'number') {
						this.body.scrollLeft = left;
					} else {
						leftOffset = this.body.scrollLeft;
					}
					break;
				default:
					if (typeof left === 'number') {
						this.scrollTop = left;
					} else {
						leftOffset = this.scrollLeft;
					}
			}
		});
		return typeof left === 'number' ? this : leftOffset;
	};

	/**
  * @method submit
  * @param {function} callback optional
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').submit();
  * $('#selector').submit(function(){});
  * @description Submit a form or trigger a function when a form is submitted.
  */

	$.fn.submit = function (callback) {
		if (typeof callback === 'function') {
			this.each(function () {
				$(this).on('submit', callback);
			});
		} else {
			this.each(function () {
				this.submit();
			});
		}
		return this;
	};

	/**
  * @method parent
  * @param {string} selector only get the parent if it matches the selector, optional
  * @returns {object} parent element as a new instance of Grindstone
  * @example
  * $('#selector').parent();
  * $('#selector').parent('.selector');
  * @description Get the parent element as a Grindstone object.
  */

	$.fn.parent = function (selector) {
		return priv.elementProp(this, 'parentNode', selector);
	};

	/**
  * @method next
  * @param {string} selector only get the element if it matches the selector, optional
  * @returns {object} next element as a new instance of Grindstone
  * @example
  * $('#selector').next();
  * $('#selector').next('.selector');
  * @description Get the next element as a Grindstone object.
  */

	$.fn.next = function (selector) {
		return priv.elementProp(this, 'nextSibling', selector);
	};

	/**
  * @method prev
  * @param {string} selector only get the element if it matches the selector, optional
  * @returns {object} previous element as a new instance of Grindstone
  * @example
  * $('#selector').prev();
  * $('#selector').prev('.selector');
  * @description Get the previous element as a Grindstone object.
  */

	$.fn.prev = function (selector) {
		return priv.elementProp(this, 'previousSibling', selector);
	};

	/**
  * @method children
  * @param {string} selector only get the elements if they match the selector, optional
  * @returns {object} child elements as a new instance of Grindstone
  * @example
  * $('#selector').children();
  * $('#selector').children('.selector');
  * @description Get the child elements as a Grindstone object.
  */

	$.fn.children = function (selector) {
		return priv.children(this, 1, selector);
	};

	/**
  * @method contents
  * @returns {object} contents as a new instance of Grindstone
  * @example $('#selector').contents();
  * @description Get all the children as a Grindstone object, including text and comments.
  */

	$.fn.contents = function () {
		return priv.children(this);
	};

	/**
  * @method trigger
  * @param {number} evt custom event
  * @returns {object|number} current instance of Grindstone or top offset
  * @example $('#selector').trigger('myEvent');
  * @description Dispatch a custom event.
  */

	$.fn.trigger = function (evt) {
		var customEvent = new Event(evt);
		this.each(function () {
			this.dispatchEvent(customEvent);
		});
		return this;
	};

	/**
  * @method val
  * @param {string} newValue optional
  * @returns {object|string} current instance of Grindstone or the value of the first element in the set
  * @example
  * $('#selector').val();
  * $('#selector').val('7');
  * @description Return or assign the value of an element.
  */

	$.fn.val = function (newValue) {
		if (newValue && typeof newValue === 'string') {
			this.each(function () {
				this.value = newValue;
			});
			return this;
		} else {
			return this.set[0].value;
		}
	};

	/**
  * @method wrap
  * @param {string} structure
  * @returns {object} current instance of Grindstone
  * @example $('#selector').wrap('<section class="outside"><div class="middle"><div class="inner">');
  * @description Wrap the outer structure of the set of elements.
  */

	$.fn.wrap = function (structure) {
		this.each(function () {
			if (typeof structure === 'string') {
				var contents = this.outerHTML;
				this.outerHTML = structure + contents;
			} else {
				throw new Error('wrap() structure must be a string.');
			}
		});
		return this;
	};

	/**
  * @method wrapInner
  * @param {string} structure
  * @returns {object} current instance of Grindstone
  * @example $('#selector').wrapInner('<section class="outside"><div class="middle"><div class="inner">');
  * @description Wrap the inner structure of the set of elements.
  */

	$.fn.wrapInner = function (structure) {
		this.each(function () {
			if (typeof structure === 'string') {
				var contents = $(this).html();
				$(this).html(structure + contents);
			} else {
				throw new Error('wrapInner() structure must be a string.');
			}
		});
		return this;
	};

	return w.Grindstone = w.$ = $;
})(window, document);