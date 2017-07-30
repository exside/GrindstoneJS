/**
 * Create hover and active states
 * @param {object} classes - { hoverClass: 'string', activeClass: 'string' }, optional
 * @returns {object} current instance of Grindstone
 */

	$.fn.mouseable = function(classes) {

		if (classes && typeof classes !== 'object') throw new Error('Classes parameter for mouseable() must be an object with properties "hoverClass" and/or "activeClass".');

		const hoverClass  = classes && classes.hasOwnProperty('hoverClass')  ? classes['hoverClass']  : 'over';
		const activeClass = classes && classes.hasOwnProperty('activeClass') ? classes['activeClass'] : 'down';
		
		const events = {
			hover:  priv.createInteraction('touchstart', 'mouseenter'),
			remove: priv.createInteraction('touchend', 'mouseleave'),
			down:   priv.createInteraction('touchstart', 'mousedown'),
			up: 	priv.createInteraction('touchend', 'mouseup mouseleave')
		};
		
		this.each(function() {
			$(this)
				.on(events.hover, () => {
					$(this).addClass(hoverClass);
				})
				.on(events.remove, () => {
					$(this).removeClass(hoverClass);
				})
				.on(events.down, () => {
					$(this).addClass(activeClass);
				})
				.on(events.up, () => {
					$(this).removeClass(activeClass);
				});
		});
		
		return this;
	};
