/**
 * Grindstone JavaScript Library v3.0.0
 * https://github.com/dzervoudakes/GrindstoneJS
 * 
 * Copyright (c) 2014, 2017 Dan Zervoudakes and contributors
 * Released under the MIT license
 * https://github.com/dzervoudakes/GrindstoneJS/blob/master/LICENSE
 */

((w, d) => {

'use strict';

/**
 * Library core: constructor, prototype
 * @param {string|object} selector
 * @param {string|object} context - optional
 * @returns {object} Grindstone
 */
	
	const Grindstone = (selector, context) => {
		const set = this;
		if (selector) {
			let ctx, elems;
			if (typeof selector === 'string') {
				if (context) {
					if (typeof context === 'string') {
						ctx = d.querySelectorAll(context);
					} else if (priv.isElementArray(context)) {
						ctx = context;
					} else {
						ctx = [context];
					}
					Array.prototype.forEach.call(ctx, item => {
						elems = item.querySelectorAll(selector);
						Array.prototype.forEach.call(elems, el => {
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
	
	const $ = (selector, context) => {
		return new Grindstone(selector, context);
	};
	
	$.fn = Grindstone.prototype;

	// private functions
	const priv = {
		children: (set, nodeType, selector) => {
			const newSet = $();
			for (let i = 0; i < set.length; i++) {
				for (let child = set[i].firstChild; child; child = child.nextSibling) {
					if (nodeType === undefined || nodeType === child.nodeType) {
						if (!selector || $(child).is(selector)) newSet.push(child);
					}
				}
			}
			return newSet;
		},
		createInteraction: (touchEvt, mouseEvt) => {
			return 'ontouchend' in d ? touchEvt : mouseEvt;
		},
		elementProp: (set, propName, selector) => {
			return $.fn.map.call(set, () => {
				let find = this;
				while (true) {
					const element = find[propName];
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
		isElementArray: obj => {
			return obj instanceof Array;
		},
		matchesFuncName: Element.prototype.matches ? 'matches' :
			Element.prototype.matchesSelector ? 'matchesSelector' :
			Element.prototype.webkitMatchesSelector ? 'webkitMatchesSelector' :
			Element.prototype.mozMatchesSelector ? 'mozMatchesSelector' :
			Element.prototype.msMatchesSelector ? 'msMatchesSelector' : 
			undefined
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

	$.ajax = opts => {
		
		let { method, url, async, success, error, header, headerValue } = opts;

		if (typeof opts !== 'object') throw new Error('XHR properties are not properly defined.');

		method   	= method !== undefined   	? method   	  : null;
		url      	= url !== undefined      	? url      	  : null;
		async    	= async !== undefined    	? async    	  : true;
		success  	= success !== undefined  	? success  	  : () => {};
		error    	= error !== undefined	 	? error	 	  : () => {};
		header 	 	= header !== undefined 	 	? header 	  : 'Content-Type';
		headerValue = headerValue !== undefined ? headerValue : 'application/x-www-form-urlencoded; charset=UTF-8';
		
		const xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = () => {
			let func;
			if (xmlhttp.readyState === 4) func = (xmlhttp.status === 200) ? success(xmlhttp) : error(xmlhttp);
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

	$.fn.append = element => {
		this.each(() => {
			if (typeof element === 'string') {
				if (element.match(/(<).+(>)/)) {
					this.innerHTML += element;
				} else {
					const self = this;
					let dom = d.querySelectorAll(element);
					dom = Array.prototype.slice.call(dom);
					dom.forEach(item => {
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
 * Set or return the value of the specified attribute
 * @param {string} attribute
 * @param {string} value - optional
 * @returns {object|string} current instance of Grindstone or attribute value
 */

	$.fn.attr = (attribute, value) => {
		let elemAttribute;
		this.each(() => {
			if (value || value === '') {
				this.setAttribute(attribute, value);
			} else {
				elemAttribute = this.getAttribute(attribute);
			}
		});
		return value ? this : elemAttribute;
	};

/**
 * Determine if the current element has the specified attribute
 * @param {string} attribute
 * @returns {boolean} true or false
 */

	$.fn.hasAttr = attribute => {
		let exists;
		this.each(() => {
			if (attribute) exists = $(this).attr(attribute) !== null;
		});
		return exists;
	};

/**
 * Remove the the specified attribute
 * @param {string} attribute
 * @returns {object} current instance of Grindstone
 */

	$.fn.removeAttr = attribute => {
		this.each(() => {
			if (attribute) this.removeAttribute(attribute);
		});
		return this;
	};

/**
 * Adjust the styles of selected elements or return the requested value
 * @param {object|string} styles - style properties
 * @param {string} value - style value
 * @returns {object|string} current instance of Grindstone or style value
 */

	$.fn.css = (styles, value) => {
		let returnedStyle, returnStyle;
		this.each(() => {
			if (typeof styles === 'object') {
				const self = this;
				const stl = Object.keys(styles);
				stl.forEach((key) => {
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
 * Determine if the elements have the specified class
 * @param {string} cls - className
 * @returns {boolean} true or false
 */

	$.fn.hasClass = cls => {
		let hasCls;
		this.each(() => {
			hasCls = this.classList.contains(cls);
		});
		return hasCls;
	};

/**
 * Add a class to the current set of elements
 * @param {string} cls - className
 * @returns {object} current instance of Grindstone
 */

	$.fn.addClass = cls => {
		const classes = cls.split(' ');
		this.each(() => {
			const self = this;
			classes.forEach(clsName => {
				self.classList.add(clsName);
			});
		});
		return this;
	};

/**
 * Remove a class from the current set of elements
 * @param {string} cls - className
 * @returns {object} current instance of Grindstone
 */

	$.fn.removeClass = cls => {
		const classes = cls.split(' ');
		this.each(() => {
			const self = this;
			classes.forEach(clsName => {
				self.classList.remove(clsName);
			});
		});
		return this;
	};

/**
 * Toggle the specified class
 * @param {string} cls - className
 * @returns {object} current instance of Grindstone
 */

	$.fn.toggleClass = cls => {
		const classes = cls.split(' ');
		this.each(() => {
			const self = this;
			classes.forEach(clsName => {
				self.classList.toggle(clsName);
			});
		});
		return this;
	};

/**
 * Clone the elements in the set
 * @returns {object} the cloned elements as a new instance of Grindstone
 */
 
	$.fn.clone = () => {
		return this.map(() => {
			return this.cloneNode(true);
		});
	};

/**
 * Assign a data-value to a set of elements or return the current value of an element
 * @param {string} valueName - data property
 * @param {string} valueContent - new value, optional
 * @returns {object|number} current instance of Grindstone or the current data-value of an element
 */

	$.fn.data = (valueName, valueContent) => {
		if (valueContent) {
			this.each(() => {
				$(this).attr(`data-${valueName}`, valueContent);
			});
			return this;
		} else {
			let elemValue;
			this.each(() => {
				elemValue = $(this).attr(`data-${valueName}`);
			});
			return elemValue;
		}
	};

/**
 * Remove a data-value from a set of elements
 * @param {string} valueName - data property
 * @returns {object} current instance of Grindstone
 */

	$.fn.removeData = valueName => {
		this.each(() => {
			$(this).removeAttr(`data-${valueName}`);
		});
		return this;
	};

/**
 * Debounce a given function
 * @param {function} fn - function to debounce
 * @param {number} wait - wait time in milliseconds
 * @param {boolean} immediate - invoke immediately?
 * @returns {function} invoke debounce
 */

	$.debounce = (fn, wait, immediate) => {
		let timeout;
		const debounce = () => {
			const context = this;
			const args = arguments;
			const later = () => {
				timeout = null;
				if (!immediate) fn.apply(context, args);
			};
			const callNow = immediate && !timeout;
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

	$.fn.height = num => {
		if (typeof num === 'number' || num === 0) {
			this.each(() => {
				this.style.height = `${num}px`;
			});
			return this;
		} else {
			const self = this.set[0];
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
 * Adjust the width of the selected elements or return the current width value of the first element in the set
 * @param {number} num - new width in px, optional
 * @returns {object|number} current instance of Grindstone or current width of the first element in the set
 */

	$.fn.width = num => {
		if (typeof num === 'number' || num === 0) {
			this.each(() => {
				this.style.width = `${num}px`;
			});
			return this;
		} else {
			const self = this.set[0];
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
 * Show a set of hidden elements
 * @param {delay} delay - in milliseconds, optional
 * @returns {object} current instance of Grindstone
 */

	$.fn.show = delay => {
		if (delay) {
			const self = this;
			setTimeout(() => {
				$.fn.show.call(self);
			}, delay);
		} else {
			this.each(() => {
				if (this.style.display === 'none') {
					this.style.display = $(this).data('_prevdisplay') || '';
					$(this).removeData('_prevdisplay');
				}
			});
		}
		return this;
	};

/**
 * Hide a set of elements
 * @param {delay} delay - in milliseconds, optional
 * @returns {object} current instance of Grindstone
 */

	$.fn.hide = delay => {
		if (delay) {
			const self = this;
			setTimeout(() => {
				$.fn.hide.call(self);
			}, delay);
		} else {
			this.each(() => {
				if (this.style.display !== 'none') {
					if (this.style.display) $(this).data('_prevdisplay', this.style.display);
					this.style.display = 'none';
				}
			});
		}
		return this;
	};

/**
 * Trigger a function by double-tapping or double-clicking
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

	$.fn.doubleTap = callback => {
		let active, int;
		this.each(() => {
			active = false;
			int = priv.createInteraction('touchend', 'click');
			$(this).on(int, () => {
				if (active) {
					callback();
					return active = false;
				}
				active = true;
				setTimeout(() => {
					return active = false;
				}, 350);
			});
		});
		return this;
	};

/**
 * Iterate through each item in the set and execute the callback
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */
	
	$.fn.each = callback => {
		let set = this.set;
		set = Array.prototype.slice.call(set);
		set.forEach(item => {
			callback.call(item);
		});
		return this;
	};
 
/**
 * Return the DOM element at the specified index of the current as a new instance of Grindstone
 * @param {number} index
 * @returns {object} new instance of Grindstone specific to one element
 */

	$.fn.eq = index => {
		return $(this.set[index]);
	};

/**
 * Assign an event listener
 * @param {string} action - event(s)
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

	$.fn.on = (action, callback) => {
		this.each(() => {
			const self = this;
			const events = action.split(' ');
			events.forEach(evt => {
				self.addEventListener(evt, callback, false);
			});
		});
		return this;
	};

/**
 * Remove an event listener
 * @param {string} action - event(s)
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

	$.fn.off = (action, callback) => {
		this.each(() => {
			const self = this;
			const events = action.split(' ');
			events.forEach(evt => {
				self.removeEventListener(evt, callback, false);
			});
		});
		return this;
	};

/**
 * Check if any of the elements match the given selector or callback function
 * @param {string|function} filterBy - selector or callback function, return true to include
 * @returns {boolean} true if at least one of the elements matches the given selector
 */

	$.fn.is = filterBy => {
        if (typeof filterBy === 'function') {
            for (let i = 0; i < this.length; i++) {
                if (filterBy.call(this[i], i, this[i])) return true;
            }
        } else {
            for (let i = 0; i < this.length; i++) {
                if (this[i][priv.matchesFuncName](filterBy)) return true;
            }
        }
		return false;
	};

/**
 * Map each element to an array of values
 * @param {function} callback - return the value to be included, or null or undefined to skip
 * @returns {object} Grindstone object of included values returned from the callback
 */

	$.fn.map = callback => {
        const newSet = $();
        for (let i = 0; i < this.length; i++) {
            let ret = callback.call(this[i]);
            if (ret !== undefined && ret !== null) newSet.push(ret);
        }
        return newSet;
	};

/**
 * Filter the elements by the selector or callback function
 * @param {string|function} filterBy - selector or callback function, return true to include
 * @returns {object} new instance of Grindstone with the reduced set of matching elements
 */

	$.fn.filter = filterBy => {
        return $.fn.map.call(this, () => {
            if ($(this).is(filterBy)) return this;
        });
	};

/**
 * Excludes matching elements and includes non-matching elements
 * @param {string|function} filterBy - selector or callback function, return true to include
 * @returns {boolean} new instance of Grindstone with the reduced set of not matching elements
 */

	$.fn.not = filterBy => {
        return $.fn.map.call(this, () => {
            if (!$(this).is(filterBy)) return this;
        });
	};

/**
 * Get the first element
 * @returns {object} new instance of Grindstone with the first element
 */

    $.fn.first = () => {
        return $(this.set[0]);
    };

/**
 * Get the last element
 * @returns {object} new instance of Grindstone with the last element
 */

    $.fn.last = () => {
        return $(this.set[this.set.length - 1]);
    };

/**
 * Focus on the first element in the set or trigger a callback when some element is focused on
 * @param {function} callback - optional
 * @returns {object} current instance of Grindstone
 */
	
	$.fn.focus = callback => {
		if (typeof callback === 'function') {
			this.each(() => {
				$(this).on('focus', callback);
			});
		} else {
			this.set[0].focus();
		}
		return this;
	};

/**
 * Return the DOM element at the specified index of the current set
 * @param {number} index
 * @returns {object} the DOM element
 */

	$.fn.get = index => {
		return this.set[index];
	};

/**
 * Replace an element's inner HTML or return the current value
 * @param {string} content - optional
 * @returns {object|string} current instance of Grindstone or current value of an element's inner HTML
 */

	$.fn.html = content => {
		let text;
		this.each(() => {
			if (content || content === '') {
				this.innerHTML = content;
			} else {
				text = this.innerHTML;
			}
		});
		return content ? this : text;
	};
 
/**
 * Insert new content before a target element
 * @param {string|object} content
 * @returns {object} current instance of Grindstone
 */

	$.fn.before = content => {
		this.each(() => {
			if (typeof content === 'string') {
				if (content.match(/(<).+(>)/)) {
					this.insertAdjacentHTML('beforebegin', content);
				} else {
					const self = this;
					let dom = d.querySelectorAll(content);
					dom = Array.prototype.slice.call(dom);
					dom.forEach(item => {
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
 * Insert new content after a target element
 * @param {string|object} content
 * @returns {object} current instance of Grindstone
 */

	$.fn.after = content => {
		this.each(() => {
			if (typeof content === 'string') {
				if (content.match(/(<).+(>)/)) {
					this.insertAdjacentHTML('afterend', content);
				} else {
					const self = this;
					let dom = d.querySelectorAll(content);
					dom = Array.prototype.slice.call(dom);
					dom.forEach(item => {
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
 * Create hover and active states
 * @param {object} classes - hoverClass => value, activeClass => value, optional
 * @returns {object} current instance of Grindstone
 */

	$.fn.mouseable = (classes) => {
		
		let { hoverClass, activeClass } = classes;

		if (classes && typeof classes !== 'object') throw new Error('Classes parameter for mouseable() must be an object with properties "hoverClass" and/or "activeClass".');
		hoverClass  = classes && hoverClass !== undefined  ? classes['hoverClass']  : 'over';
		activeClass = classes && activeClass !== undefined ? classes['activeClass'] : 'down';
		
		const events = {
			hover:  priv.createInteraction('touchstart', 'mouseenter'),
			remove: priv.createInteraction('touchend', 'mouseleave'),
			down:   priv.createInteraction('touchstart', 'mousedown'),
			up: 	priv.createInteraction('touchend', 'mouseup mouseleave')
		};
		
		this.each(() => {

			$(this)
				.on(events.hover, () => {
					$(this).addClass(hoverClass);
				})
				.on(events.remove, () => {
					$(this).removeClass(hoverClass);
				})
				.on(events.down, () => {
					$(this).addClass(activeClass);
				})
				.on(events.up, () => {
					$(this).removeClass(activeClass);
				});
		});
		
		return this;
	};

/**
 * Return the left or top value of the selector, relative to the document
 * @param {string} position - "left" or "top"
 * @returns {number} offset value in px
 */

	$.fn.offset = position => {
		if (position && typeof position === 'string') {
			if (position !== 'left' && position !== 'top') {
				throw new Error('offset() position must be either "left" or "top".');
			} else {	
				let el = this.set[0];
				if (position === 'left') {
					let offsetLeft = 0;
					do {
						if (!isNaN(el.offsetLeft)) offsetLeft += el.offsetLeft;
					} while (el === el.offsetParent);
					return offsetLeft;
				} else if (position === 'top') {
					let offsetTop = 0;
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

	$.fn.prepend = element => {
		this.each(() => {
			if (typeof element === 'string') {
				if (element.match(/(<).+(>)/)) {
					this.insertAdjacentHTML('afterbegin', element);
				} else {
					const self = this;
					let dom = d.querySelectorAll(element);
					dom = Array.prototype.slice.call(dom);
					dom.forEach(item => {
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
 * Trigger a function when the DOM content is loaded
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

	$.fn.ready = callback => {
		if (typeof callback === 'function') {
			this.each(() => {
				$(this).on('DOMContentLoaded', callback);
			});
		}
		return this;
	};

/**
 * Trigger a function on the load event
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

	$.fn.load = callback => {
		if (typeof callback === 'function') {
			this.each(() => {
				$(this).on('load', callback);
			});
		}
		return this;
	};

/**
 * Remove elements from the DOM
 * @param {object} target - target element(s), optional: if omitted, the element(s) invoking this method will be removed
 * @returns {object} current instance of Grindstone
 */

	$.fn.remove = target => {
		if (target) {
			let elems = d.querySelectorAll(target);
			elems = Array.prototype.slice.call(elems);
			this.each(() => {
				const self = this;
				elems.forEach(el => {
					self.removeChild(el);
				});
			});
		} else {
			this.each(() => {
				this.parentNode.removeChild(this);
			});
		}
		return this;
	};

/**
 * Replace an element with some other content
 * @param {object|string} content
 * @returns {object} current instance of Grindstone
 */

	$.fn.replaceWith = content => {
		this.each(() => {
			this.outerHTML = content ? content : '';
		});
		return this;
	};

/**
 * Capture the resize event from a set of elements and execute a function
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

	$.fn.resize = callback => {
		if (typeof callback === 'function') {
			this.each(() => {
				$(this).on('resize', callback);
			});
		}
		return this;
	};
 
/**
 * Capture the scroll event and execute a function
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

	$.fn.scroll = callback => {
		if (typeof callback === 'function') {
			this.each(() => {
				$(this).on('scroll', callback);
			});
		}
		return this;
	};
 
 /**
 * Scroll an element to a specific top position relative to its another parent container
 * Return the current top offset of an element, relative to its parent container
 * @param {number} top - offset in px, optional
 * @returns {object|number} current instance of Grindstone or top offset
 */

	$.fn.scrollTop = top => {
		let topOffset;
		this.each(() => {
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
 * Scroll an element to a specific left position relative to its another parent container
 * Return the current left offset of an element, relative to its parent container
 * @param {number} left - offset in px, optional
 * @returns {object|number} current instance of Grindstone or left offset
 */

	$.fn.scrollLeft = left => {
		let leftOffset;
		this.each(() => {
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
		return (typeof left === 'number') ? this : leftOffset;
	};

/**
 * Submit a form or trigger a function when a form is submitted
 * @param {function} callback - optional
 * @returns {object} current instance of Grindstone
 */
	
	$.fn.submit = callback => {
		if (typeof callback === 'function') {
			this.each(() => {
				$(this).on('submit', callback);
			});
		} else {
			this.each(() => {
				this.submit();
			});
		}
		return this;
	};

/**
 * Get the parent element as a Grindstone object
 * @param {string} selector - only get the parent if it matches the selector, optional
 * @returns {object} parents instance of Grindstone
 */

	$.fn.parent = selector => {
		return priv.elementProp(this, 'parentNode', selector);
	};

/**
 * Get the next element as a Grindstone object
 * @param {string} selector - only get the element if it matches the selector, optional
 * @returns {object} instance of Grindstone
 */

	$.fn.next = selector => {
		return priv.elementProp(this, 'nextSibling', selector);
	};

/**
 * Get the previous element as a Grindstone object
 * @param {string} selector - only get the element if it matches the selector, optional
 * @returns {object} instance of Grindstone
 */

	$.fn.prev = selector => {
		return priv.elementProp(this, 'previousSibling', selector);
	};

/**
 * Get the child elements as a Grindstone object
 * @param {string} selector - only get the elements if they match the selector, optional
 * @returns {object} children instance of Grindstone
 */

	$.fn.children = selector => {
		return priv.children(this, 1, selector);
	};

/**
 * Get all the children as a Grindstone object, including text and comments
 * @returns {object} children instance of Grindstone
 */

	$.fn.contents = () => {
		return priv.children(this);
	};

/**
 * Dispatch a custom event
 * @param {number} evt - custom event
 * @returns {object|number} current instance of Grindstone or top offset
 */

	$.fn.trigger = evt => {
		const customEvent = new Event(evt);
		this.each(() => {
			this.dispatchEvent(customEvent);
		});
		return this;
	};
 
/**
 * Return or assign the value of an element
 * @param {string} newValue - optional
 * @returns {object|string} current instance of Grindstone or the value of the first element in the set
 */

	$.fn.val = newValue => {
		if (newValue && typeof newValue === 'string') {
			this.each(() => {
				this.value = newValue;
			});
			return this;
		} else {
			return this.set[0].value;
		}
	};

/**
 * Wrap the outer structure of the set of elements
 * @param {string} structure - HTML structure, opening tags only
 * @returns {object} current instance of Grindstone
 */

	$.fn.wrap = structure => {
		this.each(() => {
			if (typeof structure === 'string') {
				const contents = this.outerHTML;
				this.outerHTML = structure + contents;
			} else {
				throw new Error('wrap() structure must be a string.');
			}
		});
		return this;
	};

/**
 * Wrap the inner structure of the set of elements
 * @param {string} structure - HTML structure, opening tags only
 * @returns {object} current instance of Grindstone
 */
	
	$.fn.wrapInner = structure => {
		this.each(() => {
			if (typeof structure === 'string') {
				const contents = $(this).html();
				$(this).html(structure + contents);
			} else {
				throw new Error('wrapInner() structure must be a string.');
			}
		});
		return this;
	};
 
	return w.Grindstone = w.$ = $;
 
})(window, document);