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
