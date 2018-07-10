'use strict';
(function () {
  var MAX_AVAILABLE_PINS = 5;
  var mapPins = document.querySelector('.map__pins');
  window.createButtons = function (objects) {
    var documentFragment = [];
    window.clearMapPin();
    var visiblePins = Math.min(objects.length, MAX_AVAILABLE_PINS);
    for (var i = 0; i < visiblePins; i++) {
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
      documentFragment[i] = button;
      mapPins.appendChild(button);

    }
    clickPinEvents(objects);
  };
  window.clearMapPin = function () {
    var mapPinElements = window.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPinElements.length; i++) {
      var mapPinElement = mapPinElements[i];
      mapPinElement.remove();
    }
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
})();
