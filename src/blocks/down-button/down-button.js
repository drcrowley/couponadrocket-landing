$(function () {
  $('.js-down-button').on('click', function () {
    
    var heroHeight = $('.hero').height();
    
    $('html, body').animate({
      scrollTop: heroHeight
    }, 500);
    
  });
});
