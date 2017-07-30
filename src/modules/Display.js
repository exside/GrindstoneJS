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
