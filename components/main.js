$(function() {
	
	var data;

	$.get("assets/data.json", function(_data) {
		data = _data;
		console.log('#Main: data is loaded: ', _data );

		$(window).trigger('main:ready', data );

	});

	console.log("#Main: main is ready!", data);

});
