/**
 * Clone the elements in the set
 * @returns {object} the cloned elements as a new instance of Grindstone
 */
 
	$.fn.clone = () => {
		return this.map(() => {
			return this.cloneNode(true);
		});
	};
