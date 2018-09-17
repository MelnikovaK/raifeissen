$(function(){

	var data;
	var template;
	var $menu = $('.menu__items');
	var lan, content_id;
	var $content = $('.content');

	// INIT CONTENT
	$(window).on('main:ready', function( event, _data ) {

		var source = document.getElementById( "tmpl-content-info" ).innerHTML;
		template = Handlebars.compile(source);

		data = _data;
		lan = data.start_language;
		content_id = data.start_content;
	});


	$(window).on('language:changed', function(evt, language_name ){
		$content.empty();
		lan = language_name;
		init_content( content_id, lan);
	});



	$(window).on("content:changed", function(evt, _content_id) {
		content_id = _content_id;
		init_content( content_id, lan);
	});

	function init_content( page, lan ) {
		$content.fadeOut( 200, function() {
			_init_content(content_id, lan);
		}).fadeIn( 200 );
	}

	function _init_content( page, lan ) {

		$content.empty();
		var _content = data.content[page];
		//console.log('CONTENT-INFO:', _content)

		var content = {};
		content.title = _content.title[lan];
		content.texts = _content.texts[lan];
		content.url = _content.img.url;
		
		content.language = lan;
		//console.log('CONTENT-CHANGE: ', content.texts);

		var html = template( content );
		$( html ).appendTo( $( '.content' ) );
		
	}



});
