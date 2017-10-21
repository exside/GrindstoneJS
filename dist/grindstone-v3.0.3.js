/**,
* Grindstone JavaScript Library v3.0.3
* https://github.com/dzervoudakes/GrindstoneJS
* 
* Copyright (c) 2014, 2017 Dan Zervoudakes and contributors
* Released under the MIT license
* https://github.com/dzervoudakes/GrindstoneJS/blob/master/LICENSE
*/

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (w, d) {

	/** @namespace Core */

	/**
  * Create new instances of our constructor using familiar, jQuery-style syntax.
  * @function Grindstone
  * @memberof Core
  * @param {string|object} selector
  * @param {string|object} context optional
  * @returns {object} Grindstone
  * @example
  * $('.selector');
  * $('.selector', '#container');
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
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = set[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					for (var child = item.firstChild; child; child = child.nextSibling) {
						if (nodeType === undefined || nodeType === child.nodeType) {
							if (!selector || $(child).is(selector)) newSet.push(child);
						}
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
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
					if (!element) break;
					if (element.nodeType != 1) {
						find = element;
						continue;
					}
					if (!selector || $(element).is(selector)) return element;
					break;
				}
			});
		},
		isElementArray: function isElementArray(obj) {
			return obj instanceof Array;
		},
		matchesFuncName: Element.prototype.matches ? 'matches' : Element.prototype.matchesSelector ? 'matchesSelector' : Element.prototype.webkitMatchesSelector ? 'webkitMatchesSelector' : Element.prototype.mozMatchesSelector ? 'mozMatchesSelector' : Element.prototype.msMatchesSelector ? 'msMatchesSelector' : undefined
	};

	/** @namespace Ajax */

	/**
  * Submit a GET or POST AJAX request.
  * Acceptable properties of "opts" are:
  * - method (GET or POST)
  * - url (data path)
  * - async (true or false)
  * - success (callback to invoke if successful)
  * - error (callback to invoke if unsuccessful)
  * - header (adds a custom HTTP header to the request)
  * - headerValue (value of the custom HTTP header)
  * @method ajax
  * @memberof Ajax
  * @param {object} opts "method" and "url" properties are required here
  * @returns {object} XMLHttpRequest
  * @example
  * $.ajax({ method: 'GET', url: 'data/data.txt' });
  */

	$.ajax = function (opts) {

		if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') throw new Error('XHR properties are not properly defined.');

		var method = opts.method,
		    url = opts.url,
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

	/** @namespace Append */

	/**
  * Append a new element or new content.
  * @method append
  * @memberof Append
  * @param {object|string} element
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').append('#element');
  * $('#selector').append('<p>Hello World</p>');
  */

	$.fn.append = function (element) {
		this.each(function () {
			var _this = this;

			if (typeof element === 'string') {
				if (element.match(/(<).+(>)/)) {
					this.innerHTML += element;
				} else {
					var dom = d.querySelectorAll(element);
					dom = Array.prototype.slice.call(dom);
					dom.forEach(function (item) {
						_this.appendChild(item);
					});
				}
			} else {
				this.appendChild(element);
			}
		});
		return this;
	};

	/** @namespace Attributes */

	/**
  * Set or return the value of the specified attribute.
  * @method attr
  * @memberof Attributes
  * @param {string} attribute
  * @param {string} value optional
  * @returns {object|string} current instance of Grindstone or attribute value
  * @example
  * $('#selector').attr('example');
  * $('#selector').attr('example', 'test');
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
  * Determine if the current element has the specified attribute.
  * @method hasAttr
  * @memberof Attributes
  * @param {string} attribute
  * @returns {boolean}
  * @example $('#selector').hasAttr('example');
  */

	$.fn.hasAttr = function (attribute) {
		var exists = void 0;
		this.each(function () {
			if (attribute) exists = $(this).attr(attribute) !== null;
		});
		return exists;
	};

	/**
  * Remove the the specified attribute.
  * @method removeAttr
  * @memberof Attributes
  * @param {string} attribute
  * @returns {object} current instance of Grindstone
  * @example $('#selector').removeAttr('example');
  */

	$.fn.removeAttr = function (attribute) {
		this.each(function () {
			if (attribute) this.removeAttribute(attribute);
		});
		return this;
	};

	/** @namespace CSS */

	/**
  * Adjust the styles of selected elements or return the requested value.
  * @method css
  * @memberof CSS
  * @param {object|string} styles object with style properties or single style in a string
  * @param {string} value new style value to apply
  * @returns {object|string} current instance of Grindstone or style value
  * @example
  * $('#selector').style('display');
  * $('#selector').style('display', 'block');
  * $('#selector').style({ display: 'block', color: 'red' });
  */

	$.fn.css = function (styles, value) {
		var returnedStyle = void 0,
		    returnStyle = void 0;
		this.each(function () {
			var _this2 = this;

			if ((typeof styles === 'undefined' ? 'undefined' : _typeof(styles)) === 'object') {
				var stl = Object.keys(styles);
				stl.forEach(function (key) {
					_this2.style[key] = styles[key];
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

	/** @namespace Classes */

	/**
  * Determine if the elements have the specified class.
  * @method hasClass
  * @memberof Classes
  * @param {string} cls className
  * @returns {boolean}
  * @example $('#selector').hasClass('example');
  */

	$.fn.hasClass = function (cls) {
		var hasCls = void 0;
		this.each(function () {
			hasCls = this.classList.contains(cls);
		});
		return hasCls;
	};

	/**
  * Add a class to the current set of elements.
  * @method addClass
  * @memberof Classes
  * @param {string} cls className
  * @returns {object} current instance of Grindstone
  * @example $('#selector').addClass('example');
  */

	$.fn.addClass = function (cls) {
		var classes = cls.split(' ');
		this.each(function () {
			var _this3 = this;

			classes.forEach(function (clsName) {
				_this3.classList.add(clsName);
			});
		});
		return this;
	};

	/**
  * Remove a class from the current set of elements.
  * @method removeClass
  * @memberof Classes
  * @param {string} cls className
  * @returns {object} current instance of Grindstone
  * @example $('#selector').removeClass('example');
  */

	$.fn.removeClass = function (cls) {
		var classes = cls.split(' ');
		this.each(function () {
			var _this4 = this;

			classes.forEach(function (clsName) {
				_this4.classList.remove(clsName);
			});
		});
		return this;
	};

	/**
  * Toggle the specified class.
  * @method toggleClass
  * @memberof Classes
  * @param {string} cls className
  * @returns {object} current instance of Grindstone
  * @example $('#selector').toggleClass('example');
  */

	$.fn.toggleClass = function (cls) {
		var classes = cls.split(' ');
		this.each(function () {
			var _this5 = this;

			classes.forEach(function (clsName) {
				_this5.classList.toggle(clsName);
			});
		});
		return this;
	};

	/** @namespace Clone */

	/**
  * Clone the elements in the set.
  * @method clone
  * @memberof Clone
  * @returns {object} current instance of Grindstone
  * @example $('#selector').clone();
  */

	$.fn.clone = function () {
		return this.map(function () {
			return this.cloneNode(true);
		});
	};

	/** @namespace Data */

	/**
  * Assign a data-value to a set of elements or return the current value of an element.
  * @method data
  * @memberof Data
  * @param {string} valueName
  * @param {string} newValue optional
  * @returns {object|string} current instance of Grindstone or the current data-value of an element
  * @example
  * $('#selector').data('name');
  * $('#selector').data('name', 'value');
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
  * Remove a data-value from a set of elements.
  * @method removeData
  * @memberof Data
  * @param {string} valueName
  * @returns {object} current instance of Grindstone
  * @example $('#selector').removeData('name');
  */

	$.fn.removeData = function (valueName) {
		this.each(function () {
			$(this).removeAttr('data-' + valueName);
		});
		return this;
	};

	/** @namespace Debounce */

	/**
  * Debounce a given function.
  * @method debounce
  * @memberof Debounce
  * @param {function} fn function to debounce
  * @param {number} wait delay in ms
  * @param {boolean} immediate invoke immediately, optional
  * @returns {function}
  * @example $.debounce(function(){}, 300);
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

	/** @namespace Dimensions */

	/**
  * Adjust the height of the selected elements or return the current height value of the first element in the set.
  * @method height
  * @memberof Dimensions
  * @param {number} num px, optional
  * @returns {object|number} current instance of Grindstone or current height of the first element in the set
  * @example
  * $('#selector').height();
  * $('#selector').height(30);
  */

	$.fn.height = function (num) {
		if (typeof num === 'number' || num === 0) {
			this.each(function () {
				this.style.height = num + 'px';
			});
			return this;
		} else {
			if (this.set[0] === d) {
				return d.body.clientHeight;
			} else if (this.set[0] === w) {
				return w.innerHeight;
			} else {
				return this.set[0].offsetHeight;
			}
		}
	};

	/**
  * Adjust the width of the selected elements or return the current width value of the first element in the set.
  * @method width
  * @memberof Dimensions
  * @param {number} num px, optional
  * @returns {object|number} current instance of Grindstone or current width of the first element in the set
  * @example
  * $('#selector').width();
  * $('#selector').width(30);
  */

	$.fn.width = function (num) {
		if (typeof num === 'number' || num === 0) {
			this.each(function () {
				this.style.width = num + 'px';
			});
			return this;
		} else {
			if (this.set[0] === d) {
				return d.body.clientWidth;
			} else if (this.set[0] === w) {
				return w.innerWidth;
			} else {
				return this.set[0].offsetWidth;
			}
		}
	};

	/** @namespace Display */

	/**
  * Show a set of hidden elements.
  * @method show
  * @memberof Display
  * @param {delay} delay ms, optional
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').show();
  * $('#selector').show(100);
  */

	$.fn.show = function (delay) {
		var _this6 = this;

		if (delay) {
			setTimeout(function () {
				$.fn.show.call(_this6);
			}, delay);
		} else {
			this.each(function () {
				if (this.style.display === 'none') {
					this.style.display = $(this).data('_prevdisplay') || '';
					$(this).removeData('_prevdisplay');
				}
			});
		}
		return this;
	};

	/**
  * Hide a set of elements.
  * @method hide
  * @memberof Display
  * @param {delay} delay ms, optional
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').hide();
  * $('#selector').hide(100);
  */

	$.fn.hide = function (delay) {
		var _this7 = this;

		if (delay) {
			setTimeout(function () {
				$.fn.hide.call(_this7);
			}, delay);
		} else {
			this.each(function () {
				if (this.style.display !== 'none') {
					if (this.style.display) $(this).data('_prevdisplay', this.style.display);
					this.style.display = 'none';
				}
			});
		}
		return this;
	};

	/** @namespace DoubleTap */

	/**
  * Trigger a function by double-tapping or double-clicking.
  * @method doubleTap
  * @memberof DoubleTap
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example $('#selector').doubleTap(function(){});
  */

	$.fn.doubleTap = function (callback) {
		var active = void 0,
		    interaction = void 0;
		this.each(function () {
			active = false;
			interaction = priv.createInteraction('touchend', 'click');
			$(this).on(interaction, function () {
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

	/** @namespace Each */

	/**
  * Iterate through each item in the set and execute the callback.
  * @method each
  * @memberof Each
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example $('.selector').each(function(){});
  */

	$.fn.each = function (callback) {
		var set = this.set;
		set = Array.prototype.slice.call(set);
		set.forEach(function (item) {
			callback.call(item);
		});
		return this;
	};

	/** @namespace Eq */

	/**
  * Return the DOM element at the specified index of the current as a new instance of Grindstone.
  * @method eq
  * @memberof Eq
  * @param {number} index
  * @returns {object} new set in a Grindstone instance containing the specified element
  * @example $('.selector').eq(2);
  */

	$.fn.eq = function (index) {
		return $(this.set[index]);
	};

	/** @namespace Events */

	/**
  * Assign an event listener.
  * @method on
  * @memberof Events
  * @param {string} action event(s)
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').on('change', function(){});
  * $('#selector').on('click touchend', function(){});
  */

	$.fn.on = function (action, callback) {
		this.each(function () {
			var _this8 = this;

			var events = action.split(' ');
			events.forEach(function (evt) {
				_this8.addEventListener(evt, callback, false);
			});
		});
		return this;
	};

	/**
  * Remove an event listener.
  * @method off
  * @memberof Events
  * @param {string} action event(s)
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').off('change', function(){});
  * $('#selector').off('click touchend', function(){});
  */

	$.fn.off = function (action, callback) {
		this.each(function () {
			var _this9 = this;

			var events = action.split(' ');
			events.forEach(function (evt) {
				_this9.removeEventListener(evt, callback, false);
			});
		});
		return this;
	};

	/** @namespace Filtering */

	/**
  * Check if any of the elements match the given selector or callback function.
  * @method is
  * @memberof Filtering
  * @param {string|function} filterBy selector or callback function, return true to include
  * @returns {boolean} true if at least one of the elements matches the given selector
  * @example $('.selector').is('.visible');
  */

	$.fn.is = function (filterBy) {
		if (typeof filterBy === 'function') {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var item = _step2.value;

					if (filterBy.call(item, this.indexOf(item), item)) return true;
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		} else {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var _item = _step3.value;

					if (_item[priv.matchesFuncName](filterBy)) return true;
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}
		}
		return false;
	};

	/**
  * Map each element to an array of values.
  * @method map
  * @memberof Filtering
  * @param {function} callback return the value to be included, or null or undefined to skip
  * @returns {object} Grindstone object of included values returned from the callback
  * @example $(array).map(function(item){});
  */

	$.fn.map = function (callback) {
		var newSet = $();
		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = this[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var item = _step4.value;

				var ret = callback.call(item);
				if (ret !== undefined && ret !== null) newSet.push(ret);
			}
		} catch (err) {
			_didIteratorError4 = true;
			_iteratorError4 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion4 && _iterator4.return) {
					_iterator4.return();
				}
			} finally {
				if (_didIteratorError4) {
					throw _iteratorError4;
				}
			}
		}

		return newSet;
	};

	/**
  * Filter the elements by the selector or callback function.
  * @method filter
  * @memberof Filtering
  * @param {string|function} filterBy selector or callback function, return true to include
  * @returns {object} new instance of Grindstone with the reduced set of matching elements
  * @example $('.selector').filter('.visible');
  */

	$.fn.filter = function (filterBy) {
		return $.fn.map.call(this, function () {
			if ($(this).is(filterBy)) return this;
		});
	};

	/**
  * Excludes matching elements and includes non-matching elements.
  * @method not
  * @memberof Filtering
  * @param {string|function} filterBy selector or callback function, return true to include
  * @returns {object} new instance of Grindstone with the reduced set of not matching elements
  * @example $('.selector').not('.hidden');
  */

	$.fn.not = function (filterBy) {
		return $.fn.map.call(this, function () {
			if (!$(this).is(filterBy)) return this;
		});
	};

	/**
  * Get the first element.
  * @method first
  * @memberof Filtering
  * @returns {object} new instance of Grindstone with the first element of the original set
  * @example $('.selector').first();
  */

	$.fn.first = function () {
		return $(this.set[0]);
	};

	/**
  * Get the last element.
  * @method last
  * @memberof Filtering
  * @returns {object} new instance of Grindstone with the last element of the original set
  * @example $('.selector').last();
  */

	$.fn.last = function () {
		return $(this.set[this.set.length - 1]);
	};

	/** @namespace Focus */

	/**
  * Focus on the first element in the set or trigger a callback when some element is focused on.
  * @method focus
  * @memberof Focus
  * @param {function} callback optional
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').focus();
  * $('#selector').focus(function(){});
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

	/** @namespace Get */

	/**
  * Return the DOM element at the specified index of the current set.
  * @method get
  * @memberof Get
  * @param {number} index
  * @returns {object} the DOM element
  * @example $('.selector').get(2);
  */

	$.fn.get = function (index) {
		return this.set[index];
	};

	/** @namespace HTML */

	/**
  * Replace an element's innerHTML or return the current innerHTML.
  * @method html
  * @memberof HTML
  * @param {string} content optional
  * @returns {object|string} current instance of Grindstone or current innerHTML of an element
  * @example
  * $('#selector').html();
  * $('#selector').html('<p>Hello World</p>');
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

	/** @namespace Insert */

	/**
  * Insert new content before a target element.
  * @method before
  * @memberof Insert
  * @param {string|object} content
  * @returns {object} current instance of Grindstone
  * @example $('#selector').before('<p>Hello World</p>');
  */

	$.fn.before = function (content) {
		this.each(function () {
			var _this10 = this;

			if (typeof content === 'string') {
				if (content.match(/(<).+(>)/)) {
					this.insertAdjacentHTML('beforebegin', content);
				} else {
					var dom = d.querySelectorAll(content);
					dom = Array.prototype.slice.call(dom);
					dom.forEach(function (item) {
						_this10.parentNode.insertBefore(item, self);
					});
				}
			} else {
				this.parentNode.insertBefore(content, this);
			}
		});
		return this;
	};

	/**
  * Insert new content after a target element.
  * @method after
  * @memberof Insert
  * @param {string|object} content
  * @returns {object} current instance of Grindstone
  * @example $('#selector').after('<p>Hello World</p>');
  */

	$.fn.after = function (content) {
		this.each(function () {
			var _this11 = this;

			if (typeof content === 'string') {
				if (content.match(/(<).+(>)/)) {
					this.insertAdjacentHTML('afterend', content);
				} else {
					var dom = d.querySelectorAll(content);
					dom = Array.prototype.slice.call(dom);
					dom.forEach(function (item) {
						_this11.parentNode.insertBefore(item, self.nextSibling);
					});
				}
			} else {
				this.parentNode.insertBefore(content, this.nextSibling);
			}
		});
		return this;
	};

	/** @namespace Mouseable */

	/**
  * Create hover and active states.
  * @method mouseable
  * @memberof Mouseable
  * @param {object} classes optional
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').mouseable();
  * $('#selector').mouseable({ hoverClass: 'stuff', activeClass: 'things' });
  */

	$.fn.mouseable = function () {
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { hoverClass: 'over', activeClass: 'down' },
		    _ref$hoverClass = _ref.hoverClass,
		    hoverClass = _ref$hoverClass === undefined ? 'over' : _ref$hoverClass,
		    _ref$activeClass = _ref.activeClass,
		    activeClass = _ref$activeClass === undefined ? 'down' : _ref$activeClass;

		var events = {
			hover: priv.createInteraction('touchstart', 'mouseenter'),
			remove: priv.createInteraction('touchend', 'mouseleave'),
			down: priv.createInteraction('touchstart', 'mousedown'),
			up: priv.createInteraction('touchend', 'mouseup mouseleave')
		};

		this.each(function () {
			var _this12 = this;

			$(this).on(events.hover, function () {
				$(_this12).addClass(hoverClass);
			}).on(events.remove, function () {
				$(_this12).removeClass(hoverClass);
			}).on(events.down, function () {
				$(_this12).addClass(activeClass);
			}).on(events.up, function () {
				$(_this12).removeClass(activeClass);
			});
		});

		return this;
	};

	/** @namespace Offset */

	/**
  * Return the left or top value of the selector, relative to the document.
  * @method offset
  * @memberof Offset
  * @param {string} position 'left' or 'top'
  * @returns {number} offset value in px
  * @example
  * $('#selector').offset('left');
  * $('#selector').offset('right');
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
					} while (el = el.offsetParent);
					return offsetLeft;
				} else if (position === 'top') {
					var offsetTop = 0;
					do {
						if (!isNaN(el.offsetTop)) offsetTop += el.offsetTop;
					} while (el = el.offsetParent);
					return offsetTop;
				}
			}
		} else {
			throw new Error('offset() position must be a string: acceptable values are "left" and "top".');
		}
	};

	/** @namespace Prepend */

	/**
  * Prepend a new element or new content.
  * @method prepend
  * @memberof Prepend
  * @param {object|string} element
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').prepend('#element');
  * $('#selector').prepend('<p>Hello World</p>');
  */

	$.fn.prepend = function (element) {
		this.each(function () {
			var _this13 = this;

			if (typeof element === 'string') {
				if (element.match(/(<).+(>)/)) {
					this.insertAdjacentHTML('afterbegin', element);
				} else {
					var dom = d.querySelectorAll(element);
					dom = Array.prototype.slice.call(dom);
					dom.forEach(function (item) {
						_this13.insertBefore(item, self.firstChild);
					});
				}
			} else {
				this.insertBefore(element, this.firstChild);
			}
		});
		return this;
	};

	/** @namespace Ready */

	/**
  * Trigger a function when the DOM content is loaded.
  * @method ready
  * @memberof Ready
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example $(document).ready(function(){});
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
  * Trigger a function on the load event.
  * @method load
  * @memberof Ready
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example $(window).load(function(){});
  */

	$.fn.load = function (callback) {
		if (typeof callback === 'function') {
			this.each(function () {
				$(this).on('load', callback);
			});
		}
		return this;
	};

	/** @namespace Remove */

	/**
  * Remove elements from the DOM.
  * @method remove
  * @memberof Remove
  * @param {object} target element(s), optional
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').remove();
  * $('#selector').remove('.selector');
  */

	$.fn.remove = function (target) {
		if (target) {
			var elems = d.querySelectorAll(target);
			elems = Array.prototype.slice.call(elems);
			this.each(function () {
				var _this14 = this;

				elems.forEach(function (el) {
					_this14.removeChild(el);
				});
			});
		} else {
			this.each(function () {
				this.parentNode.removeChild(this);
			});
		}
		return this;
	};

	/** @namespace ReplaceWith */

	/**
  * Replace an element with some other content.
  * @method replaceWith
  * @memberof ReplaceWith
  * @param {object|string} content
  * @returns {object} current instance of Grindstone
  * @example $('#selector').replaceWith('<p>Hello World</p>');
  */

	$.fn.replaceWith = function (content) {
		this.each(function () {
			this.outerHTML = content ? content : '';
		});
		return this;
	};

	/** @namespace Resize */

	/**
  * Capture the resize event from a set of elements and execute a function.
  * @method resize
  * @memberof Resize
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example $(window).resize(function(){});
  */

	$.fn.resize = function (callback) {
		if (typeof callback === 'function') {
			this.each(function () {
				$(this).on('resize', callback);
			});
		}
		return this;
	};

	/** @namespace Scroll */

	/**
  * Listen for the scroll event and trigger a function.
  * @method scroll
  * @memberof Scroll
  * @param {function} callback
  * @returns {object} current instance of Grindstone
  * @example $(window).scroll(function(){});
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
  * Scroll an element to a specific top position relative to its another parent container.
  * Return the current top offset of an element, relative to its parent container.
  * @method scrollTop
  * @memberof Scroll
  * @param {number} top offset in px, optional
  * @returns {object|number} current instance of Grindstone or top offset
  * @example
  * $('#selector').scrollTop();
  * $('#selector').scrollTop(50);
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
  * Scroll an element to a specific left position relative to its another parent container.
  * Return the current left offset of an element, relative to its parent container.
  * @method scrollLeft
  * @memberof Scroll
  * @param {number} left offset in px, optional
  * @returns {object|number} current instance of Grindstone or left offset
  * @example
  * $('#selector').scrollLeft();
  * $('#selector').scrollLeft(50);
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

	/** @namespace Submit */

	/**
  * Submit a form or trigger a function when a form is submitted.
  * @method submit
  * @memberof Submit
  * @param {function} callback optional
  * @returns {object} current instance of Grindstone
  * @example
  * $('#selector').submit();
  * $('#selector').submit(function(){});
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

	/** @namespace Traversing */

	/**
  * Get the parent element as a Grindstone object.
  * @method parent
  * @memberof Traversing
  * @param {string} selector only get the parent if it matches the selector, optional
  * @returns {object} parent element as a new instance of Grindstone
  * @example
  * $('#selector').parent();
  * $('#selector').parent('.selector');
  */

	$.fn.parent = function (selector) {
		return priv.elementProp(this, 'parentNode', selector);
	};

	/**
  * Get the next element as a Grindstone object.
  * @method next
  * @memberof Traversing
  * @param {string} selector only get the element if it matches the selector, optional
  * @returns {object} next element as a new instance of Grindstone
  * @example
  * $('#selector').next();
  * $('#selector').next('.selector');
  */

	$.fn.next = function (selector) {
		return priv.elementProp(this, 'nextSibling', selector);
	};

	/**
  * Get the previous element as a Grindstone object.
  * @method prev
  * @memberof Traversing
  * @param {string} selector only get the element if it matches the selector, optional
  * @returns {object} previous element as a new instance of Grindstone
  * @example
  * $('#selector').prev();
  * $('#selector').prev('.selector');
  */

	$.fn.prev = function (selector) {
		return priv.elementProp(this, 'previousSibling', selector);
	};

	/**
  * Get the child elements as a Grindstone object.
  * @method children
  * @memberof Traversing
  * @param {string} selector only get the elements if they match the selector, optional
  * @returns {object} child elements as a new instance of Grindstone
  * @example
  * $('#selector').children();
  * $('#selector').children('.selector');
  */

	$.fn.children = function (selector) {
		return priv.children(this, 1, selector);
	};

	/**
  * Get all the children as a Grindstone object, including text and comments.
  * @method contents
  * @memberof Traversing
  * @returns {object} contents as a new instance of Grindstone
  * @example $('#selector').contents();
  */

	$.fn.contents = function () {
		return priv.children(this);
	};

	/** @namespace Trigger */

	/**
  * Dispatch a custom event.
  * @method trigger
  * @memberof Trigger
  * @param {number} evt custom event
  * @returns {object|number} current instance of Grindstone or top offset
  * @example $('#selector').trigger('myEvent');
  */

	$.fn.trigger = function (evt) {
		var customEvent = new Event(evt);
		this.each(function () {
			this.dispatchEvent(customEvent);
		});
		return this;
	};

	/** @namespace Value */

	/**
  * Return or assign the value of an element.
  * @method val
  * @memberof Value
  * @param {string} newValue optional
  * @returns {object|string} current instance of Grindstone or the value of the first element in the set
  * @example
  * $('#selector').val();
  * $('#selector').val('7');
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

	/** @namespace Wrap */

	/**
  * Wrap the outer structure of the set of elements.
  * @method wrap
  * @memberof Wrap
  * @param {string} structure
  * @returns {object} current instance of Grindstone
  * @example $('#selector').wrap('<section class="outside"><div class="middle"><div class="inner">');
  */

	$.fn.wrap = function (structure) {
		this.each(function () {
			if (typeof structure === 'string' && structure.startsWith('<') && structure.endsWith('>')) {
				var contents = this.outerHTML;
				this.outerHTML = structure + contents;
			} else {
				throw new Error('wrap() structure must be a string that denotes an HTML container starting with "<" and ending with ">".');
			}
		});
		return this;
	};

	/**
  * Wrap the inner structure of the set of elements.
  * @method wrapInner
  * @memberof Wrap
  * @param {string} structure
  * @returns {object} current instance of Grindstone
  * @example $('#selector').wrapInner('<section class="outside"><div class="middle"><div class="inner">');
  */

	$.fn.wrapInner = function (structure) {
		this.each(function () {
			if (typeof structure === 'string' && structure.startsWith('<') && structure.endsWith('>')) {
				var contents = $(this).html();
				$(this).html(structure + contents);
			} else {
				throw new Error('wrapInner() structure must be a string that denotes an HTML container starting with "<" and ending with ">".');
			}
		});
		return this;
	};

	return w.Grindstone = w.$ = $;
})(window, document);