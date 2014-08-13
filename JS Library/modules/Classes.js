/* hasClass() / addClass() / removeClass() / toggleClass()
 *
 * Detects whether or not a specified element has a specified class; Adds/removes a specified class; Toggles a specified class
 *
 * Parameter:
 * -className
 *
 * Requires: Core.js
 */
	
	// Detect if a given element has a particular class
	
	Grindstone.prototype.hasClass = function(cls){
		var results = this.init;
		if (results.length > 1){
			for (var i = 0; i < results.length; i++){
				var element = results[i];
				if (testParam(cls)){
					return element.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
				} else {
					throw new Error("Cannot determine if the element has undefined class.");
				}
			};
		} else {
			var element = results;
			if (testParam(cls)){
				return element.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
			} else {
				throw new Error("Cannot determine if the element has undefined class.");
			}
		}
	};
	
	// Add the specified class to the element if it doesn't already contain that class
	
	Grindstone.prototype.addClass = function(cls){
		var results = this.init;
		if (results.length > 1){
			for (var i = 0; i < results.length; i++){
				var element = results[i];
				if (!element.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))){
					if (testParam(cls)){
						if (element.className == ""){
							element.className += cls;
						} else {
							element.className += " " + cls;
						}
					} else {
						throw new Error("Class to add is undefined.");
					}
				}
			};
			return this;
		} else {
			var element = results;
			if (!element.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))){
				if (testParam(cls)){
					if (element.className == ""){
						element.className += cls;
					} else {
						element.className += " " + cls;
					}
				} else {
					throw new Error("Class to add is undefined.");
				}
			}
			return this;
		}
	};
	
	// Remove the specified class from the element if it contains that class
	
	Grindstone.prototype.removeClass = function(cls){
		var results = this.init;
		if (results.length > 1){
			for (var i = 0; i < results.length; i++){
				var element = results[i];
				if (element.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))){
					if (testParam(cls)){
						var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
						element.className = element.className.replace(reg,"");
					} else {
						throw new Error("Class to remove is undefined.");
					}
				}
			};
			return this;
		} else {
			var element = results;
			if (element.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))){
				if (testParam(cls)){
					var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
					element.className = element.className.replace(reg,"");
				} else {
					throw new Error("Class to remove is undefined.");
				}
			}
			return this;
		}
	};
	
	// Toggle the specified class
	
	Grindstone.prototype.toggleClass = function(cls){
		var results = this.init;
		if (results.length > 1){
			for (var i = 0; i < results.length; i++){
				var element = results[i];
				if (testParam(cls)){
					if (!element.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))){
						if (element.className == ""){
							element.className += cls;
						} else {
							element.className += " " + cls;
						}
					} else if (element.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))){
						var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
						element.className = element.className.replace(reg,"");
					}
				} else {
					throw new Error("Class to toggle is undefined.");
				}
			};
			return this;
		} else {
			var element = results;
			if (testParam(cls)){
				if (!element.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))){
					if (element.className == ""){
						element.className += cls;
					} else {
						element.className += " " + cls;
					}
				} else if (element.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))){
					var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
					element.className = element.className.replace(reg,"");
				}
			} else {
				throw new Error("Class to toggle is undefined.");
			}
			return this;
		}
	};