
'use strict';
(function () {
  // Отправка формы
  window.upload = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var request = new XMLHttpRequest();
    request.responseType = 'json';

    request.addEventListener('load', function () {
      onLoad(request.response);
    });

    request.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    request.open('POST', URL);
    request.send(data);
  };

  // загрузка данных
  window.load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var request = new XMLHttpRequest();
    request.responseType = 'json';

    request.addEventListener('load', function () {
      if (request.status === 200) {
        onLoad(request.response);
      } else {
        onError('Статус ответа: ' + request.status + ' ' + request.statusText);
      }
    });

    request.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    request.open('GET', URL);
    request.send();
  };
})();
