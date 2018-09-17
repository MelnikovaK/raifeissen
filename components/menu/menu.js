$(function(){

	var $element = $('.menu');
	var $menu_items = $('.menu__items');
	var $btn = $('.btns');
	var $item;
	var lan;
	var current_item;
	var content_id;


	if( $element.length<1 ) {
		console.warn('No Menu element found!');
		return;
	}

	var data;

	//console.log('#Menu: element:', $element );
	
	// INIT CONTENT
	$(window).on('main:ready', function( event, _data ) {

		data = _data;

		//HANDLEBARS
		var source = document.getElementById( "tmpl-sidebar-menu" ).innerHTML;
		template = Handlebars.compile(source);

		
		$btn.empty();


		var $adding_btn;

		data.buttons.forEach(function(e, i) {

			console.log('item',i,e);
			$adding_btn = $('<button class="btns__btn">'+e.text+'</button>');
			$adding_btn.appendTo($btn).appendTo($element);

			if( e.theme == "dark" ) {
				$adding_btn.addClass('btns__btn_dark');
			}	
		});


		init_menu( content_id);


	});

	// LANG
	$(window).on("language:changed", function(evt, language_name) {
		//console.log("#Main: language:changed: ["+language_name+"]", evt);
		// var $menu_items_item = $( '.menu__item>a', $element ); 

		// //console.log('$menu_items_item: ', $menu_items_item );

		// $menu_items_item.each(function(i, e ) {
		// 	// console.log(i,e,$(e).parent().data('menu-index'));
		// 	$(e).text( data.menu[ $(e).parent().data('menu-index') ].title[ language_name ] );
		// });
		lan = language_name || data.start_language;
		$menu_items.empty();
		init_menu(content_id);
		
	});


	$(window).on("content:changed", function(evt, _content_id) {
		content_id = _content_id;
		console.log(data.content[content_id].title[lan]);
		$('.menu__item').each(function(i, e) {
			$(e).removeClass('menu__item_active');
			if( data.content[content_id].title[lan] == $(e).text()) {
				$(e).addClass('menu__item_active');
			}

		});
	});

	$menu_items.on("click", function(event) {

		// console.log("CLICK: ", event.target );
		var $item = $(event.target);
		if( $item.hasClass('menu__item') ){
			// $('.menu__item').removeClass('menu__item_active');
			// $item.addClass('menu__item_active');

			// TweenMax.fromTo($item, .6, {
			// 	scale: 1.1
			// }, {
			// 	scale: 1,
			// 	ease: Sine.easeInOut
			// });

			current_item = $item.data('content-id');
			console.log('MENU :> ', current_item );
			router.navigate('/'+current_item );
			
			// $(window).trigger("content:changed", $item.data('content-id') );
		}
	});


	function init_menu(page) {
		$menu_items.empty();
		var _menu = data.menu;
		var menu = {};
		var html = '';
		_menu.forEach( function(e,i) {
			menu.title = e.title[lan];
			menu.href = e.href;
			menu.content_id = e.content_id;
			menu.language = lan;

			html += template(menu);
		});
		$( html ).appendTo( $( '.menu__items' ) );
		//console.log(html);
		_content = data.content[page];
		
		//$('.menu__item:contains('+_content.title[lan]+')').addClass('menu__item_active');

	
	}

});