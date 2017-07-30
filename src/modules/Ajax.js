/**
 * Submit a GET or POST AJAX request
 * @param {object} - { properties => values }
 * @returns {object} xmlhttp
 * 
 * Acceptable properties of "opts" are:
 * - method (GET or POST)
 * - url (data path)
 * - async (true or false)
 * - success (callback to invoke if successful)
 * - error (callback to invoke if unsuccessful)
 * - header (adds a custom HTTP header to the request)
 * - headerValue (value of the custom HTTP header)
 */

	$.ajax = opts => {
		
		let { method, url, async, success, error, header, headerValue } = opts;

		if (typeof opts !== 'object') throw new Error('XHR properties are not properly defined.');

		method   	= method !== undefined   	? method   	  : null;
		url      	= url !== undefined      	? url      	  : null;
		async    	= async !== undefined    	? async    	  : true;
		success  	= success !== undefined  	? success  	  : () => {};
		error    	= error !== undefined	 	? error	 	  : () => {};
		header 	 	= header !== undefined 	 	? header 	  : 'Content-Type';
		headerValue = headerValue !== undefined ? headerValue : 'application/x-www-form-urlencoded; charset=UTF-8';
		
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
