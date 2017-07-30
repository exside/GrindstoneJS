/**
 * Debounce a given function
 * @param {function} fn - function to debounce
 * @param {number} wait - wait time in milliseconds
 * @param {boolean} immediate - invoke immediately?
 * @returns {function} invoke debounce
 */

	$.debounce = function(fn, wait, immediate) {
		let timeout;
		const debounce = function() {
			const context = this;
			const args = arguments;
			const later = () => {
				timeout = null;
				if (!immediate) fn.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) fn.apply(context, args);
		};
		return debounce;
	};
