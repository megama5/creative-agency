;(function($){
	document.addEventListener('DOMContentLoaded', function(event){
		$('.adverment__slider').slick({
		  infinite: false,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  dots: true,
		  arrows: false,
		});
	})
})(jQuery);