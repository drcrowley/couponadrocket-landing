(function(params) {
  var url = 'https://www.couponadrocket.online',
      apiUrl = 'http://94.142.139.199:8080/coupon-visitor/rs',
      couponLimit = 3,
      couponsUrl;
 
  if (params.previewLink) {
    couponsUrl = params.previewLink;
  } else {
    couponsUrl = params.test ? '/show/couponsTest' : '/show/coupons/';
    couponsUrl += params.tan + '/' + params.pageId;
  }       

  request(couponsUrl, {}, 'GET', function(data) {
    if(data.coupons && data.coupons.length) {
      if (params.testCoupon) {
        data.coupons.unshift(params.testCoupon);
      }
      renderCoupons(data);
    }
  });

  // var data = {"pageId":null,"coupons":[{"id":53,"url":"https://www.google.de","imgUrl":"banner.jpg","titel":"test2 test2 test2 test2 test2","descr":"ttest2","text":"test2"},{"id":54,"url":"https://www.google.de","imgUrl":"banner.jpg","titel":"test3","descr":"test3","text":"test3"},{"id":55,"url":"https://www.google.de","imgUrl":"banner.jpg","titel":"test4","descr":"kiuhlkjh","text":"lkjhlkj"},{"id":56,"url":"https://www.google.de","imgUrl":"banner.jpg","titel":"test5","descr":"lkjhlkjh","text":"lkjhlökhlö"},{"id":57,"url":"https://www.google.de","imgUrl":"banner.jpg","titel":"test7","descr":"liuhoiluhlihu","text":"lkjhlkjhlkjh"}],"sessionId":"Kai8r7VqBN","status":"OK"};

  // if(data.coupons.length) {
  //   if (params.testCoupon) {
  //     data.coupons.unshift(params.testCoupon);
  //   }
  //   renderCoupons(data);
  // }

  function renderCoupons(data) {
    var couponHtml = '<div class="couponadrocket couponadrocket_'+ params.colorTheme +'" id="couponadrocket">' +
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
                            '<div class="couponadrocket__bottom-row">' +
                              '<div class="couponadrocket__left">' +
                                '<a class="couponadrocket__logo" href="' + url + '" target="_blank"></a>' +
                              '</div>' +
                              '<div class="couponadrocket__right">' + 
                                '<div class="couponadrocket__email">' + 
                                  '<input type="email" placeholder="Ваш адрес e-mail" name="email" id="couponadrocket-email"  class="couponadrocket__input">' +
                                  '<button class="couponadrocket__button" id="couponadrocket-submit" type="submit" disabled>' +
                                    (params.previewLink ? '<span class="couponadrocket__tooltip">В демо режиме отправка купонов не поддерживается</span>' : '') +
                                    'Отправить' +
                                  '</button>' +
                                '</div>' +
                                '<div class="couponadrocket__confirm">' + 
                                  '<input type="checkbox" name="confirm" id="couponadrocket-confirm" class="couponadrocket__checkbox">' +
                                  '<label for="couponadrocket-confirm" class="couponadrocket__label">' +
                                    '<div class="couponadrocket__confirm-text">Я принимаю условия <a href="' + url + '/public-offer.html" target="_blank" class="couponadrocket__offer-link">пользовательского соглашения</a></div>' +
                                  '</label>' +
                                '</div>' +
                              '</div>' +
                            '</div>' +
                          '</div>' +
                          '<div class="couponadrocket__preloader" id="couponadrocket-preloader"></div>' +
                        '</form>' +
                      '</div>' +
                    '</div>',
        couponCss = '.couponadrocket{background-color:#154e6b;background-color:rgba(21,78,107,.88);position:fixed;top:0;bottom:0;left:0;right:0;z-index:2147483647;text-align:center;font-family:"Arial","Helvetica",sans-serif;line-height:1.2;font-weight:400;font-size:0;box-sizing:border-box;padding:40px;overflow:auto}.couponadrocket:before{content:"";display:inline-block;vertical-align:middle;height:100%;width:1px;margin-right:-1px}.couponadrocket__close{position:absolute;top:0;right:0;font-size:18px;color:#12aaeb;background:transparent;border-radius:3px;border:0;outline:none;cursor:pointer;width:40px;height:40px}.couponadrocket__holder{min-width:195px;max-width:1022px;padding:25px;box-sizing:border-box;display:inline-block;vertical-align:middle;text-align:left;position:relative}.couponadrocket__form{background:#fff;border-radius:4px;overflow:hidden;display:block;position:relative}.couponadrocket__content{padding:45px 35px 10px;box-sizing:border-box;position:relative;text-align:center}.couponadrocket__errors{font-size:14px;color:#e21616;text-align:center;margin-top:30px}.couponadrocket__error-item + .couponadrocket__error-item{margin-top:15px}.couponadrocket__head{font-size:32px;color:#12aaeb;text-align:center;margin-bottom:10px}.couponadrocket__sub-head{font-size:14px;color:#597a96;text-align:center}.couponadrocket__list{margin-top:35px;margin-left:-17px;margin-right:-17px;display:inline-block;text-align:left}.couponadrocket__item{display:inline-block;vertical-align:top;font-size:14px;width:234px;box-sizing:border-box;position:relative;padding:20px 17px}.couponadrocket__checkbox{position:absolute;opacity:0;left:-9999px}.couponadrocket__label{display:block;cursor:pointer;position:relative}.couponadrocket__label:before{content:"";position:absolute;left:0;top:0;width:20px;height:19px;border-radius:2px;background:#129fdd;transition:background .2s}.couponadrocket__label:after{content:"\u2714";position:absolute;line-height:1;left:4px;top:2px;font-weight:700;color:#fff;opacity:0;transform:scale(0);transition:transform .1s}.couponadrocket__box{position:relative;box-sizing:border-box}.couponadrocket__checkbox:checked + .couponadrocket__label:after{opacity:1;transform:scale(1)}.couponadrocket__checkbox:disabled + .couponadrocket__label:before{background:#eaedf0}.couponadrocket__title{min-height:33px;margin-bottom:15px;padding-left:35px;overflow:hidden}.couponadrocket__title-link{color:#129fdd;font-weight:700;text-decoration:underline;position:relative;z-index:1}.couponadrocket__description{margin-bottom:10px;color:#597a96}.couponadrocket__image{display:table-cell;width:100%;border-radius:4px;margin-top:10px;margin-bottom:12px}.couponadrocket__bottom{padding:18px 45px 45px;background:#f8f8f8;box-sizing:border-box}.couponadrocket__bottom-row{display:table;width:100%}.couponadrocket__left{display:table-cell;vertical-align:middle;width:30%;box-sizing:border-box;padding-right:20px}.couponadrocket__right{display:table-cell;vertical-align:middle;width:70%;padding-top:20px;box-sizing:border-box;white-space:nowrap}.couponadrocket__logo{width:190px;height:46px;display:block;background-repeat:no-repeat;background-position:0 0;background-size:cover}.couponadrocket__email{position:relative;padding-right:125px;box-sizing:border-box}.couponadrocket__input{display:block;width:100%;border-radius:2px;background:#eaedf0;border:0;outline:none;padding:15px 17px;box-sizing:border-box;font-size:12px}.couponadrocket__button{position:relative;margin-left:19px;background:#12aaeb;border-radius:2px;font-size:12px;outline:none;border:0;color:#fff;padding:15px 17px;text-transform:uppercase;position:absolute;right:0;top:0;bottom:0;cursor:pointer;}.couponadrocket__button:disabled{background:#b7b7b7!important}.couponadrocket__tooltip{font-size:12px;position:absolute;bottom:120%;left:-20px;right:-20px;display:block;background:#000;border-radius:5px;color: #fff;white-space: normal;text-transform:none;padding:5px;margin-top:-3px;opacity:0;transition:opacity 0.2s}.couponadrocket__tooltip:after{content:"";position:absolute;width:0;height:0;  border-color:transparent;border-style:solid;bottom:-5px;left:50%;margin-left:-5px;border-width:5px 5px 0;border-top-color:#000;}.couponadrocket__button:hover .couponadrocket__tooltip{opacity:0.9;}.couponadrocket__desc-link{color:#129fdd;text-decoration:underline}.couponadrocket__desc-link:hover + .couponadrocket__text{opacity:1;z-index:1}.couponadrocket__text{position:absolute;top:0;bottom:25px;left:0;right:0;background:#fff;border-radius:4px;box-shadow:2px 2px 10px #bfbfbf;box-sizing:border-box;padding:10px;opacity:0;transition:opacity .3s;line-height:1.4;font-size:12px}.couponadrocket__image-link{display:block;position:relative;z-index:1}.couponadrocket__confirm{position:relative;font-size:14px;margin-top:15px}.couponadrocket__confirm-text{padding-left:30px;padding-top:1px;white-space:normal}.couponadrocket__preloader{display:none;position:absolute;top:0;right:0;bottom:0;left:0;z-index:25;background:#fff;background:rgba(255,255,255,0.9)}.couponadrocket__preloader:after{content:"";position:absolute;margin-left:-25px;margin-top:-50px;top:50%;left:50%;border:10px solid #f3f3f3;border-top:10px solid #12aaeb;border-bottom:10px solid #12aaeb;border-radius:50%;width:50px;height:50px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.couponadrocket__offer-link{color:#129fdd;}.couponadrocket_blue{background-color:#154e6b;background-color:rgba(21,78,107,.88)}.couponadrocket_blue .couponadrocket__close{color:#12aaeb}.couponadrocket_blue .couponadrocket__head{color:#12aaeb}.couponadrocket_blue .couponadrocket__button{background:#12aaeb}.couponadrocket_blue .couponadrocket__preloader:after{border-color:#12aaeb}.couponadrocket_blue .couponadrocket__label:before{background:#12aaeb}.couponadrocket_blue .couponadrocket__logo{background-image:url(data:image/png;base64,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)}.couponadrocket_green{background-color:#2e692e;background-color:rgba(46,105,46,.88)}.couponadrocket_green .couponadrocket__close{color:#31cc32}.couponadrocket_green .couponadrocket__head{color:#31cc32}.couponadrocket_green .couponadrocket__button{background:#31cc32}.couponadrocket_green .couponadrocket__preloader:after{border-color:#31cc32}.couponadrocket_green .couponadrocket__label:before{background:#31cc32}.couponadrocket_green .couponadrocket__logo{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAAA7CAYAAACquGzbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZCM0FGQzY0RjYxNDExRTZBNUU1QTJFOTYwM0YxMDg5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZCM0FGQzY1RjYxNDExRTZBNUU1QTJFOTYwM0YxMDg5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkIzQUZDNjJGNjE0MTFFNkE1RTVBMkU5NjAzRjEwODkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkIzQUZDNjNGNjE0MTFFNkE1RTVBMkU5NjAzRjEwODkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7+bLS7AAAMWUlEQVR42uxd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)}.couponadrocket_red{background-color:#ff6666;background-color:rgba(255, 102, 102, 0.88);}.couponadrocket_red .couponadrocket__close{color:#ff6666}.couponadrocket_red .couponadrocket__head{color:#ff6666}.couponadrocket_red .couponadrocket__button{background:#ff6666}.couponadrocket_red .couponadrocket__preloader:after{border-color:#ff6666}.couponadrocket_red .couponadrocket__label:before{background:#ff6666}.couponadrocket_red .couponadrocket__logo{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAAA7CAYAAACquGzbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEI2MTg1NDQxN0M4MTFFN0I4NzhBOTU0REJEOTYzRUUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEI2MTg1NDMxN0M4MTFFN0I4NzhBOTU0REJEOTYzRUUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDdFQ0M2QzhGNjE1MTFFNjhEMzZCOEM0QjUwNzExRUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDdFQ0M2QzlGNjE1MTFFNjhEMzZCOEM0QjUwNzExRUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7RIolhAAAMSklEQVR42uxd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)}.couponadrocket_orange{background-color:#a06021;background-color:rgba(160,96,33,.88)}.couponadrocket_orange .couponadrocket__close{color:#ff9934}.couponadrocket_orange .couponadrocket__head{color:#ff9934}.couponadrocket_orange .couponadrocket__button{background:#ff9934}.couponadrocket_orange .couponadrocket__preloader:after{border-color:#ff9934}.couponadrocket_orange .couponadrocket__label:before{background:#ff9934}.couponadrocket_orange .couponadrocket__logo{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAAA7CAYAAACquGzbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkExRjJEOUZCRjYxNTExRTY4MTc1RjdBMzY5RkUzRkFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkExRjJEOUZDRjYxNTExRTY4MTc1RjdBMzY5RkUzRkFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTFGMkQ5RjlGNjE1MTFFNjgxNzVGN0EzNjlGRTNGQUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTFGMkQ5RkFGNjE1MTFFNjgxNzVGN0EzNjlGRTNGQUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5J96cmAAAMYUlEQVR42uxd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)}@media (max-width: 768px){.couponadrocket{padding:0}.couponadrocket__content{padding:40px 25px 22px}.couponadrocket__right,.couponadrocket__left{width:auto;display:block}.couponadrocket__right{padding-left:0}.couponadrocket__input{width:100%;display:block}.couponadrocket__button{display:block;width:100%;margin-left:0;margin-top:20px;position:static}.couponadrocket__email{padding:0}}@media (max-width: 320px){.couponadrocket__logo{width:100%;height:auto}.couponadrocket:before{display:none}}',
      
        couponStyle = document.createElement('style'),
        couponDiv = document.createElement('div');

    couponStyle.innerHTML = couponCss;
    couponDiv.innerHTML = couponHtml;

    document.head.appendChild(couponStyle);
    document.body.appendChild(couponDiv);
      
    var coupon = document.getElementById('couponadrocket'),
        couponListDiv = document.getElementById('couponadrocket-list'),
        couponForm = document.getElementById('couponadrocket-form'),
        couponClose = document.getElementById('couponadrocket-close'),
        couponEmail = document.getElementById('couponadrocket-email'),
        couponConfirm = document.getElementById('couponadrocket-confirm'),
        couponSubmit = document.getElementById('couponadrocket-submit'),
        couponError = document.getElementById('couponadrocket-error'),
        couponPreloader = document.getElementById('couponadrocket-preloader'),
        couponListHtml = '',
        couponsArr = data.coupons,
        checkedCoupons = [];

    couponsArr.forEach(function(coupon) {
      var visitUrl = data.sessionId ? apiUrl +'/purchase/visit/' + data.sessionId + '/' + coupon.id : '#';
      var couponItemTemplate = '<div class="couponadrocket__item">' +
                                  '<input type="checkbox" name="'+ coupon.id +'", id="'+ coupon.id +'" class="couponadrocket__checkbox">' +
                                  '<label for="'+ coupon.id +'" class="couponadrocket__label">' +
                                    '<div class="couponadrocket__box">' +
                                      '<div class="couponadrocket__title">'+ 
                                        '<a href="'+ visitUrl +'" '+ (data.sessionId ? 'target="_blank"' : '') +' class="couponadrocket__title-link">'+ 
                                          coupon.titel +
                                        '</a>' +
                                      '</div>' +
                                      '<img src="'+ coupon.imgUrl +'" alt="'+ coupon.titel +'" class="couponadrocket__image">' +
                                      '<div class="couponadrocket__description">'+ coupon.descr +'</div>' +
                                      '<div class="couponadrocket__desc-link">Условия использования</div>' +
                                      '<div class="couponadrocket__text">'+ coupon.text +'</div>' +
                                    '</div>' +
                                  '</label>' +
                                '</div>';
      couponListHtml+= couponItemTemplate;
    });

    couponListDiv.innerHTML = couponListHtml;

    var couponCheckboxes = couponListDiv.querySelectorAll('.couponadrocket__checkbox');
    
    Array.prototype.forEach.call(couponCheckboxes, function(checkbox) {
       checkbox.addEventListener('change', changeHandler);
    });

    if (!params.previewLink) {
      couponConfirm.addEventListener('change', changeConfirm);
    }
    
    coupon.addEventListener("click", function(event) {
      if (event.target == coupon || event.target == couponClose) {
        couponDiv.removeChild(coupon);
      }
    });

    couponForm.addEventListener("submit", function(event) {
      event.preventDefault();
      validate(function() {
        sendCoupons();
      });
    });

    function changeHandler(event) {
      var couponId = event.target.id;
      var isChecked = event.target.checked;
      changeCheckedCoupons(isChecked, couponId);
      checkAvailable();
    }

    function changeCheckedCoupons(isChecked, couponId) {
      if (isChecked) {
        checkedCoupons.push(couponId);
      } else {
        var index = checkedCoupons.indexOf(couponId);
        if (index > -1) {
          checkedCoupons.splice(index, 1);
        }
      }          
    }

    function changeConfirm(event) {
      couponSubmit.disabled = !event.target.checked;
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
      
      if (calcChecked() < 1) {
        errors.push('Необходимо выбрать купоны');
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

    function sendCoupons() {
      couponPreloader.style.display = 'none';
      var couponParams = {
        coupons: checkedCoupons,
        email: couponEmail.value,
        sessionId: data.sessionId
      };

      var url = '/purchase/coupons';

      request(url, couponParams, 'POST', function(data) {
        couponPreloader.style.display = 'none';
        couponDiv.removeChild(coupon);
      });
    }
  }

  function request(url, params, reqType, cb) {
    var request = new XMLHttpRequest(),
        params = JSON.stringify(params);

    request.open(reqType, apiUrl + url, true);
    request.onload = function() {    
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
    request.send(params);        
  }
})({{params}});
