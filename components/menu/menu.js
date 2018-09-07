$(function(){

	var $element = $('.menu');
	var $btn = $('.btns');


	if( $element.length<1 ) {
		console.warn('No Menu element fond!');
		return;
	}

	console.log('#Menu: element:', $element );

	$(window).on('main:ready', function( event, data) {
		console.log('#Menu: ', event, data );
		$element.empty();
		$btn.empty();

		// Generate menu items
		var $adding_el;

		data.menu.forEach(function(e,i) {
			
			console.log('item',i,e);
			if( e.title ) {
				
				$adding_el = $('<p class="menu__item"><a href="'+e.href+'">'+e.title+'</a></p>');
				$adding_el.appendTo($element);

				if( data.content.title == e.title ) {
					$adding_el.addClass('menu__item_active');
				}
			} else {
				$('<div class="menu__line"></div>').appendTo($element);
			}
		});

		var $adding_btn;

		data.buttons.forEach(function(e, i) {

			console.log('item',i,e);
			$adding_btn = $('<button class="btns__btn">'+e.text+'</button>');
			$adding_btn.appendTo($btn).appendTo($element);

			if( e.theme == "dark" ) {
				$adding_btn.addClass('btns__btn_dark');
			}	
		})
	});

});