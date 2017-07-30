	/**
	 * Show a set of hidden elements
	 * @param {delay} delay - in milliseconds, optional
	 * @returns {object} current instance of Grindstone
	 */

	$.fn.show = function(delay) {
		if (delay) {
			const self = this;
			setTimeout(() => {
				$.fn.show.call(self);
			}, delay);
		} else {
			this.each(item => {
				if (item.style.display === 'none') {
					item.style.display = $(item).data('_prevdisplay') || '';
					$(item).removeData('_prevdisplay');
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

	$.fn.hide = function(delay) {
		if (delay) {
			const self = this;
			setTimeout(() => {
				$.fn.hide.call(self);
			}, delay);
		} else {
			this.each(item => {
				if (item.style.display !== 'none') {
					if (item.style.display) $(item).data('_prevdisplay', item.style.display);
					item.style.display = 'none';
				}
			});
		}
		return this;
	};
