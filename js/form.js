'use strict';
(function () {
  var MAX_GUESTS_PER_ROOM = 1;
  var ROOMS_CAPACITY_VALUE = {
    rooms: 1,
    capacity: 1
  };
  var CHANGE_ROOMS_RULES = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var TYPE_MIN_PRICE = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };
  var MAIN_PIN_AFFTER = 22;// взято из css

  window.addressInput = document.querySelector('#address');
  window.noticeForm = document.querySelector('.ad-form');
  window.mapPinMain = document.querySelector('.map__pin--main');

  var noticeType = document.querySelector('#type');
  var noticePrice = document.querySelector('#price');
  var noticeTimein = document.querySelector('#timein');
  var noticeTimeout = document.querySelector('#timeout');
  var noticeRoomNumber = document.querySelector('#room_number');
  var noticeCapacity = document.querySelector('#capacity');
  var noticeReset = document.querySelector('.ad-form__reset');
  var successMessage = document.querySelector('.success');
  var adFormSubmit = document.querySelector('.ad-form__submit');
  var locationMapPinMain = {
    x: window.mapPinMain.offsetLeft + Math.ceil(window.mapPinMain.offsetWidth / 2),
    y: window.mapPinMain.offsetTop + Math.ceil(window.mapPinMain.offsetHeight / 2)
  };

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

  // событие при изменение количесива гостей
  noticeCapacity.addEventListener('change', function (evt) {
    var capacityOption = evt.target;
    capacityOption.selected = true;
    ROOMS_CAPACITY_VALUE.capacity = capacityOption.value;
    setGuestsValidity(noticeCapacity);

    var differentValue = noticeRoomNumber.querySelector('option[value=\'100\']');
    getDependentOption(capacityOption, noticeRoomNumber);

    if (capacityOption.value === '0') {
      differentValue.selected = 'true';
    }
  });

  // событие при изменение количесива комнат
  noticeRoomNumber.addEventListener('change', function (evt) {
    var currentValue = evt.target.value;
    noticeCapacity.querySelectorAll('option').forEach(function (elem) {
      if (CHANGE_ROOMS_RULES[currentValue].indexOf(elem.value) === -1) {
        elem.disabled = 'disabled';
        elem.style = 'color: red;';
      } else {
        elem.removeAttribute('disabled');
        elem.removeAttribute('style');
      }
    });
    if (CHANGE_ROOMS_RULES[currentValue].indexOf(noticeCapacity.value) === -1) {
      noticeCapacity.value = CHANGE_ROOMS_RULES[currentValue][0];
    }
  });

  // функция заполнения поля формы "адресс"
  window.getLocationInitial = function (mainPin, address) {
    var location = {
      locationX: mainPin.offsetLeft + Math.ceil(mainPin.offsetWidth / 2),
      locationY: mainPin.offsetTop + mainPin.offsetHeight + MAIN_PIN_AFFTER
    };
    address.value = location.locationX + ', ' + location.locationY;
  };

  // событие нажати на кнопку reset
  noticeReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    returnNegativeState();
  });

  adFormSubmit.addEventListener('click', function () {
    setGuestsValidity(noticeCapacity);
  });

  // функция возврата в исходное состояние страницы
  var returnNegativeState = function () {
    window.noticeForm.reset();
    window.filterForm.reset();
    window.removePopup();
    window.clearMapPin();
    window.map.classList.add('map--faded');
    window.noticeForm.classList.add('ad-form--disabled');
    window.addressInput.readonly = true;
    window.addressInput.value = locationMapPinMain.x + ', ' + locationMapPinMain.y;
    var mapPinCenterX = locationMapPinMain.x - window.mapPinMain.offsetWidth / 2;
    var mapPinCenterY = locationMapPinMain.y - window.mapPinMain.offsetHeight / 2;
    window.mapPinMain.style.left = mapPinCenterX + 'px';
    window.mapPinMain.style.top = mapPinCenterY + 'px';
    for (var v = 0; v < window.fieldsetAll.length; v++) {
      var fieldsetIndex = window.fieldsetAll[v];
      fieldsetIndex.setAttribute('disabled', '');
    }
    window.scrollTo(0, 0);
  };

  // функции закрытия меседжера
  var messageEscPressHandler = function (evt) {
    window.escPressHandler(evt, closeSuccessMessageHandler);
  };

  var closeSuccessMessageHandler = function () {
    successMessage.classList.add('hidden');
    document.removeEventListener('click', closeSuccessMessageHandler);
    document.removeEventListener('keydown', messageEscPressHandler);
  };

  // событие нажатие на кнопку опубликовать
  var successHandler = function () {
    returnNegativeState();
    successMessage.classList.remove('hidden');
    document.addEventListener('click', closeSuccessMessageHandler);
    document.addEventListener('keydown', messageEscPressHandler);
  };

  window.noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(window.noticeForm), successHandler, window.getError);
  });

  // заполнение поле формы Адресс при начальной загрузки страницы
  window.addressInput.readonly = true;
  window.addressInput.value = locationMapPinMain.x + ', ' + locationMapPinMain.y;
})();
