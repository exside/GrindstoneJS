/**
 * Debounce a given function
 * @param {function} fn - function to debounce
 * @param {number} wait - wait time in milliseconds
 * @param {boolean} immediate - invoke immediately?
 * @returns {function} invoke debounce
 */

	$.debounce = (fn, wait, immediate) => {
		let timeout;
		const debounce = () => {
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
