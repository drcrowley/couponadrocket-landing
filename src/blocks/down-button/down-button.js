$(function () {
  $('.js-down-button').on('click', function () {
    
    var heroHeight = $('.hero').outerHeight();
    
    $('html, body').stop().animate({
      scrollTop: heroHeight
    }, 500);
    
  });
});
