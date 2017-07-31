	/**
	 * @method hasClass
	 * @param {string} cls className
	 * @returns {boolean}
	 * @example $('#selector').hasClass('example');
	 * @description Determine if the elements have the specified class.
	 */

	$.fn.hasClass = function(cls) {
		let hasCls;
		this.each(function() {
			hasCls = this.classList.contains(cls);
		});
		return hasCls;
	};

	/**
	 * @method addClass
	 * @param {string} cls className
	 * @returns {object} current instance of Grindstone
	 * @example $('#selector').addClass('example');
	 * @description Add a class to the current set of elements.
	 */

	$.fn.addClass = function(cls) {
		const classes = cls.split(' ');
		this.each(function() {
			const self = this;
			classes.forEach(clsName => {
				self.classList.add(clsName);
			});
		});
		return this;
	};

	/**
	 * @method removeClass
	 * @param {string} cls className
	 * @returns {object} current instance of Grindstone
	 * @example $('#selector').removeClass('example');
	 * @description Remove a class from the current set of elements.
	 */

	$.fn.removeClass = function(cls) {
		const classes = cls.split(' ');
		this.each(function() {
			const self = this;
			classes.forEach(clsName => {
				self.classList.remove(clsName);
			});
		});
		return this;
	};

	/**
	 * @method toggleClass
	 * @param {string} cls className
	 * @returns {object} current instance of Grindstone
	 * @example $('#selector').toggleClass('example');
	 * @description Toggle the specified class.
	 */

	$.fn.toggleClass = function(cls) {
		const classes = cls.split(' ');
		this.each(function() {
			const self = this;
			classes.forEach(clsName => {
				self.classList.toggle(clsName);
			});
		});
		return this;
	};
