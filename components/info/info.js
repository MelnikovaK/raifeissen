$(function(){

	var data;
	var template;
	var $menu = $('.menu__items');
	var lan, content_id;
	var $content = $('.content');
	var $info_text = $('.info__text');

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
		//init_content();
	});



	$(window).on("content:changed", function(evt, _content_id) {
		content_id = _content_id;
		console.log('CONTENT-ID', content_id);
		init_content();
	});

	function init_content() {

		if( $content.children().length ){
			hideContent();
		} else {
			showContent();
		}
	}

	function hideContent(){

		var _anim_counter = 0;

		$('.info__text').each(function(i,e){
			_anim_counter++;
			TweenMax.to( e, .1, 
			{
				delay: .1 * i,
				opacity: 0,
				ease: Power1.easeInOut,
				onComplete: _checkComplete
			});

		});

		_anim_counter++;
		TweenMax.to($('.info__title'), .2, {
			scale: 1,
			opacity: 0,
			ease: Sine.easeInOut,
			onComplete: _checkComplete
		});

		_anim_counter++;
		TweenMax.to($('.img-holder__pic'), .2,
			{
				scale: 1,
				opacity: 0,
				rotation: 0,
				ease: Sine.easeInOut,
				onComplete: _checkComplete
			});

		function _checkComplete (){
			_anim_counter--;
			//console.log('title anim complete', _anim_counter );
			if( _anim_counter < 1 ) showContent();
		}

	}

	function showContent(){
		$content.empty();
		var _content = data.content[content_id];

		var content = {};
		content.title = _content.title[lan];
		content.texts = _content.texts[lan];
		content.url = _content.img.url;
		content.language = lan;

		var html = template( content );
		$( html ).appendTo( $( '.content' ) );

		$('.info__text').each(function(i,e){

			TweenMax.fromTo( e, .4, {
				opacity: 0,
				y: 50
			}, {
				delay: .1 * i,
				opacity: 1,
				y: 0,
				ease: Power1.easeInOut
			});

		});


		TweenMax.to($('.info__title'), .6, {
			scale: 1.2,
			ease: Sine.easeInOut
		});

		TweenMax.fromTo($('.img-holder__pic'), .6,
			{
				scale: 0.8,
				opacity: 0.4,
				rotation: 5
			},
			{
				scale: 1,
				opacity: 1,
				rotation: 0,
				ease: Sine.easeInOut
			}
		);

	}

});
