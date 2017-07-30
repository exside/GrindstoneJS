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
