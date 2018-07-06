'use strict';
(function () {

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

  window.objects = [];
  var avatarsArray = AVATARS;
  var COUNT_ELEMENT = 8;
  for (var i = 0; i < COUNT_ELEMENT; i++) {
    var avatarsIndex = getRandomInt(0, avatarsArray.length);
    var titlesIndex = getRandomInt(0, TITLES.length);
    var locationX = getRandomInt(300, 1051);
    var locationY = getRandomInt(130, 630);
    var avatarsElement = avatarsArray[avatarsIndex];
    window.objects.push({
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
})();
