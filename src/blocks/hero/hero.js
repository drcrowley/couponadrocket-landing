$(function () {
  var videoPlay = $('.js-hero-play');

  videoPlay.on('click', function(event) {
    $(this).addClass('hero__preview_played');

    $('.hero__video')[0].src += "&autoplay=1";
    event.preventDefault();
  });

});
