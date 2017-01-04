$(function () {
  $('.js-down-button').on('click', function () {
    
    var heroHeight = $('.hero').outerHeight();
    
    $('html, body').animate({
      scrollTop: heroHeight
    }, 500);
    
  });
});
