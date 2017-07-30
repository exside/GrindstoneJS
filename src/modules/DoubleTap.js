/**
 * Trigger a function by double-tapping or double-clicking
 * @param {function} callback
 * @returns {object} current instance of Grindstone
 */

	$.fn.doubleTap = function(callback) {
		let active, int;
		this.each(function() {
			active = false;
			int = priv.createInteraction('touchend', 'click');
			$(this).on(int, () => {
				if (active) {
					callback();
					return active = false;
				}
				active = true;
				setTimeout(() => {
					return active = false;
				}, 350);
			});
		});
		return this;
	};
