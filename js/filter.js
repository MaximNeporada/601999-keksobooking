'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.filterForm = document.querySelector('.map__filters');

  var Price = {
    low: 10000,
    middle: 50000
  };
  var filterType = window.filterForm.querySelector('#housing-type');
  var filterPrice = window.filterForm.querySelector('#housing-price');
  var filterRooms = window.filterForm.querySelector('#housing-rooms');
  var filterGuests = window.filterForm.querySelector('#housing-guests');
  var filterFeatures = window.filterForm.querySelector('#housing-features');
  var filterFeaturesArray = filterFeatures.querySelectorAll('.map__checkbox');
  var pins = [];
  var lastTimeout;

  var debounce = function (fun) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  window.onSuccess = function (data) {
    pins = data;
    window.updatePins();
  };

  // cортировка по типу жилья
  var onHouseTypeFilter = function (item) {
    return filterType.value === 'any' || item.offer.type === filterType.value;
  };

  // сортировка по стоимости
  var onPriceFilter = function (item) {
    switch (filterPrice.value) {
      case 'low':
        return item.offer.price < Price.low;
      case 'middle':
        return item.offer.price >= Price.low && item.offer.price < Price.middle;
      case 'high':
        return item.offer.price >= Price.middle;
      default:
        return true;
    }
  };

  // сортировка по количеству комнат
  var onRoomsFilter = function (item) {
    return filterRooms.value === 'any' || item.offer.rooms.toString() === filterRooms.value;
  };

  // сортировка по кол-ву гостей
  var onGuestFilter = function (item) {
    return filterGuests.value === 'any' || item.offer.guests.toString() === filterGuests.value;
  };

  var featuresFilter = function (item) {
    for (var i = 0; i < filterFeaturesArray.length; i++) {
      if (filterFeaturesArray[i].checked && item.offer.features.indexOf(filterFeaturesArray[i].value) === -1) {
        return false;
      }
    }
    return true;
  };

  window.updatePins = function () {
    window.clearMapPin();
    window.removePopup();
    var filteredPins = pins
      .filter(onRoomsFilter)
      .filter(onGuestFilter)
      .filter(onPriceFilter)
      .filter(onHouseTypeFilter)
      .filter(featuresFilter);
    window.createButtons(filteredPins);
  };

  var onFiltersChange = function () {
    debounce(window.updatePins, DEBOUNCE_INTERVAL);
  };

  window.filterForm.addEventListener('change', onFiltersChange);
})();
