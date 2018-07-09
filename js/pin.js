'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');

  window.createButtons = function (objects) {
    var documentFragment = [];
    window.clearMapPin();
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
      documentFragment[i] = button;
      mapPins.appendChild(button);

    }
  };
  window.clearMapPin = function () {
    var mapPinElements = window.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPinElements.length; i++) {
      var mapPinElement = mapPinElements[i];
      mapPinElement.remove();
    }
  };
})();
