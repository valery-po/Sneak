"use strict";

function disableScroll() {
  var pagePosition = window.scrollY;
  document.body.classList.add('disable-scroll');
  document.body.dataset.position = pagePosition;
  document.body.style.top = -pagePosition + 'px';
}

function enableScroll() {
  var pagePosition = parseInt(document.body.dataset.position, 10);
  document.body.style.top = 'auto';
  document.body.classList.remove('disable-scroll');
  window.scroll({
    top: pagePosition,
    left: 0
  });
  document.body.removeAttribute('data-position');
}

var burger = document.querySelector(".burger");
var menu = document.querySelector(".header__nav");
burger.addEventListener("click", function () {
  burger.classList.toggle("burger--active");
  menu.classList.toggle("header__nav--active");

  if (burger.classList.contains('burger--active')) {
    disableScroll();
  } else {
    enableScroll();
  }
});
"use strict";

var cartBtn = document.querySelector(".cart__btn");
var miniCart = document.querySelector(".mini-cart");
cartBtn.addEventListener("click", function () {
  miniCart.classList.add("mini-cart--visible");
});
document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("mini-cart") && !e.target.closest("mini-cart") && !e.target.classList.contains("cart__btn")) {//miniCart.classList.remove("mini-cart--visible");  
  }
});
"use strict";

var accordions = document.querySelectorAll('.faq-accordion');
accordions.forEach(function (el) {
  el.addEventListener('click', function (e) {
    var self = e.currentTarget;
    var control = self.querySelector('.faq-accordion__control');
    var content = self.querySelector('.faq-accordion__content');
    self.classList.toggle('open'); // если открыт аккордеон

    if (self.classList.contains('open')) {
      control.setAttribute('aria-expanded', true);
      content.setAttribute('aria-hidden', false);
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      control.setAttribute('aria-expanded', false);
      content.setAttribute('aria-hidden', true);
      content.style.maxHeight = null;
    }
  });
});
// const productsBtns =  document.querySelectorAll(".product__btn");
// productsBtns.forEach(el => {
//     el.addEventListener("focus", (e) => {
//         let parent = e.currentTarget.closest(".product__btns");
//         parent.classList.add("product__btns--active");
//     });
// });
"use strict";
/* const insta = document.querySelector('.instagram__content');
(function () {
  new InstagramFeed({
    'username': 'valery_po85',
    'display_profile': false,
    'display_biography': false,
    'display_gallery': true,
    'display_captions': true,
    'callback': function(data){
      let instaArray = data.edge_owner_to_timeline_media.edges;
      const newArray = instaArray.slice(0, 5);
      
      
      for (let item of newArray) {
        let element = item.node;
        insta.insertAdjacentHTML('afterbegin', `
          <article class="instagram__item">
            <a href="https://www.instagram.com/p/${element.shortcode}/" target="_blank">
              <img src="${element.thumbnail_src}"
                alt="${element.accessibility_caption}">
            </a>
          </article>
        `);
      }
    },
    'styling': false
  });
})(); */
"use strict";
"use strict";

ymaps.ready(init);

function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 7
  });
}
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var catalogList = document.querySelector(".catalog-list");
var prodModal = document.querySelector('[data-graph-target="prod-modal"] .modal-content');
var catalogMore = document.querySelector(".catalog__more");
var prodModalSlider = prodModal.querySelector(".modal-slider .swiper-wrapper");
var prodModalPreview = prodModal.querySelector(".modal-slider .modal-preview");
var prodModalInfo = prodModal.querySelector(".modal-info__wrapper");
var prodModalDescr = prodModal.querySelector(".modal-prod-descr");
var prodModalChars = prodModal.querySelector(".prod-chars");
var prodModalVideo = prodModal.querySelector(".prod-modal__video");
var prodQuantity = 5;
var dataLength = null;
var modal = null;

var normalPrice = function normalPrice(str) {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

var prodSlider = new Swiper('.modal-slider__container', {
  slidesPerView: 1,
  spaceBetween: 20
});

if (catalogList) {
  var loadProducts = function loadProducts() {
    var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
    fetch("./data/data.json", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      dataLength = data.length;
      catalogList.innerHTML = "";

      for (var i = 0; i < dataLength; i++) {
        if (i < quantity) {
          var item = data[i];
          catalogList.innerHTML += "\n                 <li class=\"catalog-list__item\">\n                     <article class=\"product\">\n                       <div class=\"product__image\">\n                           <img src=\"".concat(item.mainImage, "\" alt=\"").concat(item.title, "\">\n                           <div class=\"product__btns\">\n                             <button class=\"btn-reset product__btn\" data-graph-path=\"prod-modal\" data-id=\"").concat(item.id, "\" aria-label=\"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0442\u043E\u0432\u0430\u0440\u0435\">\n                             <svg width=\"26\" height=\"20\" viewBox=\"0 0 26 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                             <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.9518 10.0664C16.9518 12.2489 15.1818 14.0176 12.9993 14.0176C10.8168 14.0176 9.0481 12.2489 9.0481 10.0664C9.0481 7.88264 10.8168 6.11389 12.9993 6.11389C15.1818 6.11389 16.9518 7.88264 16.9518 10.0664Z\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                             <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.9975 19.1936C17.7575 19.1936 22.1113 15.7711 24.5625 10.0661C22.1113 4.3611 17.7575 0.938599 12.9975 0.938599H13.0025C8.2425 0.938599 3.88875 4.3611 1.4375 10.0661C3.88875 15.7711 8.2425 19.1936 13.0025 19.1936H12.9975Z\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                             </svg>\n                               \n                             </button>\n                             <button class=\"btn-reset product__btn add-to-cart-btn\" data-id=\"").concat(item.id, "\" aria-label=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443\">\n                             <svg width=\"28\" height=\"26\" viewBox=\"0 0 28 26\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                             <path d=\"M27.9999 9.28571H23.2454L18.2502 0.450683C18.0025 0.0118078 17.465 -0.131483 17.0497 0.132405C16.6353 0.396293 16.5011 0.966644 16.7498 1.40646L21.2046 9.28571H6.79543L11.2502 1.40639C11.4989 0.966581 11.3647 0.39623 10.9503 0.132342C10.5342 -0.131546 9.99842 0.0117453 9.74975 0.450621L4.75464 9.28565H0V11.1428H1.89911L4.12206 23.7266C4.35446 25.0442 5.43966 26 6.70265 26H21.2974C22.5603 26 23.6455 25.0442 23.8771 23.7275L26.1008 11.1428H28L27.9999 9.28571ZM22.1569 23.3857C22.08 23.8246 21.7186 24.1429 21.2973 24.1429H6.70265C6.28138 24.1429 5.91996 23.8246 5.84219 23.3848L3.67904 11.1428H24.321L22.1569 23.3857Z\" fill=\"white\"/>\n                            </svg>\n                             </button>\n                           </div>\n                       </div>\n                       <h3 class=\"product__title\">").concat(item.title, "</h3>\n                       <span class=\"product__price\">").concat(normalPrice(item.price), " \u0442\u0435\u043D</span>\n                     </article>\n                    </li>\n                    ");
        }
      }
    }).then(function () {
      var productTitle = document.querySelectorAll(".product__title");
      productTitle.forEach(function (el) {
        $clamp(el, {
          clamp: '22px'
        });
      });
      var productsBtns = document.querySelectorAll(".product__btn");
      productsBtns.forEach(function (el) {
        el.addEventListener("focus", function (e) {
          var parent = e.currentTarget.closest(".product__btns");
          parent.classList.add("product__btns--active");
        }, true);
        el.addEventListener("blur", function (e) {
          var parent = e.currentTarget.closest(".product__btns");
          parent.classList.remove("product__btns--active");
        }, true);
      });
      cartLogic();
      modal = new GraphModal({
        isOpen: function isOpen(modal) {
          if (modal.modalContainer.classList.contains("prod-modal")) {
            var openBtnId = modal.previousActiveElement.dataset.id;
            loadModalData(openBtnId);
            prodSlider.update();
          }
        }
      });
    });
  };

  loadProducts(prodQuantity);

  var loadModalData = function loadModalData() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    fetch("../data/data.json", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      prodModalSlider.innerHTML = "";
      prodModalPreview.innerHTML = "";
      prodModalInfo.innerHTML = "";
      prodModalDescr.textContent = "";
      prodModalChars.innerHTML = "";
      prodModalVideo.innerHTML = "";

      var _iterator = _createForOfIteratorHelper(data),
          _step;

      try {
        var _loop = function _loop() {
          var dataItem = _step.value;

          if (dataItem.id == id) {
            var slides = dataItem.gallery.map(function (image, idx) {
              return "\n              <div class=\"swiper-slide\" data-index=\"".concat(idx, "\">\n              <img src=\"").concat(image, "\" alt=\"\">\n              </div>\n              \n              ");
            });
            var preview = dataItem.gallery.map(function (image, idx) {
              return "\n              <div class=\"modal-preview__item ".concat(idx === 0 ? 'modal-preview__item--active' : '', "\" tabindex=\"0\" data-index=\"").concat(idx, "\">\n\t\t\t\t\t\t  <img src=\"").concat(image, "\" alt=\"\">\n\t\t\t\t\t   </div>\n              ");
            });
            var sizes = dataItem.sizes.map(function (size, idx) {
              return "\n              <li class=\"modal-sizes__item\">\n\t\t\t\t\t\t\t\t  <button class=\"btn-reset modal-sizes__btn\">".concat(size, "</button>\n\t\t\t\t\t\t\t</li>\n              ");
            });
            prodModalSlider.innerHTML = slides.join('');
            prodModalPreview.innerHTML = preview.join("");
            prodModalInfo.innerHTML = "\n           <h3 class=\"modal-info__title\">\n           ".concat(dataItem.title, "\n           </h3>\n           <div class=\"modal-info__rate\">\n             <img src=\"img/star.svg\" alt=\"\u0440\u0435\u0439\u0442\u0438\u043D\u0433 5 \u0438\u0437 5\">\n             <img src=\"img/star.svg\" alt=\"\">\n             <img src=\"img/star.svg\" alt=\"\">\n             <img src=\"img/star.svg\" alt=\"\">\n             <img src=\"img/star.svg\" alt=\"\">\n           </div>\n           <div class=\"modal-info__sizes\">\n             <span class=\"modal-info__subtitle\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440</span>\n             <ul class=\"list-reset modal-info__sizes-list modal-sizes\">\n               ").concat(sizes.join(''), "\n             </ul>\n           </div>\n           <div class=\"modal-info__price\">\n             <span class=\"modal-info__current-price\">").concat(dataItem.price, " \u0442\u0435\u043D</span>\n             <span class=\"modal-info__old-price\">").concat(dataItem.oldPrice ? dataItem.oldPrice + ' тен' : '', "</span>\n           </div>\n           ");
            prodModalDescr.textContent = dataItem.description;
            var charsItems = "";
            Object.keys(dataItem.chars).forEach(function eachKey(key) {
              charsItems += "<p class=\"prod-bottom__desr prod-chars__item\">".concat(key, ": ").concat(dataItem.chars[key], "</p>");
            });
            prodModalChars.innerHTML = charsItems;
            prodModalVideo.style.display = "block";

            if (dataItem.video) {
              prodModalVideo.innerHTML = "\n              <iframe src=\"".concat(dataItem.video, "\" \n              allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n              \n              ");
            } else {
              prodModalVideo.style.display = "none";
            }
          }
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }).then(function () {
      prodSlider.update();
      prodSlider.on('slideChangeTransitionEnd', function () {
        var idx = document.querySelector(".swiper-slide-active").dataset.index;
        document.querySelectorAll(".modal-preview__item").forEach(function (el) {
          el.classList.remove('modal-preview__item--active');
        });
        document.querySelector(".modal-preview__item[data-index=\"".concat(idx, "\"]")).classList.add("modal-preview__item--active");
      });
      document.querySelectorAll(".modal-preview__item").forEach(function (el) {
        el.addEventListener("click", function (e) {
          var idx = parseInt(e.currentTarget.dataset.index);
          document.querySelectorAll(".modal-preview__item").forEach(function (el) {
            el.classList.remove('modal-preview__item--active');
          });
          e.currentTarget.classList.add('modal-preview__item--active');
          prodSlider.slideTo(idx);
        });
      });
    });
  };

  catalogMore.addEventListener("click", function (e) {
    prodQuantity = prodQuantity + 3;
    loadProducts(prodQuantity);

    if (prodQuantity >= dataLength) {
      catalogMore.style.display = "none";
    } else {
      catalogMore.style.display = "block";
    }
  });
} //Работа корзины


var price = 0;
var miniCartList = document.querySelector(".mini-cart__list");
var fullPrice = document.querySelector(".mini-cart__summ");
var cartCount = document.querySelector(".cart__count");

var priceWithoutSpaces = function priceWithoutSpaces(str) {
  return str.replace(/\s/g, '');
};

var plusFullPrice = function plusFullPrice(currentPrice) {
  return price += currentPrice;
};

var minusFullPrice = function minusFullPrice(currentPrice) {
  return price -= currentPrice;
};

var printFullPrice = function printFullPrice() {
  fullPrice.textContent = "".concat(normalPrice(price), " \u0442\u0435\u043D");
};

var printQuantity = function printQuantity(num) {
  cartCount.textContent = num;
};

var loadCartData = function loadCartData() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  fetch("./data/data.json").then(function (response) {
    return response.json();
  }).then(function (data) {
    var _iterator2 = _createForOfIteratorHelper(data),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var dataItem = _step2.value;

        if (dataItem.id == id) {
          miniCartList.insertAdjacentHTML("afterbegin", "\n            <li class=\"mini-cart__item\" data-id=\"".concat(dataItem.id, "\">\n            <article class=\"mini-cart__product mini-product\">\n              <div class=\"mini-product__image\">\n                <img src=\"").concat(dataItem.mainImage, "\" alt=\"").concat(dataItem.title, "\">\n              </div>\n              <div class=\"mini-product__content\">\n                <div class=\"mini-product__text\">\n                 <h3 class=\"mini-product__title\">").concat(dataItem.title, "</h3>\n                 <span class=\"mini-product__price\">").concat(normalPrice(dataItem.price), " \u0442\u0435\u043D</span>\n                </div>\n                <button class=\"btn-reset mini-product__delete\" aria-label=\"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440\">\n                \u0423\u0434\u0430\u043B\u0438\u0442\u044C\n                  <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M18.5715 2.85715H13.5715V2.14285C13.5715 0.959387 12.6121 0 11.4287 0H8.57152C7.38805 0 6.42867 0.959387 6.42867 2.14285V2.85715H1.42865C1.03415 2.85715 0.714355 3.17695 0.714355 3.57145C0.714355 3.96595 1.03419 4.28571 1.42865 4.28571H2.20506L3.57151 19.3507C3.6052 19.7196 3.91537 20.0015 4.28581 20H15.7144C16.0848 20.0015 16.395 19.7196 16.4287 19.3507L17.7951 4.28571H18.5715C18.966 4.28571 19.2858 3.96591 19.2858 3.57141C19.2858 3.17691 18.966 2.85715 18.5715 2.85715ZM7.85722 2.14285C7.85722 1.74835 8.17702 1.42856 8.57152 1.42856H11.4287C11.8232 1.42856 12.143 1.74835 12.143 2.14285V2.85715H7.85726V2.14285H7.85722ZM15.0622 18.5714H4.93796L3.64295 4.28571H7.14296H16.3608L15.0622 18.5714Z\" fill=\"#4D4D4D\" fill-opacity=\"0.3\"/>\n                    <path d=\"M7.8573 16.381C7.85722 16.38 7.85717 16.379 7.85709 16.378L7.14279 6.37805C7.11479 5.98355 6.77227 5.68647 6.3778 5.71447C5.9833 5.74247 5.68623 6.085 5.71423 6.47946L6.42853 16.4794C6.45519 16.854 6.76733 17.144 7.14283 17.143H7.19427C7.58781 17.1157 7.88467 16.7745 7.8573 16.381Z\" fill=\"#4D4D4D\" fill-opacity=\"0.3\"/>\n                    <path d=\"M9.99994 5.71436C9.60544 5.71436 9.28564 6.03415 9.28564 6.42865V16.4286C9.28564 16.8231 9.60544 17.1429 9.99994 17.1429C10.3944 17.1429 10.7142 16.8231 10.7142 16.4286V6.42865C10.7142 6.03415 10.3944 5.71436 9.99994 5.71436Z\" fill=\"#4D4D4D\" fill-opacity=\"0.3\"/>\n                    <path d=\"M13.6219 5.71423C13.2274 5.68623 12.8849 5.9833 12.8569 6.3778L12.1426 16.3778C12.1137 16.7712 12.4091 17.1136 12.8026 17.1425C12.8038 17.1426 12.8049 17.1427 12.8062 17.1428H12.8569C13.2324 17.1437 13.5445 16.8537 13.5712 16.4792L14.2855 6.47921C14.3135 6.08475 14.0164 5.74227 13.6219 5.71423Z\" fill=\"#4D4D4D\" fill-opacity=\"0.3\"/>\n                    </svg>\n               </button>\n              </div>\n            </article>\n          </li>\n            \n            "));
          return dataItem;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }).then(function (item) {
    plusFullPrice(item.price);
    printFullPrice();
    var num = document.querySelectorAll(".mini-cart__list .mini-cart__item").length;

    if (num > 0) {
      cartCount.classList.add("cart__count--visible");
    }

    printQuantity(num);
  });
};

var cartLogic = function cartLogic() {
  var productBtn = document.querySelectorAll(".add-to-cart-btn");
  productBtn.forEach(function (el) {
    el.addEventListener("click", function (e) {
      var id = e.currentTarget.dataset.id;
      loadCartData(id);
      document.querySelector(".cart__btn").classList.remove("cart__btn--inactive");
      e.currentTarget.classList.add("product__btn--disabled");
    });
  });
  miniCartList.addEventListener("click", function (e) {
    if (e.target.classList.contains("mini-product__delete")) {
      var self = e.target;
      var parent = self.closest(".mini-cart__item");

      var _price = parseInt(priceWithoutSpaces(parent.querySelector(".mini-product__price").textContent));

      var id = parent.dataset.id;
      document.querySelector(".add-to-cart-btn[data-id='".concat(id, "']")).classList.remove("product__btn--disabled");
      parent.remove();
      minusFullPrice(_price);
      printFullPrice();
      var num = document.querySelectorAll(".mini-cart__list .mini-cart__item").length;

      if (num == 0) {
        cartCount.classList.remove("cart__count--visible");
        miniCart.classList.remove("mini-cart--visible");
        document.querySelector(".cart__btn").classList.add("cart__btn--inactive");
      }

      printQuantity(num);
    }
  });
};

var openOrderModal = document.querySelector(".mini-cart__btn");
var orderModalList = document.querySelector(".cart-modal-order__list");
var orderModalQuantity = document.querySelector(".cart-modal-order__quantity span");
var orderModalSum = document.querySelector(".cart-modal-order__summ span");
var orderModalShow = document.querySelector(".cart-modal-order__show");
openOrderModal.addEventListener("click", function () {
  var productsHtml = document.querySelector(".mini-cart__list").innerHTML;
  orderModalList.innerHTML = productsHtml;
  miniCart.classList.remove("mini-cart--visible");
  orderModalQuantity.textContent = "".concat(document.querySelectorAll(".mini-cart__list .mini-cart__item").length, " \u0448\u0442");
  orderModalSum.textContent = fullPrice.textContent;
});
orderModalShow.addEventListener("click", function () {
  if (orderModalList.classList.contains("cart-modal-order__list--visible")) {
    orderModalList.classList.remove("cart-modal-order__list--visible");
    orderModalShow.classList.remove("cart-modal-order__show--active");
  } else {
    orderModalList.classList.add("cart-modal-order__list--visible");
    orderModalShow.classList.add("cart-modal-order__show--active");
  }
});
orderModalList.addEventListener("click", function (e) {
  if (e.target.classList.contains("mini-product__delete")) {
    var self = e.target;
    var parent = self.closest(".mini-cart__item");

    var _price2 = parseInt(priceWithoutSpaces(parent.querySelector(".mini-product__price").textContent));

    var id = parent.dataset.id;
    document.querySelector(".add-to-cart-btn[data-id='".concat(id, "']")).classList.remove("product__btn--disabled");
    parent.style.display = "none";
    setTimeout(function () {
      parent.remove();
    }, 100);
    document.querySelector(".mini-cart__item[data-id=\"".concat(id, "\"]")).remove();
    minusFullPrice(_price2);
    printFullPrice();
    setTimeout(function () {
      var num = document.querySelectorAll(".cart-modal-order__list .mini-cart__item").length;

      if (num == 0) {
        cartCount.classList.remove("cart__count--visible");
        miniCart.classList.remove("mini-cart--visible");
        document.querySelector(".cart__btn").classList.add("cart__btn--inactive");
        modal.close();
      }

      printQuantity(num);
    }, 100);
  }
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var quizFormData = null;
var textareaText = null;
var quizData = [{
  number: 1,
  title: "Какой тип кроссовок рассматриваете?",
  answer_alias: "type",
  answers: [{
    answer_title: "кеды",
    type: "checkbox"
  }, {
    answer_title: "кеды",
    type: "checkbox"
  }, {
    answer_title: "кеды",
    type: "checkbox"
  }, {
    answer_title: "кеды",
    type: "checkbox"
  }, {
    answer_title: "кеды",
    type: "checkbox"
  }]
}, {
  number: 2,
  title: "Какой размер вам подойдет?",
  answer_alias: "size",
  answers: [{
    answer_title: "Менее 36",
    type: "checkbox"
  }, {
    answer_title: "36-38",
    type: "checkbox"
  }, {
    answer_title: "39-41",
    type: "checkbox"
  }, {
    answer_title: "42-44",
    type: "checkbox"
  }, {
    answer_title: "45 и больше",
    type: "checkbox"
  }]
}, {
  number: 3,
  title: "Уточните какие-либо моменты",
  answer_alias: "message",
  answers: [{
    answer_title: "Введите сообщение",
    type: "textarea"
  }]
}];

var quizTemplate = function quizTemplate() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var dataLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var number = data.number,
      title = data.title;
  var nextBtnText = options.nextBtnText;
  var answers = data.answers.map(function (item) {
    if (item.type === 'checkbox') {
      return "\n        <li class=\"quiz-question__item\">\n          <img src=\"img/sneaker.jpg\" alt=\"\">\n          <label class=\"custom-checkbox quiz-question__label\">\n            <input type=\"".concat(item.type, "\" class=\"custom-checkbox__field quiz-question__answer\" data-valid=\"false\" name=\"").concat(data.answer_alias, "\" ").concat(item.type == 'text' ? 'placeholder="Введите ваш вариант"' : '', " value=\"").concat(item.type !== 'text' ? item.answer_title : '', "\">\n            <span class=\"custom-checkbox__content\">").concat(item.answer_title, "</span>\n          </label>\n        </li>\n      ");
    } else if (item.type === 'textarea') {
      return "\n        <label class=\"quiz-question__label\">\n          <textarea placeholder=\"".concat(item.answer_title, "\" class=\"quiz-question__message\"></textarea>\n        </label>\n      ");
    } else {
      return "\n        <label class=\"quiz-question__label\">\n          <input type=\"".concat(item.type, "\" data-valid=\"false\" class=\"quiz-question__answer\" name=\"").concat(data.answer_alias, "\" ").concat(item.type == 'text' ? 'placeholder="Введите ваш вариант"' : '', " value=\"").concat(item.type !== 'text' ? item.answer_title : '', "\">\n          <span>").concat(item.answer_title, "</span>\n        </label>\n      ");
    }
  });
  return "\n    <div class=\"quiz-question\">\n      <h3 class=\"quiz-question__title\">".concat(title, "</h3>\n      <ul class=\"quiz-question__answers list-reset\">\n        ").concat(answers.join(''), "\n      </ul>\n      <div class=\"quiz-bottom\">\n        <div class=\"quiz-question__count\">").concat(number, " \u0438\u0437 ").concat(dataLength, "</div>\n        <button type=\"button\" class=\"btn btn-reset btn--thirdly quiz-question__btn\" data-next-btn>").concat(nextBtnText, "</button>\n      </div>\n    </div>\n\t");
};

var Quiz = /*#__PURE__*/function () {
  function Quiz(selector, data, options) {
    _classCallCheck(this, Quiz);

    this.$el = document.querySelector(selector);
    this.options = options;
    this.data = data;
    this.counter = 0;
    this.dataLength = this.data.length;
    this.resultArray = [];
    this.tmp = {};
    this.init();
    this.events();
  }

  _createClass(Quiz, [{
    key: "init",
    value: function init() {
      console.log('init!');
      this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options);
    }
  }, {
    key: "nextQuestion",
    value: function nextQuestion() {
      var _this = this;

      console.log('next question!');

      if (this.valid()) {
        if (this.counter + 1 < this.dataLength) {
          this.counter++;
          this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options);

          if (this.counter + 1 == this.dataLength) {
            document.querySelector('.quiz-question__answers').style.display = 'block';
          }
        } else {
          console.log('А все! конец!');
          document.querySelector('.quiz-questions').style.display = 'none';
          document.querySelector('.last-question').style.display = 'block';
          document.querySelector('.quiz__title').textContent = 'Ваша подборка готова!';
          document.querySelector('.quiz__descr').textContent = 'Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог';
          document.querySelector('.quiz-form').addEventListener('submit', function (e) {
            e.preventDefault();
            quizFormData = new FormData();

            var _iterator = _createForOfIteratorHelper(_this.resultArray),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var item = _step.value;

                for (var obj in item) {
                  quizFormData.append(obj, item[obj].substring(0, item[obj].length - 1));
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            quizFormData.append('textarea', textareaText);
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  console.log('Отправлено');
                }
              }
            };

            document.querySelector('.quiz-form').querySelectorAll('input').forEach(function (el) {
              if (el.value) {
                xhr.open('POST', 'mail.php', true);
                xhr.send(quizFormData);
                document.querySelector('.quiz-form').reset();
              }
            });
          });
        }
      } else {
        console.log('Не валидно!');
      }
    }
  }, {
    key: "events",
    value: function events() {
      var _this2 = this;

      console.log('events!');
      this.$el.addEventListener('click', function (e) {
        if (e.target == document.querySelector('[data-next-btn]')) {
          _this2.addToSend();

          _this2.nextQuestion();
        }
      });
      this.$el.addEventListener('change', function (e) {
        if (e.target.tagName == 'INPUT') {
          if (e.target.type !== 'checkbox' && e.target.type !== 'radio') {
            var elements = _this2.$el.querySelectorAll('input');

            elements.forEach(function (el) {
              el.checked = false;
            });
          }

          _this2.tmp = _this2.serialize(document.querySelector('.quiz-form'));
        } else {
          var textarea = _this2.$el.querySelector('textarea');

          textareaText = textarea.value;
        }
      });
    }
  }, {
    key: "valid",
    value: function valid() {
      var isValid = false;
      var textarea = this.$el.querySelector('textarea');

      if (textarea) {
        if (textarea.value.length > 0) {
          isValid = true;
          return isValid;
        }
      }

      var elements = this.$el.querySelectorAll('input');
      elements.forEach(function (el) {
        switch (el.nodeName) {
          case 'INPUT':
            switch (el.type) {
              case 'text':
                if (el.value) {
                  isValid = true;
                } else {
                  el.classList.add('error');
                }

              case 'checkbox':
                if (el.checked) {
                  isValid = true;
                } else {
                  el.classList.add('error');
                }

              case 'radio':
                if (el.checked) {
                  isValid = true;
                } else {
                  el.classList.add('error');
                }

            }

        }
      });
      return isValid;
    }
  }, {
    key: "addToSend",
    value: function addToSend() {
      this.resultArray.push(this.tmp);
    }
  }, {
    key: "serialize",
    value: function serialize(form) {
      var field,
          s = {};
      var valueString = '';

      if (_typeof(form) == 'object' && form.nodeName == "FORM") {
        var len = form.elements.length;

        for (var i = 0; i < len; i++) {
          field = form.elements[i];

          if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
            if (field.type == 'select-multiple') {
              for (j = form.elements[i].options.length - 1; j >= 0; j--) {
                if (field.options[j].selected) s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
              }
            } else if (field.type != 'checkbox' && field.type != 'radio' && field.value || field.checked) {
              valueString += field.value + ',';
              s[field.name] = valueString;
            }
          }
        }
      }

      return s;
    }
  }]);

  return Quiz;
}();

window.quiz = new Quiz('.quiz-form .quiz-questions', quizData, {
  nextBtnText: "Следующий шаг",
  sendBtnText: "Отправить"
});
"use strict";

var rangeSlider = document.getElementById("range-slider");

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [500, 999999],
    connect: true,
    step: 1,
    range: {
      'min': [500],
      'max': [999999]
    }
  });
  var input0 = document.getElementById("input-0");
  var input1 = document.getElementById("input-1");
  var inputs = [input0, input1];
  rangeSlider.noUiSlider.on("update", function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });

  var setRangeSlider = function setRangeSlider(i, value) {
    var arr = [null, null];
    arr[i] = value;
    console.log(arr);
    rangeSlider.noUiSlider.set(arr);
  };

  inputs.forEach(function (el, index) {
    el.addEventListener("change", function (e) {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}
"use strict";

var styles = getComputedStyle(document.documentElement);
var colorValue = styles.getPropertyValue('--color-accent');
var selector = document.querySelector('input[type="tel"]');
var im = new Inputmask("+7 (999) 999-9999");
im.mask(selector);
var productsFormData = null;

var validateForms = function validateForms(selector, rules, messages, successModal, yaGoal) {
  new window.JustValidate(selector, {
    rules: rules,
    messages: messages,
    colorWrong: colorValue,
    submitHandler: function submitHandler(form) {
      console.log(form);

      if (form.classList.contains('cart-modal__form')) {
        productsFormData = new FormData(document.querySelector('.cart-modal__form'));
        document.querySelectorAll('.cart-modal-order__list .mini-cart__item').forEach(function (el, idx) {
          var title = el.querySelector('.mini-product__title').textContent;
          var price = el.querySelector('.mini-product__price').textContent;
          productsFormData.append("product-".concat(idx + 1), "".concat(title, ", ").concat(price));
        });
        productsFormData.append("summ", "".concat(document.querySelector('.cart-modal-order__summ span').textContent));
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
            }
          }
        };

        xhr.open('POST', 'mail.php', true);
        xhr.send(productsFormData);
        form.reset();
      } else {
        var formData = new FormData(form);

        var _xhr = new XMLHttpRequest();

        _xhr.onreadystatechange = function () {
          if (_xhr.readyState === 4) {
            if (_xhr.status === 200) {
              console.log('Отправлено');
            }
          }
        };

        _xhr.open('POST', 'mail.php', true);

        _xhr.send(formData);

        form.reset();
      }
    }
  });
};

validateForms('.callback-form', {
  name: {
    required: true
  },
  phone: {
    required: true
  }
}, {
  name: {
    required: 'Вы должны ввести имя'
  },
  phone: {
    required: 'Вы должны ввести телефон'
  }
}, '.thanks-popup');
validateForms('.cart-modal__form', {
  name: {
    required: true
  },
  phone: {
    required: true
  },
  email: {
    required: true,
    email: true
  }
}, {
  name: {
    required: 'Вы должны ввести имя'
  },
  phone: {
    required: 'Вы должны ввести телефон'
  },
  email: {
    required: 'Вы должны ввести email',
    email: 'Вы должны ввести корректный email'
  }
}, '.thanks-popup');
/**
  * название функции
  *
  * @param {number} first - первое число
  * @returns {number}
  */
"use strict";
//# sourceMappingURL=main.js.map
