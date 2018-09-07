$(function(){

	var $element = $('.menu');
	var $btn = $('.btns');


	if( $element.length<1 ) {
		console.warn('No Menu element found!');
		return;
	}

	var data;

	//console.log('#Menu: element:', $element );
	
	// INIT CONTENT
	$(window).on('main:ready', function( event, _data ) {

		data = _data;

		//console.log('#Menu: ', event, data );
		$element.empty();
		$btn.empty();

		// Generate menu items
		data.menu.forEach(function( e, i ) {
			
			//console.log('item',i,e);
			if( e.title ) {
				
				var $adding_el = 
					$('<p class="menu__item"><a href="'+e.href+'">'+e.title.ru+'</a></p>')
						.appendTo($element)
						.data('menu-index', i );
					;

				// if( data.content.title.ru == e.title.ru ) {
				// 	$adding_el.addClass('menu__item_active');
				// }
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

	// LANG
	$(window).on("language:changed", function(evt, language_name) {
		console.log("#Main: language:changed: ["+language_name+"]", evt);
		var $menu_item = $( '.menu__item>a', $element ); 

		console.log('$menu_item: ', $menu_item );
		// return;

		// var $add;
		// $menu_item.empty();

		$menu_item.each(function(i,e) {
			console.log(i,e,$(e).parent().data('menu-index'));
			$(e).text( data.menu[ $(e).parent().data('menu-index') ].title[ language_name ] );
			// $add = $('<a href="'+e.href+'">'+e.title.data+'</a>');
			// $add.appendTo($menu_item);
		});
		
	});
		
});