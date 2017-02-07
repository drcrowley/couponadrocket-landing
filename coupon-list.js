(function(params) {
  var apiUrl = 'http://94.142.139.199:8080/coupon-visitor/rs',
      couponLimit = 3,
      couponHtml = '<div class="couponadrocket" id="couponadrocket">' +
                        '<div class="couponadrocket__holder">' +
                          '<form class="couponadrocket__form" id="couponadrocket-form">' +
                            '<div class="couponadrocket__content">' +
                              '<div class="couponadrocket__head">Спасибо за заказ!</div>' +
                              '<div class="couponadrocket__sub-head">Выберите 3 любых купона от наших партнеров.</div>' +
                              '<div class="couponadrocket__sub-head">Выбранные купоны будут отправлены на ваш е-mail!</div>' +
                              '<div class="couponadrocket__list" id="couponadrocket-list"></div>' +
                              '<div class="couponadrocket__errors" id="couponadrocket-error"></div>' +
                              '<button class="couponadrocket__close" id="couponadrocket-close" type="button">X</button>' + 
                            '</div>' +
                            '<div class="couponadrocket__bottom">' +
                              '<div class="couponadrocket__left">' +
                                '<a href="http://couponadrocket.ru">' +
                                  '<img src="build/images/logo_black.png" class="couponadrocket__logo" alt="">' +
                                '</a>' +
                              '</div>' +
                              '<div class="couponadrocket__right">' + 
                                '<input type="email" placeholder="Ваш адрес e-mail" name="email" id="couponadrocket-email"  class="couponadrocket__input">' +
                                '<button class="couponadrocket__button" type="submit">Отправить</button>' +
                              '</div>' +
                            '</div>' +
                            '<div class="couponadrocket__preloader" id="couponadrocket-preloader"></div>' +
                          '</form>' +
                        '</div>' +
                      '</div>',
        couponCss = '.couponadrocket{background-color:#154e6b;background-color:rgba(21,78,107,.88);position:fixed;top:0;bottom:0;left:0;right:0;z-index:2147483647;text-align:center;font-family:"Arial","Helvetica",sans-serif;line-height:1.2;font-weight:400;font-size:0;box-sizing:border-box;padding:40px;overflow:auto}.couponadrocket:before{content:"";display:inline-block;vertical-align:middle;height:100%;width:1px;margin-right:-1px}.couponadrocket__close{position:absolute;top:0;right:0;font-size:18px;color:#12aaeb;background:transparent;border-radius:3px;border:0;outline:none;cursor:pointer;width:40px;height:40px}.couponadrocket__holder{min-width:195px;max-width:956px;padding:25px;box-sizing:border-box;display:inline-block;vertical-align:middle;text-align:left;position:relative}.couponadrocket__form{background:#fff;border-radius:4px;overflow:hidden;display:block;position:relative}.couponadrocket__content{padding:45px;box-sizing:border-box;position:relative}.couponadrocket__errors{font-size:14px;color:#e21616;text-align:center;margin-top:30px}.couponadrocket__error-item + .couponadrocket__error-item{margin-top:15px}.couponadrocket__head{font-size:32px;color:#12aaeb;text-align:center;margin-bottom:10px}.couponadrocket__sub-head{font-size:14px;color:#597a96;text-align:center}.couponadrocket__list{margin-top:35px}.couponadrocket__item{display:inline-block;vertical-align:top;font-size:14px;width:203px;box-sizing:border-box;position:relative}.couponadrocket__checkbox{position:absolute;opacity:0;left:-9999px}.couponadrocket__label{display:block;padding:20px 10px 20px 37px;cursor:pointer}.couponadrocket__label:before{content:"";position:absolute;left:0;top:20px;width:20px;height:19px;border-radius:2px;background:#129fdd;transition:background .2s}.couponadrocket__label:after{content:"\u2714";position:absolute;line-height:1;left:4px;top:22px;font-weight:700;color:#fff;opacity:0;transform:scale(0);transition:transform .1s}.couponadrocket__label:hover .couponadrocket__description{opacity:1}.couponadrocket__box{position:relative;box-sizing:border-box;padding-right:20px}.couponadrocket__checkbox:checked + .couponadrocket__label:after{opacity:1;transform:scale(1)}.couponadrocket__checkbox:disabled + .couponadrocket__label:before{background:#eaedf0}.couponadrocket__title{font-weight:700;margin-bottom:8px}.couponadrocket__text{margin-bottom:5px;color:#597a96}.couponadrocket__link{color:#305ccf;font-weight:700}.couponadrocket__image{display:table-cell;width:100%;border-radius:4px;margin-bottom:12px}.couponadrocket__bottom{padding:18px 45px 45px;background:#f8f8f8;display:table;width:100%;box-sizing:border-box}.couponadrocket__left{display:table-cell;vertical-align:middle;width:30%;box-sizing:border-box;padding-right:20px}.couponadrocket__right{display:table-cell;vertical-align:middle;width:70%;padding-top:20px;box-sizing:border-box;white-space:nowrap}.couponadrocket__logo{width:190px;height:46px;display:block}.couponadrocket__input{width:76%;display:inline-block;border-radius:2px;background:#eaedf0;border:0;outline:none;padding:15px 17px;box-sizing:border-box;font-size:12px}.couponadrocket__button{margin-left:19px;background:#12aaeb;border-radius:2px;font-size:12px;outline:none;border:0;color:#fff;padding:15px 17px;text-transform:uppercase}.couponadrocket__description{position:absolute;top:0;bottom:20px;left:0;right:0;background:#fff;border-radius:4px;box-shadow:2px 2px 10px #bfbfbf;box-sizing:border-box;padding:10px;opacity:0;transition:opacity .3s;line-height:1.4}.couponadrocket__preloader{display:none;position:absolute;top:0;right:0;bottom:0;left:0;z-index:25;background:#fff;background:rgba(255,255,255,0.9)}.couponadrocket__preloader:after{content:"";position:absolute;margin-left:-25px;margin-top:-50px;top:50%;left:50%;border:10px solid #f3f3f3;border-top:10px solid #12aaeb;border-bottom:10px solid #12aaeb;border-radius:50%;width:50px;height:50px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@media (max-width: 768px){.couponadrocket{padding:0}.couponadrocket__content{padding:40px 25px 22px}.couponadrocket__right,.couponadrocket__left{width:auto;display:block}.couponadrocket__right{padding-left:0}.couponadrocket__input{width:100%;display:block}.couponadrocket__button{display:block;width:100%;margin-left:0;margin-top:20px}}@media (max-width: 320px){.couponadrocket__logo{width:100%;height:auto}.couponadrocket:before{display:none}}',
        couponStyle = document.createElement('style'),
        couponDiv = document.createElement('div');
        
        couponStyle.innerHTML = couponCss;
        couponDiv.innerHTML = couponHtml;
        document.head.appendChild(couponStyle);
        document.body.appendChild(couponDiv);

        var couponPreloader = document.getElementById('couponadrocket-preloader');

  request('/show/coupons/' + params.tan + '/' + params.pageId, function(data) {
    renderCoupons(data);
  });

  function renderCoupons(data) {

    var coupon = document.getElementById('couponadrocket'),
        couponListDiv = document.getElementById('couponadrocket-list'),
        couponForm = document.getElementById('couponadrocket-form'),
        couponClose = document.getElementById('couponadrocket-close'),
        couponEmail = document.getElementById('couponadrocket-email'),
        couponError = document.getElementById('couponadrocket-error'),
        couponListHtml = '',
        couponsArr = data.coupons,
        checkedCoupons = [];

    couponsArr.forEach(function(coupon) {
      var couponItemTemplate = '<div class="couponadrocket__item">' +
                                  '<input type="checkbox" name="'+ coupon.id +'", id="'+ coupon.id +'" class="couponadrocket__checkbox">' +
                                  '<label for="'+ coupon.id +'" class="couponadrocket__label">' +
                                    '<div class="couponadrocket__box">' +
                                      '<div class="couponadrocket__title">'+ coupon.titel +'</div>' +
                                      '<img src="'+ coupon.imgUrl +'" alt="'+ coupon.titel +'" class="couponadrocket__image">' +
                                      '<div class="couponadrocket__text">'+ coupon.text +'</div>' +
                                      '<a href="'+ apiUrl +'/purchase/visit/' + data.sessionId + '/' + coupon.id +'" class="couponadrocket__link" target="_blank">'+ coupon.url +'</a>' +
                                      '<div class="couponadrocket__description">'+ coupon.descr +'</div>' +
                                    '</div>' +
                                  '</label>' +
                                '</div>';
      couponListHtml+= couponItemTemplate;            
    });

    couponListDiv.innerHTML = couponListHtml;

    var couponCheckboxes = document.querySelectorAll('.couponadrocket__checkbox');
    
    Array.prototype.forEach.call(couponCheckboxes, function(checkbox) {
       checkbox.addEventListener('change', changeHandler);
    });

    coupon.addEventListener("click", function(event) {
      if (event.target == coupon || event.target == couponClose) {
        coupon.style.display = 'none';
      }
    });

    couponForm.addEventListener("submit", function(event) {
      event.preventDefault();
      validate(function() {
        sendSelectCoupons();
      });
    });

    function changeHandler(event) {
      var couponId = event.target.id;
      changeCheckedCoupons(couponId);
      checkAvailable();
    }

    function changeCheckedCoupons(couponId) {
      if (event.target.checked) {
        checkedCoupons.push(couponId);
      } else {
        var index = checkedCoupons.indexOf(couponId);
        if (index > -1) {
          checkedCoupons.splice(index, 1);
        }
      }          
    }

    function checkAvailable() {
      var checkedCount = calcChecked(),
          isAvailable = checkedCount < couponLimit;

      Array.prototype.forEach.call(couponCheckboxes, function(checkbox) {
        if (!checkbox.checked) {
          checkbox.disabled = !isAvailable;
        }
      });
    }

    function calcChecked() {
      var checkedCount = 0;
      Array.prototype.forEach.call(couponCheckboxes, function(checkbox) {
        if (checkbox.checked) {
          checkedCount++;
        }
      });

      return checkedCount;
    }

    function validate(cb) {
      var errors = [],
          errorMessages = '';
      
      if (calcChecked() < 3) {
        errors.push('Необходимо выбрать три купона');
      }

      if (!couponEmail.value.length) {
        errors.push('Необходимо ввести Email');
      }

      errors.forEach(function(error) {
        errorMessages+= '<div class="couponadrocket__error-item">' + error + '</div>'
      });

      couponError.innerHTML = errorMessages;

      if (!errors.length) {
        cb();
      }
    }

    function sendSelectCoupons() {
      var params = checkedCoupons.slice(0);
      params.unshift(couponEmail.value);

      var url = '/purchase/coupons/' + data.sessionId;

      params.forEach(function(param) {
        url+= '/' + param;
      });

      request(url, function(data) {
        coupon.style.display = 'none';
      });          
    }
  }

  function request(url, cb) {
    couponPreloader.style.display = 'block';
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl + url, true);
    request.onload = function() {
      couponPreloader.style.display = 'none';
      if (request.status >= 200 && request.status < 400) {
        try {
          cb(JSON.parse(request.responseText));
        } catch (err) {
          cb(request.responseText);
        }
      } else {
        console.error('CouponAdRocket server error');
      }
    };
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();        
  }
})({{params}});

