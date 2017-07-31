	/**
	 * @method resize
	 * @param {function} callback
	 * @returns {object} current instance of Grindstone
	 * @example $(window).resize(function(){});
	 * @description Capture the resize event from a set of elements and execute a function.
	 */

	$.fn.resize = function(callback) {
		if (typeof callback === 'function') {
			this.each(function() {
				$(this).on('resize', callback);
			});
		}
		return this;
	};
 