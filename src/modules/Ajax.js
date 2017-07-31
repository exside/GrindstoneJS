	/** @namespace Ajax */	
	
	/**
	 * @method ajax
	 * @memberof Ajax
	 * @param {object} opts required, you may adhere to the default properties by passing in a blank object
	 * @returns {object} XMLHttpRequest
	 * @example
	 * $.ajax({});
	 * $.ajax({ opts: 'values' });
	 * @description
	 * Submit a GET or POST AJAX request.
	 * Acceptable properties of "opts" are:
	 * - method (GET or POST)
	 * - url (data path)
	 * - async (true or false)
	 * - success (callback to invoke if successful)
	 * - error (callback to invoke if unsuccessful)
	 * - header (adds a custom HTTP header to the request)
	 * - headerValue (value of the custom HTTP header)
	 */

	$.ajax = function(opts) {

		if (typeof opts !== 'object') throw new Error('XHR properties are not properly defined.');

		let { method = null, url = null, async = true, success = () => {}, error = () => {}, header = 'Content-Type', headerValue = 'application/x-www-form-urlencoded; charset=UTF-8' } = opts;
		
		const xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = () => {
			let func;
			if (xmlhttp.readyState === 4) func = (xmlhttp.status === 200) ? success(xmlhttp) : error(xmlhttp);
			return func;
		};
		xmlhttp.open(method, url, async);
		xmlhttp.setRequestHeader(header, headerValue);
		xmlhttp.send(null);

		return xmlhttp;
	};
