'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var noticeType = document.querySelector('#type');
  var noticePrice = document.querySelector('#price');
  var noticeTimein = document.querySelector('#timein');
  var noticeTimeout = document.querySelector('#timeout');
  var noticeRoomNumber = document.querySelector('#room_number');
  var noticeCapacity = document.querySelector('#capacity');
  window.addressInput = document.querySelector('#address');

  var ROOMS_CAPACITY_VALUE = {
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

  var getDependentOption = function (option, dependentArray) {
    var valueSelected = option.value;
    for (var i = 0; i < dependentArray.options.length; i++) {
      if (dependentArray.options[i].value === valueSelected) {
        dependentArray.options[i].selected = 'true';
      }
    }
  };

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
    ROOMS_CAPACITY_VALUE.rooms = roomOption.value;

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
    ROOMS_CAPACITY_VALUE.capacity = capacityOption.value;

    setGuestsValidity(noticeCapacity);
  });

  // функции проверки количества гостей
  var setGuestsValidity = function (field) {
    if ((ROOMS_CAPACITY_VALUE.capacity / ROOMS_CAPACITY_VALUE.rooms) > MAX_GUESTS_PER_ROOM) {
      field.setCustomValidity('Количество гостей превышает максимально возможное. \nКоличество комнат должно быть не меньше ' + (ROOMS_CAPACITY_VALUE.capacity / MAX_GUESTS_PER_ROOM) + '.');
    } else if (ROOMS_CAPACITY_VALUE.capacity === '0' && ROOMS_CAPACITY_VALUE.rooms !== '100') {
      field.setCustomValidity('Выберите вариант: 100 комнат.');
    } else if (ROOMS_CAPACITY_VALUE.capacity !== '0' && ROOMS_CAPACITY_VALUE.rooms === '100') {
      field.setCustomValidity('100 комнат - не для гостей');
    } else {
      field.setCustomValidity('');
    }
  };

  // функция заполнения поля формы "адресс"
  window.getLocationInitial = function (mainPin, address) {
    var location = {
      locationX: mainPin.offsetLeft + Math.round(mainPin.offsetWidth / 2),
      locationY: mainPin.offsetTop + mainPin.offsetHeight + MAIN_PIN_AFFTER
    };
    address.value = location.locationX + ', ' + location.locationY;
  };

  // заполнение поле формы Адресс при начальной загрузки страницы
  var locationMapPinMain = {
    x: mapPinMain.offsetLeft + Math.ceil(mapPinMain.offsetWidth / 2),
    y: mapPinMain.offsetTop + Math.ceil(mapPinMain.offsetHeight / 2)
  };
  window.addressInput.disabled = true;
  window.addressInput.value = locationMapPinMain.x + ', ' + locationMapPinMain.y;

})();
