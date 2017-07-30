/**
 * Adjust the height of the selected elements or return the current height value of the first element in the set
 * @param {number} num - new height in px, optional
 * @returns {object|number} current instance of Grindstone or current height of the first element
 */

	$.fn.height = num => {
		if (typeof num === 'number' || num === 0) {
			this.each(() => {
				this.style.height = `${num}px`;
			});
			return this;
		} else {
			const self = this.set[0];
			if (self === d) {
				return d.body.clientHeight;
			} else if (self === w) {
				return w.innerHeight;
			} else {
				return this.set[0].offsetHeight;
			}
		}
	};

/**
 * Adjust the width of the selected elements or return the current width value of the first element in the set
 * @param {number} num - new width in px, optional
 * @returns {object|number} current instance of Grindstone or current width of the first element in the set
 */

	$.fn.width = num => {
		if (typeof num === 'number' || num === 0) {
			this.each(() => {
				this.style.width = `${num}px`;
			});
			return this;
		} else {
			const self = this.set[0];
			if (self === d) {
				return d.body.clientWidth;
			} else if (self === w) {
				return w.innerWidth;
			} else {
				return this.set[0].offsetWidth;
			}
		}
	};
