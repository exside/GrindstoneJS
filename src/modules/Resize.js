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
 