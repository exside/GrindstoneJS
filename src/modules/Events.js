/**
 * Assign an event listener
 * @param {string} action - event(s)
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

	$.fn.on = function(action, callback) {
		this.each(function() {
			const self = this;
			const events = action.split(' ');
			events.forEach(evt => {
				self.addEventListener(evt, callback, false);
			});
		});
		return this;
	};

/**
 * Remove an event listener
 * @param {string} action - event(s)
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

	$.fn.off = function(action, callback) {
		this.each(function() {
			const self = this;
			const events = action.split(' ');
			events.forEach(evt => {
				self.removeEventListener(evt, callback, false);
			});
		});
		return this;
	};
