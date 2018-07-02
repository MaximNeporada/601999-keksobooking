'use strict';
var MAIN_PIN_AFFTER = 22;// взято из css
var mapPinMain = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');
var map = document.querySelector('.map');
var greateMapElement = function () {

  var AVATARS = [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'
  ];

  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var TYPES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  // функция получения случайного числа от min до max не включая max
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // функция создания массива случайных данных
  var createRandomArray = function (array, count, sort) {
    var result = [];
    var tempArray = array.slice(0);
    for (var i = 0; i < count; i++) {
      var randomIndex = getRandomInt(0, tempArray.length);
      result.push(tempArray[randomIndex]);
      tempArray.splice(randomIndex, 1);
    }
    if (sort) {
      return result.sort();
    }
    return result;
  };

  // функция создания массива объектов
  var createObjects = function () {
    var objects = [];
    var COUNT_ELEMENT = 8;
    for (var i = 0; i < COUNT_ELEMENT; i++) {
      var avatarsIndex = getRandomInt(0, AVATARS.length);
      var titlesIndex = getRandomInt(0, TITLES.length);
      var locationX = getRandomInt(300, 1051);
      var locationY = getRandomInt(130, 630);
      objects.push({
        'author': {
          'avatar': AVATARS[avatarsIndex]
        },
        'offer': {
          'title': TITLES[titlesIndex],
          'address': locationX + ', ' + locationY,
          'price': getRandomInt(1000, 1000001),
          'type': ['flat', 'house', 'bungalo'][getRandomInt(0, 3)],
          'rooms': getRandomInt(2, 6),
          'guests': getRandomInt(1, 12),
          'checkin': ['12:00', '13:00', '14:00'][getRandomInt(0, 3)],
          'checkout': ['12:00', '13:00', '14:00'][getRandomInt(0, 3)],
          'features': createRandomArray(FEATURES, getRandomInt(1, FEATURES.length)),
          'description': '',
          'photos': createRandomArray(PHOTOS, 3, false)
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      });
      AVATARS.splice(avatarsIndex, 1);
      TITLES.splice(titlesIndex, 1);
    }

    return objects;
  };

  // Создание кнопок на основе данных из списка объектов
  var createButtons = function (objects) {
    var documentFragment = document.createDocumentFragment();
    for (var i = 0; i < objects.length; i++) {
      var button = document.createElement('button');
      var img = document.createElement('img');
      button.style.left = objects[i].location.x + 'px';
      button.style.top = objects[i].location.y + 'px';
      button.classList.add('map__pin');
      img.src = objects[i].author.avatar;
      img.width = '40';
      img.height = '40';
      img.draggable = 'false';
      button.appendChild(img);
      documentFragment.appendChild(button);
    }
    return documentFragment;
  };

  // функция создания и установка фотографий
  var createPhoto = function (arrayPhoto, photoElement, photoBlock) {
    for (var l = 0; l < arrayPhoto.length; l++) {
      var photo = photoElement.cloneNode(true);
      photo.style.verticalAlign = 'bottom';
      photo.src = arrayPhoto[l];
      photo.width = 63;
      photo.style.marginRight = 5 + 'px';
      photoBlock.appendChild(photo);
    }
  };

  // функция установки опций
  var greateOption = function (arrayOption, OptionBlock) {
    for (var j = 0; j < arrayOption.length; j++) {
      var li = document.createElement('LI');
      li.classList.add('feature', 'feature--' + arrayOption[j]);
      OptionBlock.appendChild(li);
    }
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
    greateOption(arrayFeatures, popupFeatures);// установка опций

    popupFeatures.nextElementSibling.textContent = object.offer.description; // установка описания

    createPhoto(arrayObjectPhoto, popupPicturesElement, popupPictures);

    popupPictures.removeChild(popupPictures.children[0]);
    map.appendChild(popup);

    // нажатие на кнопку крестик попапа
    var buttonClosePopup = document.querySelector('.popup__close');
    buttonClosePopup.addEventListener('click', removeMapCards);
  };
  // функции очиски карты от попапов
  var removeMapCards = function () {
    var cards = document.querySelectorAll('.map__card');
    Object.keys(cards).forEach(function (index) {
      cards[index].parentNode.removeChild(cards[index]);
    });
  };
  // доабавление пинов на карту
  var mapPins = map.querySelector('.map__pins');

  var objects = createObjects();
  var buttons = createButtons(objects);
  mapPins.appendChild(buttons);
  map.classList.remove('map--faded');

  // удаление с формы класса ad-form--disabled и атрибута disabled со всех fieldeset
  var fieldsetAll = document.querySelectorAll('fieldset');
  var noticeForm = document.querySelector('.ad-form');
  noticeForm.classList.remove('ad-form--disabled');
  for (var v = 0; v < fieldsetAll.length; v++) {
    var fieldsetIndex = fieldsetAll[v];
    fieldsetIndex.removeAttribute('disabled');
  }


  // функция заполнения поля формы "адресс"
  var getLocationInitial = function (mainpin, address) {
    var location = {
      locationX: mainpin.offsetLeft + Math.ceil(mainpin.offsetWidth / 2),
      locationY: mainpin.offsetTop + mainpin.offsetHeight + MAIN_PIN_AFFTER
    };
    address.value = location.locationX + ', ' + location.locationY;
  };

  getLocationInitial(mapPinMain, addressInput);
  var pins = document.querySelectorAll('.map__pin');
  for (var j = 0; j< pins.length; j++) {
    if (pins[j].classList.length < 2) {
      pins[j].addEventListener('click', function () {
        createPopup(objects[j]);
      });
    }
  }
};

// заполнение поле формы Адресс при начальной загрузки страницы
var createStartAdress = function () {
  var locationMapPinMain = {
    x: mapPinMain.offsetLeft + Math.ceil(mapPinMain.offsetWidth / 2),
    y: mapPinMain.offsetTop + Math.ceil(mapPinMain.offsetHeight / 2)
  };

  addressInput.value = locationMapPinMain.x + ', ' + locationMapPinMain.y;
};

createStartAdress();
// действия при отпускании нажатой кнопки  с главного пина
mapPinMain.addEventListener('mouseup', greateMapElement);

