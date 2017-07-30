/**
 * Iterate through each item in the set and execute the callback
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */
	
	$.fn.each = callback => {
		let set = this.set;
		set = Array.prototype.slice.call(set);
		set.forEach(item => {
			callback.call(item);
		});
		return this;
	};
 