'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 87;
  var MOVE_LIMIT_TOP = 200;
  var MOVE_LIMIT_BOTTOM = 700;
  window.fieldsetAll = document.querySelectorAll('fieldset');
  var pinMainPosLeft = window.mapPinMain.offsetLeft;
  var pinMainPosTop = window.mapPinMain.offsetTop;
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
      pin.addEventListener('click', function (object, pinIndex, arr) {
        return function () {
          for (var m = 0; m < arr.length; m++) {
            arr[m].classList.remove('map__pin--active');
          }
          window.showPopup(object);
          pinIndex.classList.add('map__pin--active');
        };
      }(objectIndex, pin, arrayPin));
    }
  };
  window.getError = function (errorMessage) {
    var errorElement = document.createElement('div');

    errorElement.style = 'z-index: 99; margin: 0 auto; text-align: center; background-color: red;';
    errorElement.style.position = 'fixed';
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = '30px';

    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);

  };

  var createMapElement = function () {
    window.load(window.createButtons, window.getError);

    window.map.classList.remove('map--faded');

    // добавление событие клика пинам

    window.load(clickPinEvents, window.getError);
    // удаление с формы класса ad-form--disabled и атрибута disabled со всех fieldeset

    window.noticeForm.classList.remove('ad-form--disabled');

    for (var v = 0; v < window.fieldsetAll.length; v++) {
      var fieldsetIndex = window.fieldsetAll[v];
      fieldsetIndex.removeAttribute('disabled');
    }
    window.getLocationInitial(window.mapPinMain, window.addressInput);
  };

  var setPinMainAddress = function (left, top, width, height) {
    window.addressInput.disabled = true;
    window.addressInput.value = (left + width / 2) + ', ' + (top + height);
  };

  window.mapPinMain.addEventListener('mousedown', function (evt) {
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

      pinMainPosLeft = window.mapPinMain.offsetLeft - shift.x;
      pinMainPosTop = window.mapPinMain.offsetTop - shift.y;

      window.mapPinMain.style.left = pinMainPosLeft + 'px';

      if (pinMainPosLeft > moveLimits.right) {
        window.mapPinMain.style.left = moveLimits.right + 'px';
      } else if (pinMainPosLeft < moveLimits.left) {
        window.mapPinMain.style.left = moveLimits.left + 'px';
      }

      window.mapPinMain.style.top = pinMainPosTop + 'px';

      if (pinMainPosTop > moveLimits.bottom) {
        window.mapPinMain.style.top = moveLimits.bottom + 'px';
      } else if (pinMainPosTop < moveLimits.top) {
        window.mapPinMain.style.top = moveLimits.top + 'px';
      }

      setPinMainAddress(pinMainPosLeft, pinMainPosTop, PIN_MAIN_WIDTH, PIN_MAIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      createMapElement();
      setPinMainAddress(pinMainPosLeft, pinMainPosTop, PIN_MAIN_WIDTH, PIN_MAIN_HEIGHT);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
