/**
 * Return or assign the value of an element
 * @param {string} newValue - optional
 * @returns {object|string} current instance of Grindstone or the value of the first element in the set
 */

	$.fn.val = newValue => {
		if (newValue && typeof newValue === 'string') {
			this.each(() => {
				this.value = newValue;
			});
			return this;
		} else {
			return this.set[0].value;
		}
	};
