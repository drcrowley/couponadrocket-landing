$(function () {
  var couponListScriptsUrl = typeof couponConfig != 'undefined' ? couponConfig.couponListScriptsUrl : '/coupon-list.js';

  $('.js-looks-preview').on('click', function(event) {
    event.preventDefault();
    includeCoupons({colorTheme: 'blue', previewLink: '/show/couponsLanding'});
  });
  /* jshint ignore:start */
  function includeCoupons(params){var request=new XMLHttpRequest;request.open("GET",couponListScriptsUrl,!0),request.onload=function(){request.status>=200&&request.status<400&&eval(request.responseText.replace(/{{params}}/g,JSON.stringify(params)))},request.send()}
  /* jshint ignore:end */
});
