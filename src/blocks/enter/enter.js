$(function () {
  var regForm = $('.js-reg-form'),
      authForm = $('.js-auth-form'),
      html = $('html'),
      apiUrl = 'http://94.142.139.199:8080/coupon-web/rs/',
      cabinetUrl = 'http://yandex.ru';

  if (regForm.length) {
    regForm.parsley();
  }
  if (authForm.length) {
    authForm.parsley();
  }

  regForm.on('submit', function(event) {
    event.preventDefault();
    var form = $(this),
        formData = form.serializeArray(),
        regData = {
          news: false
        };

    formData.forEach(function(item) {
      regData[item.name] = item.value;
    });

    delete regData['reg-agree'];

    request('user/register', regData, form);
  });

  authForm.on('submit', function(event) {
    event.preventDefault();
    var form = $(this),
        formData = form.serializeArray(),
        authData = {};

    formData.forEach(function(item) {
      authData[item.name] = item.value;
    });
    request('user/login', authData, form);
  });

  function request(url, data, form) {
    html.addClass('t-preloader');

    $.ajax({
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      url: apiUrl + url,
      data: JSON.stringify(data),
      success: function(data) {
        if (data.status == 'OK') {
          window.location.replace(cabinetUrl);
        } else {
          form.addClass('form_error');
          html.removeClass('t-preloader');
        }
      },
      error: function(data, message) {
        console.log(message);
        html.removeClass('t-preloader');
      }
    });    
  }

});
