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
