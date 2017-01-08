$(function () {
  var link = $('.menu__link');

  link.on('click', function(event) {
    var target = $(this).attr('href');

    scrollTo(target);
  });

  function scrollTo(target) {
    var offsetY = $(target).offset().top;

    $('html, body').stop().animate({
      scrollTop: offsetY
    }, 500);    
  }

});
