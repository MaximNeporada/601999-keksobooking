'use strict';

// переменные
var mapPinMain = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');
var map = document.querySelector('.map');
var noticeType = document.querySelector('#type');
var noticePrice = document.querySelector('#price');
var noticeTimein = document.querySelector('#timein');
var noticeTimeout = document.querySelector('#timeout');
var noticeRoomNumber = document.querySelector('#room_number');
var noticeCapacity = document.querySelector('#capacity');
var roomsCapacityValue = {
  rooms: 1,
  capacity: 1
};
var TYPE_MIN_PRICE = {
  flat: 1000,
  bungalo: 0,
  house: 5000,
  palace: 10000
};
var MAX_GUESTS_PER_ROOM = 1;
var MAIN_PIN_AFFTER = 22;// взято из css
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

// функция получение опции
var getDependentOption = function (option, dependentArray) {
  var valueSelected = option.value;
  for (var i = 0; i < dependentArray.options.length; i++) {
    if (dependentArray.options[i].value === valueSelected) {
      dependentArray.options[i].selected = 'true';
    }
  }
};

// событие при изменении типа жилья меняется минимальная цена за ночь
noticeType.addEventListener('change', function (evt) {
  var typeOption = evt.target;
  typeOption.selected = 'true';
  noticePrice.placeholder = TYPE_MIN_PRICE[typeOption.value];
  noticePrice.min = TYPE_MIN_PRICE[typeOption.value];
});

// событие при изменении времени заезда меняется время выезда
noticeTimein.addEventListener('change', function (evt) {
  var timeinOption = evt.target;
  timeinOption.selected = 'true';
  getDependentOption(timeinOption, noticeTimeout);
});

// событие при изменении времени выезда меняется время заезда
noticeTimeout.addEventListener('change', function (evt) {
  var timeoutOption = evt.target;
  timeoutOption.selected = 'true';

  getDependentOption(timeoutOption, noticeTimein);
});

// событие при изменение количесива комнат
noticeRoomNumber.addEventListener('change', function (evt) {
  var roomOption = evt.target;
  roomOption.selected = true;
  roomsCapacityValue.rooms = roomOption.value;

  var differentValue = noticeCapacity.querySelector('option[value=\'0\']');
  getDependentOption(roomOption, noticeCapacity);

  if (roomOption.value === '100') {
    differentValue.selected = 'true';
  }

  setGuestsValidity(noticeCapacity);
});

// событие при изменение количесива гостей
noticeCapacity.addEventListener('change', function (evt) {
  var capacityOption = evt.target;
  capacityOption.selected = true;
  roomsCapacityValue.capacity = capacityOption.value;

  setGuestsValidity(noticeCapacity);
});
// функции проверки количества гостей
var setGuestsValidity = function (field) {
  if ((roomsCapacityValue.capacity / roomsCapacityValue.rooms) > MAX_GUESTS_PER_ROOM) {
    field.setCustomValidity('Количество гостей превышает максимально возможное. \nКоличество комнат должно быть не меньше ' + (roomsCapacityValue.capacity / MAX_GUESTS_PER_ROOM) + '.');
  } else if (roomsCapacityValue.capacity === '0' && roomsCapacityValue.rooms !== '100') {
    field.setCustomValidity('Выберите вариант: 100 комнат.');
  } else if (roomsCapacityValue.capacity !== '0' && roomsCapacityValue.rooms === '100') {
    field.setCustomValidity('100 комнат - не для гостей');
  } else {
    field.setCustomValidity('');
  }
};

// заполнение поле формы Адресс при начальной загрузки страницы
var createStartAddress = function () {
  var locationMapPinMain = {
    x: mapPinMain.offsetLeft + Math.ceil(mapPinMain.offsetWidth / 2),
    y: mapPinMain.offsetTop + Math.ceil(mapPinMain.offsetHeight / 2)
  };
  addressInput.disabled = true;
  addressInput.value = locationMapPinMain.x + ', ' + locationMapPinMain.y;
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
  var avatarsArray = AVATARS;
  var COUNT_ELEMENT = 8;
  for (var i = 0; i < COUNT_ELEMENT; i++) {
    var avatarsIndex = getRandomInt(0, avatarsArray.length);
    var titlesIndex = getRandomInt(0, TITLES.length);
    var locationX = getRandomInt(300, 1051);
    var locationY = getRandomInt(130, 630);
    var avatarsElement = avatarsArray[avatarsIndex];
    objects.push({
      'author': {
        'avatar': avatarsElement
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
    var photoArr = arrayPhoto[l];
    photo.style.verticalAlign = 'bottom';
    photo.src = photoArr;
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

// функции очиски карты от попапов
var removePopup = function () {
  var cards = document.querySelectorAll('.map__card');
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
  greateOption(arrayFeatures, popupFeatures);// установка опций

  popupFeatures.nextElementSibling.textContent = object.offer.description; // установка описания

  createPhoto(arrayObjectPhoto, popupPicturesElement, popupPictures);

  popupPictures.removeChild(popupPictures.children[0]);
  map.appendChild(popup);

  // нажатие на кнопку крестик попапа
  var buttonClosePopup = document.querySelector('.popup__close');
  buttonClosePopup.addEventListener('click', removePopup);
};

// функция заполнения поля формы "адресс"
var getLocationInitial = function (mainpin, address) {
  var location = {
    locationX: mainpin.offsetLeft + Math.ceil(mainpin.offsetWidth / 2),
    locationY: mainpin.offsetTop + mainpin.offsetHeight + MAIN_PIN_AFFTER
  };
  address.value = location.locationX + ', ' + location.locationY;
};

// функция вызова попапа
var showPopup = function (object) {
  removePopup();
  createPopup(object);
};
// функция очистки карты
var clearMapPin = function () {
  var mapPinElements = map.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < mapPinElements.length; i++) {
    var mapPinElement = mapPinElements[i];
    mapPinElement.remove();
  }
};

var greateMapElement = function () {
  var mapPins = map.querySelector('.map__pins');
  // очищение пинов с карты
  clearMapPin();
  // доабавление пинов на карту

  var objects = createObjects();
  var buttons = createButtons(objects);
  mapPins.appendChild(buttons);
  map.classList.remove('map--faded');

  // добавление событие клика пинам
  var arrayPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var m = 0; m < arrayPin.length; m++) {
    var objectIndex = objects[m];
    var pin = arrayPin[m];

    pin.addEventListener('click', function (object) {
      return function () {
        showPopup(object);
      };
    }(objectIndex));
  }

  // удаление с формы класса ad-form--disabled и атрибута disabled со всех fieldeset
  var fieldsetAll = document.querySelectorAll('fieldset');
  var noticeForm = document.querySelector('.ad-form');
  noticeForm.classList.remove('ad-form--disabled');

  for (var v = 0; v < fieldsetAll.length; v++) {
    var fieldsetIndex = fieldsetAll[v];
    fieldsetIndex.removeAttribute('disabled');
  }

  getLocationInitial(mapPinMain, addressInput);
};

createStartAddress();


var PIN_MAIN_WIDTH = 65;
var PIN_MAIN_HEIGHT = 87;
var MOVE_LIMIT_TOP = 200;
var MOVE_LIMIT_BOTTOM = 600;

var pinMainPosLeft = mapPinMain.offsetLeft;
var pinMainPosTop = mapPinMain.offsetTop;

var moveLimits = {
  top: map.offsetTop - PIN_MAIN_HEIGHT + MOVE_LIMIT_TOP,
  left: map.offsetLeft - PIN_MAIN_WIDTH / 2,
  bottom: map.offsetTop - PIN_MAIN_HEIGHT + MOVE_LIMIT_BOTTOM,
  right: map.offsetWidth - PIN_MAIN_WIDTH
};
var setPinMainAddress = function (left, top, width, height) {
  addressInput.disabled = true;
  addressInput.value = (left + width / 2) + ', ' + (top + height);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinMainPosLeft = mapPinMain.offsetLeft - shift.x;
    pinMainPosTop = mapPinMain.offsetTop - shift.y;

    mapPinMain.style.left = pinMainPosLeft + 'px';

    if (pinMainPosLeft > moveLimits.right) {
      mapPinMain.style.left = moveLimits.right + 'px';
    } else if (pinMainPosLeft < moveLimits.left) {
      mapPinMain.style.left = moveLimits.left + 'px';
    }

    mapPinMain.style.top = pinMainPosTop + 'px';

    if (pinMainPosTop > moveLimits.bottom) {
      mapPinMain.style.top = moveLimits.bottom + 'px';
    } else if (pinMainPosTop < moveLimits.top) {
      mapPinMain.style.top = moveLimits.top + 'px';
    }

    setPinMainAddress(pinMainPosLeft, pinMainPosTop, PIN_MAIN_WIDTH, PIN_MAIN_HEIGHT);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    greateMapElement();
    setPinMainAddress(pinMainPosLeft, pinMainPosTop, PIN_MAIN_WIDTH, PIN_MAIN_HEIGHT);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});
