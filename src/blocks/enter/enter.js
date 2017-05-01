$(function () {
  var regForm = $('.js-reg-form'),
      authForm = $('.js-auth-form'),
      resetForm = $('.js-reset-form'),
      html = $('html'),
      errorEl = $('.form__error'),
      apiUrl = typeof couponConfig != 'undefined' ? couponConfig.apiUrl : 'http://94.142.139.199:8080/coupon-web/rs/',
      cabinetUrl = typeof couponConfig != 'undefined' ? couponConfig.cabinetUrl : 'http://localhost:3000';

  if (regForm.length) {
    regForm.parsley();
  }
  if (authForm.length) {
    authForm.parsley();
  }
  if (resetForm.length) {
    resetForm.parsley();
  }

  regForm.on('submit', function(event) {
    event.preventDefault();
    var form = $(this),
        formData = form.serializeArray(),
        regData = {
          news: false
        },
        searchData = $.parseParams(document.location.search);

    formData.forEach(function(item) {
      regData[item.name] = item.value;
    });

    if (searchData.ref) {
      regData.protege = searchData.ref;      
    }

    delete regData['reg-agree'];

    var requestParams = {
      url: 'user/register',
      data: regData,
      form: form,
      errorMessage: 'Ошибка регистрации. <br> Такой email уже зарегистрирован',
      redirectUrl: '/registration-confirm.html'
    };

    request(requestParams);
  });

  authForm.on('submit', function(event) {
    event.preventDefault();
    var form = $(this),
        formData = form.serializeArray(),
        authData = {};

    formData.forEach(function(item) {
      authData[item.name] = item.value;
    });

    var requestParams = {
      url: 'user/login',
      data: authData,
      form: form,
      errorMessage: 'Ошибка авторизации.'
    };
    request(requestParams);
  });


  resetForm.on('submit', function(event) {
    event.preventDefault();
    var form = $(this),
        formData = form.serializeArray(),
        resetData = {};

    formData.forEach(function(item) {
      resetData[item.name] = item.value;
    });

    var requestParams = {
      data: resetData,
      form: form,
    };    
    resetRequest(requestParams);
  });

  function request(params) {
    html.addClass('t-preloader');
    params.form.removeClass('form_error');
    $.ajax({
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      crossDomain: true,
      url: apiUrl + params.url,
      data: JSON.stringify(params.data),
      success: function(data) {
        var redirectUrl = params.redirectUrl ? params.redirectUrl : cabinetUrl + '/#/auth?token=' + data.tan;
        if (data.status == 'OK') {
          window.location.replace(redirectUrl);
        } else {
          params.form.addClass('form_error');
          errorEl.html(data.message);
          html.removeClass('t-preloader');
        }
      },
      error: function(data, message) {
        params.form.addClass('form_error');
        errorEl.html(data.message);
        html.removeClass('t-preloader');
      }
    });    
  }


  function resetRequest(params) {
    html.addClass('t-preloader');
    params.form.removeClass('form_error');

    $.ajax({
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      crossDomain: true,
      url: apiUrl + '/user/pwdReset/' + params.data.email,
      success: function(data) {
        var redirectUrl = '/forgot-confirm.html';
        if (data.status == 'OK') {
          window.location.replace(redirectUrl);
        } else {
          params.form.addClass('form_error');
          errorEl.html(data.message);
          html.removeClass('t-preloader');
        }
      },
      error: function(data, message) {
        params.form.addClass('form_error');
        errorEl.html(data.message);
        html.removeClass('t-preloader');
      }
    });     
  }

});
