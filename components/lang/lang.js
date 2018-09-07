$(function(){

	var $element = $('.lang');
	if( $element.length<1 ) {
		console.warn('No Lang element fond!');
		return;
	} 

	$element.empty();

	console.log('#Lang: element:', $element );

	$(window).on('main:ready', function( event, data) {
		console.log('#Lang: ', data );
		
		var $adding_el = '<select>';
		data.lang.forEach(function(e,i) {

			$adding_el += '<option>'+ e +'</option>';
		});

		$adding_el+='</select>';
		$($adding_el).appendTo($element);
	});

	$($element).change( function(a) {
		
		$($element).css('border', '6px solid grey');
		var $option = $('select').val();
		console.log($option);

		$(window).trigger("language:changed", $option );
	});
	
});