/**
 * Dispatch a custom event
 * @param {number} evt - custom event
 * @returns {object|number} current instance of Grindstone or top offset
 */

	$.fn.trigger = evt => {
		const customEvent = new Event(evt);
		this.each(() => {
			this.dispatchEvent(customEvent);
		});
		return this;
	};
 