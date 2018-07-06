'use strict';
(function () {
  window.createButtons = function (objects) {
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

  window.clearMapPin = function () {
    var mapPinElements = window.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPinElements.length; i++) {
      var mapPinElement = mapPinElements[i];
      mapPinElement.remove();
    }
  };
})();
