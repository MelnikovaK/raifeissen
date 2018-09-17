$(function() {
	
	var data;

	$.get("assets/data.json", function(_data) {

		data = _data;
		console.log('#Main: data is loaded: ', _data );

		data.start_language = data.lang[0];
		
		for ( var i in data.content) {
			data.start_content = i;
			break;
		}

		$(window).trigger('main:ready', data );

	});


	console.log("#Main: main is ready!", data);


	// CHANGE LANGUAGE FOR STATIC CONTENTS
	$(window).on("language:changed", function(evt, language_name) {
		
		// TRANSLATE STATIC TEXTS
		$('[data-trnslt]').each(function(i,e){
			// console.log('=>', i, e);
			var key = $(e).data('trnslt');
			if( !key ) return;
			var trnslt = data.translate[ key ];
			if( !trnslt ) {
				console.warn("there's no a such translation for:", key );
				return;
			}
			$(e).text( trnslt[ language_name ] );
		});

		// TITLE
		var $page_name = $('head title');
		var page_title = data.content[data.start_content].title;
		$page_name.text(page_title[language_name]);

	});


	// WINDOW RESIZE
	$(window).resize(function() {
		var $b = $('body');
		
		$b.toggleClass('is_mobile', window.innerWidth < 768 );
	
		$b.toggleClass('is_tablet', window.innerWidth >= 768 && window.innerWidth < 1024 );
		
		$b.toggleClass('is_desktop', window.innerWidth > 1024);
		
		$(window).trigger("window-size:changed");
	});


});
