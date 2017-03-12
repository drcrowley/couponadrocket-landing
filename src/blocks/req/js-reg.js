$(function () {
  $('.js-reg').on('click', function(event) {
    event.preventDefault();

    var el = $(this),
        href = el.attr('href'),
        search = window.location.search,
        redirectUrl = href + search;

    window.location.replace(redirectUrl);    
  });
});
