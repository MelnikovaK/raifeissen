$(function() {
	
	var data;

	$.get("assets/data.json", function(_data) {
		data = _data;
		$(window).trigger('main:ready', data );
		
		console.log('data is loaded: ', _data );
	})

	console.log("main is ready!", data);

});
