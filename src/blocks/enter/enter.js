$(function () {
  var regForm = $('.js-reg-form'),
      authForm = $('.js-auth-form'),
      apiUrl = 'http://94.142.139.199:8080';

  regForm.parsley();
  authForm.parsley();

  regForm.on('submit', function(event) {
    event.preventDefault();
    var form = $(this),
        formData = form.serializeArray(),
        regData = {
          email: formData.email,
          pwd: formData.pwd,
          news: false
        };

    request('user/register', regData);
  });

  authForm.on('submit', function(event) {
    event.preventDefault();
    var form = $(this),
        formData = form.serializeArray();

    request('/user/login', formData);
  });

  function request(url, data) {
    $.ajax({
      type: "POST",
      url: 'http://94.142.139.199:8080/' + url,
      data: data,
      success: function(data) {
        console.log('success', data);
      },
      error: function(data, message) {
        console.log(message);
      }
    });    
  }

});
