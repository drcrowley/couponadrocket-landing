(function(params) {
  console.log(params);
  var apiUrl = 'http://94.142.139.199:8080',
      couponHtml = '<div class="couponadrocket" id="couponadrocket">' +
                      '<div class="couponadrocket__holder">' +
                        '<form class="couponadrocket__form" id="couponadrocket-form">' +
                          '<div class="couponadrocket__content">' +
                            '<div class="couponadrocket__head">Спасибо за заказ!</div>' +
                            '<div class="couponadrocket__sub-head">Выберите 3 любых купона от наших партнеров.</div>' +
                            '<div class="couponadrocket__sub-head">Выбранные купоны будут отправлены на ваш е-mail!</div>' +
                            '<div class="couponadrocket__list" id="couponadrocket-list"></div>' +
                          '</div>' +
                          '<div class="couponadrocket__bottom">' +
                            '<div class="couponadrocket__left">' +
                              '<img src="build/images/logo_black.png" class="couponadrocket__logo" alt="">' +
                            '</div>' +
                            '<div class="couponadrocket__right">' + 
                              '<input type="email" placeholder="Ваш адрес e-mail" name="email" id="email" class="couponadrocket__input">' +
                              '<button class="couponadrocket__button" type="submit">Отправить</button>' +
                            '</div>' +
                          '</div>' +
                        '</form>' +
                        '<button class="couponadrocket__close" id="couponadrocket-close" type="button">X</button>' + 
                      '</div>' +
                    '</div>',
      couponCss = '.couponadrocket{background-color:#154e6b;background-color:rgba(21,78,107,.88);position:fixed;top:0;bottom:0;left:0;right:0;z-index:2147483647;text-align:center;font-family:"Arial","Helvetica",sans-serif;line-height:1.2;font-weight:400;font-size:0;box-sizing:border-box;padding:40px;overflow:auto}.couponadrocket:before{content:"";display:inline-block;vertical-align:middle;height:100%;width:1px;margin-right:-1px}.couponadrocket__close{position:absolute;top:0;right:0;font-size:18px;color:#12aaeb;background:#fff;border-radius:3px;border:0;outline:none;cursor:pointer}.couponadrocket__holder{min-width:195px;max-width:956px;padding:26px;box-sizing:border-box;display:inline-block;vertical-align:middle;text-align:left;position:relative}.couponadrocket__form{background:#fff;border-radius:4px;overflow:hidden;display:block}.couponadrocket__content{padding:22px 45px;box-sizing:border-box}.couponadrocket__head{font-size:32px;color:#12aaeb;text-align:center;margin-bottom:10px}.couponadrocket__sub-head{font-size:14px;color:#597a96;text-align:center}.couponadrocket__list{margin-top:13px}.couponadrocket__item{display:inline-block;vertical-align:top;font-size:14px;width:203px;box-sizing:border-box;position:relative}.couponadrocket__checkbox{position:absolute;opacity:0;left:-9999px}.couponadrocket__label{display:block;padding:14px 10px 14px 37px;cursor:pointer}.couponadrocket__label:before{content:"";position:absolute;left:0;top:20px;width:20px;height:19px;border-radius:2px;background:#129fdd}.couponadrocket__label:after{content:"\u2714";position:absolute;line-height:1;left:4px;top:22px;font-weight:700;color:#fff;opacity:0;transform:scale(0);transition:transform .1s}.couponadrocket__label:hover .couponadrocket__description{opacity:1}.couponadrocket__box{position:relative}.couponadrocket__checkbox:checked + .couponadrocket__label:after{opacity:1;transform:scale(1)}.couponadrocket__title{font-weight:700;margin-bottom:8px}.couponadrocket__text{margin-bottom:2px;color:#597a96}.couponadrocket__link{color:#305ccf;font-weight:700}.couponadrocket__image{display:table-cell;width:134px;height:116px;border-radius:4px;margin-bottom:12px}.couponadrocket__bottom{padding:18px 45px 46px;background:#f8f8f8;display:table;width:100%;box-sizing:border-box}.couponadrocket__left{display:table-cell;vertical-align:middle;width:30%;box-sizing:border-box;padding-right:20px}.couponadrocket__right{display:table-cell;vertical-align:middle;width:70%;padding-top:20px;box-sizing:border-box;white-space:nowrap}.couponadrocket__logo{width:190px;height:46px;display:block}.couponadrocket__input{width:76%;display:inline-block;border-radius:2px;background:#eaedf0;border:0;outline:none;padding:15px 17px;box-sizing:border-box;font-size:12px}.couponadrocket__button{margin-left:19px;background:#12aaeb;border-radius:2px;font-size:12px;outline:none;border:0;color:#fff;padding:15px 17px;text-transform:uppercase}.couponadrocket__description{position:absolute;top:0;bottom:0;left:0;right:0;background:#fff;border-radius:4px;box-shadow:2px 2px 10px #bfbfbf;box-sizing:border-box;padding:10px;opacity:0;transition:opacity .3s;line-height:1.4}@media (max-width: 768px){.couponadrocket{padding:0}.couponadrocket__content{padding:22px 25px}.couponadrocket__right,.couponadrocket__left{width:auto;display:block}.couponadrocket__right{padding-left:0}.couponadrocket__input{width:100%;display:block}.couponadrocket__button{display:block;width:100%;margin-left:0;margin-top:20px}}@media (max-width: 320px){.couponadrocket__logo{width:100%;height:auto}.couponadrocket:before{display:none}}',
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
      couponListHtml = '',
      couponsArr = [
        {
          id: 1, 
          url: 'http://avtoservice.ru', 
          imgUrl: 'http://placehold.it/134x116',
          titel: 'Диагностика двигателя беслпатно',
          descr: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!', 
          text: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!'
        },
        {
          id: 2, 
          url: 'http://avtoservice.ru', 
          imgUrl: 'http://placehold.it/134x116',
          titel: 'Диагностика двигателя беслпатно',
          descr: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!', 
          text: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!'
        },
        {
          id: 3, 
          url: 'http://avtoservice.ru', 
          imgUrl: 'http://placehold.it/134x116',
          titel: 'Диагностика двигателя беслпатно',
          descr: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!', 
          text: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!'
        },
        {
          id: 4, 
          url: 'http://avtoservice.ru', 
          imgUrl: 'http://placehold.it/134x116',
          titel: 'Диагностика двигателя беслпатно',
          descr: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!', 
          text: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!'
        },
        {
          id: 5, 
          url: 'http://avtoservice.ru', 
          imgUrl: 'http://placehold.it/134x116',
          titel: 'Диагностика двигателя беслпатно',
          descr: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!', 
          text: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!'
        },
        {
          id: 6, 
          url: 'http://avtoservice.ru', 
          imgUrl: 'http://placehold.it/134x116',
          titel: 'Диагностика двигателя беслпатно',
          descr: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!', 
          text: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!'
        },
        {
          id: 7, 
          url: 'http://avtoservice.ru', 
          imgUrl: 'http://placehold.it/134x116',
          titel: 'Диагностика двигателя беслпатно',
          descr: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!', 
          text: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!'
        },
        {
          id: 8, 
          url: 'http://avtoservice.ru', 
          imgUrl: 'http://placehold.it/134x116',
          titel: 'Диагностика двигателя беслпатно',
          descr: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!', 
          text: 'Диагностика любых автомобилей при предьявлении купона БЕСЛПАТНО!'
        }                     
      ];
      couponsArr.forEach(function(coupon) {
        var couponItemTemplate = '<div class="couponadrocket__item">' +
                                    '<input type="checkbox" name="'+ coupon.id +'", id="'+ coupon.id +'" class="couponadrocket__checkbox">' +
                                    '<label for="'+ coupon.id +'" class="couponadrocket__label">' +
                                      '<div class="couponadrocket__box">' +
                                        '<div class="couponadrocket__title">'+ coupon.titel +'</div>' +
                                        '<img src="'+ coupon.imgUrl +'" alt="'+ coupon.titel +'" class="couponadrocket__image">' +
                                        '<div class="couponadrocket__text">'+ coupon.text +'</div>' +
                                        '<a href="'+ apiUrl +'/purchase/visit/'+ coupon.id +'" class="couponadrocket__link" target="_blank">'+ coupon.url +'</a>' +
                                        '<div class="couponadrocket__description">'+ coupon.descr +'</div>' +
                                      '</div>' +
                                    '</label>' +
                                  '</div>';
        couponListHtml+= couponItemTemplate;            
      });

  couponListDiv.innerHTML = couponListHtml;

  coupon.addEventListener("click", function(event) {
    if (event.target == coupon || event.target == couponClose) {
      coupon.style.display = 'none';
    }
  });

  couponForm.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(event);
  });
})({{params}});
