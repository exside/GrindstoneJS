	/**
	 * Remove elements from the DOM
	 * @param {object} target - target element(s), optional: if omitted, the element(s) invoking this method will be removed
	 * @returns {object} current instance of Grindstone
	 */

	$.fn.remove = function(target) {
		if (target) {
			let elems = d.querySelectorAll(target);
			elems = Array.prototype.slice.call(elems);
			this.each(function() {
				const self = this;
				elems.forEach(el => {
					self.removeChild(el);
				});
			});
		} else {
			this.each(function() {
				this.parentNode.removeChild(this);
			});
		}
		return this;
	};
