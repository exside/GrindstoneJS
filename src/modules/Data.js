	/** @namespace Data */
	
	/**
	 * @method data
	 * @memberof Data
	 * @param {string} valueName
	 * @param {string} newValue optional
	 * @returns {object|string} current instance of Grindstone or the current data-value of an element
	 * @example
	 * $('#selector').data('name');
	 * $('#selector').data('name', 'value');
	 * @description Assign a data-value to a set of elements or return the current value of an element.
	 */

	$.fn.data = function(valueName, newValue) {
		if (newValue) {
			this.each(function() {
				$(this).attr(`data-${valueName}`, newValue);
			});
			return this;
		} else {
			let elemValue;
			this.each(function() {
				elemValue = $(this).attr(`data-${valueName}`);
			});
			return elemValue;
		}
	};

	/**
	 * @method removeData
	 * @memberof Data
	 * @param {string} valueName
	 * @returns {object} current instance of Grindstone
	 * @example $('#selector').removeData('name');
	 * @description Remove a data-value from a set of elements.
	 */

	$.fn.removeData = function(valueName) {
		this.each(function() {
			$(this).removeAttr(`data-${valueName}`);
		});
		return this;
	};
