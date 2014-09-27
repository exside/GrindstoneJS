/* show() / hide()
 *
 * Shows a hidden element
 * Hides a visible element
 * May be instant or delayed
 *
 * Parameter: (optional)
 * -timer
 */
	
	GS.show = function(timer){
		var results = this.init;
		for (var i = 0; i < results.length; i++){
			var element = results[i];
			if (testParam(timer)){
				if (typeof timer === "number"){
					setTimeout(function(){
						element.style.display = "block";
					},timer);
				} else {
					throw new Error("Display timeout parameter must be a number.");
				}
			} else {
				element.style.display = "block";
			}
		};
		return this;
	};
	
	GS.hide = function(timer){
		var results = this.init;
		for (var i = 0; i < results.length; i++){
			var element = results[i];
			if (testParam(timer)){
				if (typeof timer === "number"){
					setTimeout(function(){
						element.style.display = "none";
					},timer);
				} else {
					throw new Error("Display timeout parameter must be a number.");
				}
			} else {
				element.style.display = "none";
			}
		};
		return this;
	};