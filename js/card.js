'use strict';
(function () {
  var TYPES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };
  var ESC_KEYCODE = 27;
  window.map = document.querySelector('.map');
  window.escPressHandler = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };
  // функция создания и установка фотографий
  var createPhoto = function (arrayPhoto, photoElement, photoBlock) {
    for (var l = 0; l < arrayPhoto.length; l++) {
      var photo = photoElement.cloneNode(true);
      var photoArr = arrayPhoto[l];
      photo.style.verticalAlign = 'bottom';
      photo.src = photoArr;
      photo.width = 63;
      photo.style.marginRight = 5 + 'px';
      photoBlock.appendChild(photo);
    }
  };

  // функция установки опций
  var createOption = function (arrayOption, OptionBlock) {
    for (var j = 0; j < arrayOption.length; j++) {
      var li = document.createElement('LI');
      li.classList.add('feature', 'feature--' + arrayOption[j]);
      OptionBlock.appendChild(li);
    }
  };

  // функции очиски карты от попапов
  window.removePopup = function () {
    var cards = document.querySelectorAll('.map__card');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('map__pin--active');
    }
    Object.keys(cards).forEach(function (index) {
      cards[index].parentNode.removeChild(cards[index]);
    });
  };

  // функция создания попапа на основе данных объекта
  var createPopup = function (object) {
    var templatePopup = document.querySelector('template');
    var mapCard = templatePopup.content.querySelector('.map__card');
    var popup = mapCard.cloneNode(true);
    var popupPictures = popup.querySelector('.popup__photos');
    var popupPicturesElement = popupPictures.children[0];
    var arrayObjectPhoto = object.offer.photos;

    popup.querySelector('.popup__avatar').src = object.author.avatar;
    popup.querySelector('.popup__title').textContent = object.offer.title;
    popup.querySelector('.popup__text--address').textContent = object.offer.address;
    popup.querySelector('.popup__text--price').textContent = object.offer.price + ' ₽/ночь';

    var offerType = popup.querySelector('h4');
    offerType.textContent = TYPES[object.offer.type];

    var capacity = offerType.nextElementSibling; // получение контейнера вместимости
    capacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей'; // установка вместимости
    capacity.nextElementSibling.textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout; // установка расписания

    var popupFeatures = popup.querySelector('.popup__features');
    popupFeatures.innerHTML = '';
    var arrayFeatures = object.offer.features;
    createOption(arrayFeatures, popupFeatures);// установка опций

    popupFeatures.nextElementSibling.textContent = object.offer.description; // установка описания

    createPhoto(arrayObjectPhoto, popupPicturesElement, popupPictures);

    popupPictures.removeChild(popupPictures.children[0]);
    window.map.appendChild(popup);

    // нажатие на кнопку крестик попапа
    var buttonClosePopup = document.querySelector('.popup__close');
    buttonClosePopup.addEventListener('click', window.removePopup);

    window.map.addEventListener('keydown', function (evt) {
      window.escPressHandler(evt, window.removePopup);
    });
  };


  // функция вызова попапа
  window.showPopup = function (object) {
    window.removePopup();
    createPopup(object);
  };
})();
