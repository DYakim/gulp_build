// anchors --------------------

 
$(function(){
    $('a[href^="#"]').on('click', function(event) {
      event.preventDefault();
      var sc = $(this).attr("href"),
          dn = $(sc).offset().top;      
      $('html, body').animate({scrollTop: dn}, 1000);
    });
  });

// burger menu --------------------

$(function(){
    $('.menu-button').on('click', function() {
       $('.main-nav__list').slideToggle(300, function(){
            if( $(this).css('display') === "none"){
                $(this).removeAttr('style');
            }
       });

    });

});

// portfolio filter --------------------


$(function() {
    $('.portfolio__list').isotope({
        itemSelector: '.portfolio__item',
        layoutMode: 'masonry',
        masonry: {
            fitWidth: true
        }
    });
    $('.filter__item').click(function(){
        $('.filter__item').removeClass('active');
        $(this).addClass('active');
    
        var selector = $(this).attr('data-filter');
        $('.portfolio__list').isotope({
            filter: selector
        });
        return false;
    });
});

// portfolio modal --------------------

$(function() {
    $('.portfolio__link').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true
	});
});


// team slider --------------------

$(function() {
    $('.slider__wrapper').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        responsive: [
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });
});