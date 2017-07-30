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
