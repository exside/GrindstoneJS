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
