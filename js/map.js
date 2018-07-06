'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 87;
  var MOVE_LIMIT_TOP = 200;
  var MOVE_LIMIT_BOTTOM = 700;
  // var PIN_MAIN_START_COORDS = {x: 570, y: 375};
  var pinMainPosLeft = mapPinMain.offsetLeft;
  var pinMainPosTop = mapPinMain.offsetTop;
  var moveLimits = {
    top: window.map.offsetTop - PIN_MAIN_HEIGHT + MOVE_LIMIT_TOP,
    left: window.map.offsetLeft - PIN_MAIN_WIDTH / 2,
    bottom: window.map.offsetTop - PIN_MAIN_HEIGHT + MOVE_LIMIT_BOTTOM,
    right: window.map.offsetWidth - PIN_MAIN_WIDTH
  };

  var clickPinEvents = function (objects) {
    var arrayPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < arrayPin.length; i++) {
      var pin = arrayPin[i];
      var objectIndex = objects[i];
      pin.addEventListener('click', function (object) {
        return function () {
          window.showPopup(object);
        };
      }(objectIndex));
    }
  };

  var greateMapElement = function () {

    // доабавление пинов на карту

    var getError = function (errorMessage) {
      var errorElement = document.createElement('div');

      errorElement.style = 'z-index: 99; margin: 0 auto; text-align: center; background-color: red;';
      errorElement.style.position = 'fixed';
      errorElement.style.left = 0;
      errorElement.style.right = 0;
      errorElement.style.fontSize = '30px';

      errorElement.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorElement);

    };


    window.load(window.createButtons, getError);

    window.map.classList.remove('map--faded');

    // добавление событие клика пинам


    window.load(clickPinEvents, getError);
    // удаление с формы класса ad-form--disabled и атрибута disabled со всех fieldeset
    var fieldsetAll = document.querySelectorAll('fieldset');
    var noticeForm = document.querySelector('.ad-form');
    noticeForm.classList.remove('ad-form--disabled');

    for (var v = 0; v < fieldsetAll.length; v++) {
      var fieldsetIndex = fieldsetAll[v];
      fieldsetIndex.removeAttribute('disabled');
    }
    window.getLocationInitial(mapPinMain, window.addressInput);
  };

  var setPinMainAddress = function (left, top, width, height) {
    window.addressInput.disabled = true;
    window.addressInput.value = (left + width / 2) + ', ' + (top + height);
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
})();
