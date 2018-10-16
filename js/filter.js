'use strict';
(function () {

  var FILTER_PRICE_MIN = 15;
  var FILTER_PRICE_MAX = 85;
  var LEFT_RANGE_BUTTON_X = 104.75 - 68;
  var RIGHT_RANGE_BUTTON_X = 266.25 - 68;

  // Находим и записываем в переменные инпуты Бокового Фильтра

  var filterSidebar = document.querySelector('.catalog__sidebar');
  var range = document.querySelector('.range');
  var rangeFilter = range.querySelector('.range__filter');
  var rangeButtonLeft = rangeFilter.querySelector('.range__btn--left');
  var rangeButtonRight = rangeFilter.querySelector('.range__btn--right');
  var rangePriceMin = range.querySelector('.range__price--min');
  var rangePriceMax = range.querySelector('.range__price--max');
  var rangeFillLine = range.querySelector('.range__fill-line');
  var catalogCards = document.querySelector('.catalog__cards');

  var filteredList = [];

  // Объект с массивами активных фильтров

  var activeFilters = {
    foodKinds: [],
    foodProperties: [],
    price: [],
    favorites: [],
    available: [],
    sort: []
  };

  // Функция проверки по свойствам: без сахара, без глютена, вегетарианское

  var checkFoodProperties = function (foodProperty) {
    var isGlutenActive = activeFilters.foodProperties.indexOf('gluten') !== -1;
    var isSugarActive = activeFilters.foodProperties.indexOf('sugar') !== -1;
    var isVeganActive = activeFilters.foodProperties.indexOf('vegetarian') !== -1;
    var gluten = isGlutenActive && !foodProperty.gluten;
    var sugar = isSugarActive && !foodProperty.sugar;
    var vegan = isVeganActive && foodProperty.vegetarian;
    return (
      (!isGlutenActive || gluten) &&
      (!isSugarActive || sugar) &&
      (!isVeganActive || vegan)
    );
  };

  // Функция - удаление карточек

  var removeItems = function () {
    while (catalogCards.firstChild) {
      catalogCards.removeChild(catalogCards.firstChild);
    }
  };

  // Функция, которая запускает сообщение, если  по фильтру нет подходящих товаров

  var emptyFilterTemplate = document.querySelector('#empty-filters')
    .content
    .querySelector('.catalog__empty-filter');
  var emptyFilterMessage = emptyFilterTemplate.cloneNode(true);

  var putEmptyFilterMessage = function () {
    if (filteredList.length === 0) {
      catalogCards.appendChild(emptyFilterMessage);
    }
  };

  // Функция, которая показывает все товары при нажатии на кнопку Показать все

  var showAllButton = emptyFilterMessage.querySelector('.catalog__show-all');
  var onShowAll = function () {
    window.renderCards(window.goods);
    catalogCards.removeChild(emptyFilterMessage);
    removeAttributeChecked(showAllButton.value);
  };

  showAllButton.addEventListener('click', onShowAll);

  // Функция переключения состояния у инпутов

  var setCheckedOnFilter = function (tag) {
    var parent = tag.closest('.input-btn');
    var input = parent.querySelector('.input-btn__input');
    if (input.checked) {
      input.checked = false;
    } else {
      input.checked = true;
    }
  };

  var removeAttributeChecked = function (inputValue) {
    var inputs = filterSidebar.querySelectorAll('.input-btn__input');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value === inputValue) {
        inputs[i].checked = true;
      } else {
        inputs[i].checked = false;
      }
    }
  };

  // Находим правильный спан для записи количества продукции

  var putNumberOfGoodsInSpan = function (target) {
    var span;
    if (target === 'Мороженое') {
      var icecreamList = window.goods.filter(function (it) {
        return it.kind === 'Мороженое';
      });
      span = filterSidebar.querySelector('#filter-icecream ~ span');
      span.textContent = '(' + icecreamList.length + ')';
    }
    if (target === 'Газировка') {
      var sodaList = window.goods.filter(function (it) {
        return it.kind === 'Газировка';
      });
      span = filterSidebar.querySelector('#filter-soda ~ span');
      span.textContent = '(' + sodaList.length + ')';
    }
    if (target === 'Жевательная резинка') {
      var gumList = window.goods.filter(function (it) {
        return it.kind === 'Жевательная резинка';
      });
      span = filterSidebar.querySelector('#filter-gum ~ span');
      span.textContent = '(' + gumList.length + ')';
    }
    if (target === 'Мармелад') {
      var marmaladeList = window.goods.filter(function (it) {
        return it.kind === 'Мармелад';
      });
      span = filterSidebar.querySelector('#filter-marmalade ~ span');
      span.textContent = '(' + marmaladeList.length + ')';
    }
    if (target === 'Зефир') {
      var marshmallowList = window.goods.filter(function (it) {
        return it.kind === 'Зефир';
      });
      span = filterSidebar.querySelector('#filter-marshmallows ~ span');
      span.textContent = '(' + marshmallowList.length + ')';
    }
    if (target === 'Без сахара') {
      var sugarfreeList = window.goods.filter(function (it) {
        return it.nutritionFacts.sugar === false;
      });
      span = filterSidebar.querySelector('#filter-sugar-free ~ span');
      span.textContent = '(' + sugarfreeList.length + ')';
    }
    if (target === 'Безглютеновое') {
      var glutenfreeList = window.goods.filter(function (it) {
        return it.nutritionFacts.gluten === false;
      });
      span = filterSidebar.querySelector('#filter-gluten-free ~ span');
      span.textContent = '(' + glutenfreeList.length + ')';
    }
    if (target === 'Вегетарианское') {
      var vegetarianList = window.goods.filter(function (it) {
        return it.nutritionFacts.vegetarian === true;
      });
      span = filterSidebar.querySelector('#filter-vegetarian ~ span');
      span.textContent = '(' + vegetarianList.length + ')';
    }
    if (target === 'Только избранное') {
      var favoriteList = window.goods.filter(function (it) {
        return it.favorite === true;
      });
      span = filterSidebar.querySelector('#filter-favorite ~ span');
      span.textContent = '(' + favoriteList.length + ')';
    }
    if (target === 'В наличии') {
      var availableList = window.goods.filter(function (it) {
        return it.amount > 0;
      });
      span = filterSidebar.querySelector('#filter-availability ~ span');
      span.textContent = '(' + availableList.length + ')';
    }
  };

  // Применение фильтров

  var applyFilters = function (items) {
    filteredList = [];
    items.forEach(function (current) {

      var isEmptyKind = activeFilters.foodKinds.length === 0;
      var isExistInKind = !isEmptyKind && activeFilters.foodKinds.indexOf(current.kind) !== -1;

      var isEmptyFoodProperty = activeFilters.foodProperties.length === 0;
      var isExistFoodProperty = !isEmptyFoodProperty && checkFoodProperties(current.nutritionFacts);

      var isEmptyPrice = activeFilters.price.length === 0;
      var isExistPrice = !isEmptyPrice && checkPrice(current.price);

      var isEmptyFavorite = activeFilters.favorites.length === 0;
      var isExistFavorite = !isEmptyFavorite && current.favorite === true;

      var isEmptyAvailable = activeFilters.available.length === 0;
      var isExistAvailable = !isEmptyAvailable && current.amount > 0;

      if ((isEmptyKind || isExistInKind) && (isEmptyFoodProperty || isExistFoodProperty) && (isEmptyPrice || isExistPrice) &&
        (isEmptyFavorite || isExistFavorite) && (isEmptyAvailable || isExistAvailable)) {
        filteredList.push(current);
      }
    });

    filteredList = getSortedList(filteredList);

    window.renderCards(filteredList);

    putEmptyFilterMessage();
  };

  // Фильтр для food-type

  var filterByKind = window.utils.debounce(function (evt, items) {
    var target = evt.target.innerText;
    setCheckedOnFilter(evt.target);
    // если в фильтрах по типу нет ни одного фильтра, добавляем текущий таргет
    if (activeFilters.foodKinds.length === 0) {
      activeFilters.foodKinds.push(target);
    } else if (activeFilters.foodKinds.indexOf(target) !== -1 && activeFilters.foodKinds.length === 1) {
      // если в фильтрах по типу есть таргет и он единственный в массиве, очищаем массив
      activeFilters.foodKinds = [];
    } else if (activeFilters.foodKinds.indexOf(target) !== -1 && activeFilters.foodKinds.length > 1) {
      // если в фильтрах есть таргет и длина массива больше 1, удаляем таргет из фильтров
      activeFilters.foodKinds = activeFilters.foodKinds.filter(function (item) {
        return item !== target;
      });
    } else if (activeFilters.foodKinds.indexOf(target) === -1 && activeFilters.foodKinds.length > 0) {
      // если в фильтрах нет таргета, и длина массива с фильтрами больше 0, добавляем таргет в фильтры
      activeFilters.foodKinds.push(target);
    }
    removeItems();
    applyFilters(items, target);
  });

  // Вспомогательная функция для food-property

  var getFoodProperty = function (foodProperty) {
    if (foodProperty === 'Без сахара') {
      return 'sugar';
    } else if (foodProperty === 'Вегетарианское') {
      return 'vegetarian';
    } else if (foodProperty === 'Безглютеновое') {
      return 'gluten';
    } return '';
  };

  // Фильтер для food-property

  var filterByFoodProperty = window.utils.debounce(function (evt, items) {
    var target = getFoodProperty(evt.target.innerText);
    setCheckedOnFilter(evt.target);

    // если фильтр по фактам пуст добавляем таргет в фильтры
    if (activeFilters.foodProperties.length === 0) {
      activeFilters.foodProperties.push(target);
    } else if (activeFilters.foodProperties.indexOf(target) !== -1 && activeFilters.foodProperties.length === 1) {
      // если таргет есть в фильтрах и длина массива равна 1, очищаем массив
      activeFilters.foodProperties = [];
    } else if (activeFilters.foodProperties.indexOf(target) !== -1 && activeFilters.foodProperties.length > 1) {
      // если таргет есть в фильтрах и длина массивы больше 1, удаляем таргетный фильтр
      activeFilters.foodProperties = activeFilters.foodProperties.filter(function (item) {
        return item !== target;
      });
    } else if (activeFilters.foodProperties.indexOf(target) === -1 && activeFilters.foodProperties.length > 0) {
      // если таргета в фильтрах нет и длина массива больше 0, добавляем таргетный фильтр
      activeFilters.foodProperties.push(target);
    }
    removeItems();
    applyFilters(items, target);
  });

  // Вспомогательная функция для цены

  var checkPrice = function (price) {
    var priceFits = false;
    if (price > parseInt(rangePriceMin.textContent, 10) && price < parseInt(rangePriceMax.textContent, 10)) {
      priceFits = true;
    }
    return priceFits;
  };

  // Фильтр по цене

  var filterByPrice = window.utils.debounce(function (evt, items) {
    if (evt.target === rangeButtonLeft) {
      var target = parseInt(rangePriceMin.textContent, 10);
    }
    if (evt.target === rangeButtonRight) {
      target = parseInt(rangePriceMax.textContent, 10);
    }
    // если фильтр по цене пуст добавляем таргет в фильтры
    if (activeFilters.price.length === 0) {
      activeFilters.price.push(target);
    } else if (activeFilters.price.indexOf(target) !== -1 && activeFilters.price.length === 1) {
      // если таргет есть в фильтрах и длина массива равна 1, очищаем массив
      activeFilters.price = [];
    } else if (activeFilters.price.indexOf(target) !== -1 && activeFilters.price.length > 1) {
      // если таргет есть в фильтрах и длина массивы больше 1, удаляем таргетный фильтр
      activeFilters.price = activeFilters.price.filter(function (item) {
        return item !== target;
      });
    } else if (activeFilters.price.indexOf(target) === -1 && activeFilters.price.length > 0) {
      // если таргета в фильтрах нет и длина массива больше 0, добавляем таргетный фильтр
      activeFilters.price.push(target);
    }
    removeItems();
    applyFilters(items, target);
  });

  // Вспомогательная функция, которая сбрасывает значения ценового фильтра и устанавливает прежние

  var getInitialPrice = function () {
    rangePriceMin.textContent = String(FILTER_PRICE_MIN);
    rangeButtonLeft.style.left = LEFT_RANGE_BUTTON_X + 'px';
    rangeFillLine.style.left = LEFT_RANGE_BUTTON_X + 'px';
    rangePriceMax.textContent = String(FILTER_PRICE_MAX);
    rangeButtonRight.style.left = RIGHT_RANGE_BUTTON_X + 'px';
    rangeFillLine.style.right = (rangeFilter.offsetWidth - RIGHT_RANGE_BUTTON_X) + 'px';
  };

  // Фильтр для избранного

  var filterByFavorite = window.utils.debounce(function (evt, items) {
    var target = evt.target.innerText;
    var favoriteInput = filterSidebar.querySelector('#filter-favorite').value;


    // если фильтр по избранному пуст добавляем таргет в фильтры
    if (activeFilters.favorites.length === 0) {
      activeFilters.favorites.push(target);
      setCheckedOnFilter(evt.target);
      removeAttributeChecked(favoriteInput);

    } else if (activeFilters.favorites.indexOf(target) !== -1 && activeFilters.favorites.length === 1) {
      // если таргет есть в фильтрах и длина массива равна 1, очищаем массив
      activeFilters.favorites = [];
      setCheckedOnFilter(evt.target);
    }

    if (activeFilters.foodKinds.length > 0) {
      activeFilters.foodKinds = [];
    }
    if (activeFilters.foodProperties.length > 0) {
      activeFilters.foodProperties = [];
    }
    if (activeFilters.price.length > 0) {
      activeFilters.price = [];
      getInitialPrice();
    }
    if (activeFilters.available.length > 0) {
      activeFilters.available = [];
    }
    if (activeFilters.sort.length > 0) {
      activeFilters.sort = [];
    }

    removeItems();
    applyFilters(items, target);
  });

  // Фильтр для В наличие

  var filterByAvailable = window.utils.debounce(function (evt, items) {
    var target = evt.target.innerText;
    var availableInput = filterSidebar.querySelector('#filter-availability').value;

    // если фильтр по избранному пуст добавляем таргет в фильтры
    if (activeFilters.available.length === 0) {
      activeFilters.available.push(target);
      setCheckedOnFilter(evt.target);
      removeAttributeChecked(availableInput);
    } else if (activeFilters.available.indexOf(target) !== -1 && activeFilters.available.length === 1) {
      // если таргет есть в фильтрах и длина массива равна 1, очищаем массив
      activeFilters.available = [];
      setCheckedOnFilter(evt.target);
    }

    if (activeFilters.foodKinds.length > 0) {
      activeFilters.foodKinds = [];
    }
    if (activeFilters.foodProperties.length > 0) {
      activeFilters.foodProperties = [];
    }
    if (activeFilters.price.length > 0) {
      activeFilters.price = [];
      getInitialPrice();
    }
    if (activeFilters.favorites.length > 0) {
      activeFilters.favorites = [];
    }
    if (activeFilters.sort.length > 0) {
      activeFilters.sort = [];
    }

    removeItems();
    applyFilters(items, target);
  });

  // Вспомогательная функция для сортировки по рейтингу по убыванию

  var getHigherRatingFirst = function (arrey) {
    var arreyCopy = arrey.slice();
    var newArrey = [];
    for (var i = 5; i > 0; i--) {
      var filteredArrey = arreyCopy.filter(function (it) {
        return it.rating.value === i;
      });
      newArrey = newArrey.concat(getHigherRatingNumberFirst(filteredArrey));
    }
    return newArrey;
  };

  var getHigherRatingNumberFirst = function (arrey) {
    var arreyCopy = arrey.slice();
    arreyCopy.sort(function (first, second) {
      if (first.rating.number < second.rating.number) {
        return 1;
      } else if (first.rating.number > second.rating.number) {
        return -1;
      }
      return 0;
    });
    return arreyCopy;
  };

  // Функция по определению свойства массива sort

  var filterBySort = window.utils.debounce(function (evt, items) {
    var target = evt.target.innerText;
    setCheckedOnFilter(evt.target);
    activeFilters.sort = target;
    removeItems();
    applyFilters(items, target);
  });

  // Функция по сортировке

  var getSortedList = function (arrey) {
    var arreyCopy = arrey.slice();
    switch (activeFilters.sort) {
      case 'Сначала популярные': {
        arreyCopy = window.goods;
        break;
      }
      case 'Сначала дорогие': {
        arreyCopy.sort(function (first, second) {
          if (first.price < second.price) {
            return 1;
          } else if (first.price > second.price) {
            return -1;
          }
          return 0;
        });
        break;
      }
      case 'Сначала дешёвые': {
        arreyCopy.sort(function (first, second) {
          if (first.price > second.price) {
            return 1;
          } else if (first.price < second.price) {
            return -1;
          }
          return 0;
        });
        break;
      }
      case 'По рейтингу': {
        arreyCopy = getHigherRatingFirst(arreyCopy);
        break;
      }
    }
    return arreyCopy;
  };

  // Oбработчик на клик по фильтрам
  var onFiltersClick = function (evt) {
    evt.preventDefault();
    var target = evt.target.innerText;
    if (target === 'Мороженое' || target === 'Газировка' || target === 'Жевательная резинка' || target === 'Мармелад' || target === 'Зефир') {
      filterByKind(evt, window.goods);
    } else if (target === 'Без сахара') {
      filterByFoodProperty(evt, window.goods, 'sugar');
    } else if (target === 'Безглютеновое') {
      filterByFoodProperty(evt, window.goods, 'gluten');
    } else if (target === 'Вегетарианское') {
      filterByFoodProperty(evt, window.goods, 'vegetarian');
    } else if (target === 'Только избранное') {
      filterByFavorite(evt, window.goods);
    } else if (target === 'В наличии') {
      filterByAvailable(evt, window.goods);
    } else if (target === 'Сначала популярные') {
      filterBySort(evt, window.goods);
    } else if (target === 'Сначала дорогие') {
      filterBySort(evt, window.goods);
    } else if (target === 'Сначала дешёвые') {
      filterBySort(evt, window.goods);
    } else if (target === 'По рейтингу') {
      filterBySort(evt, window.goods);
    }

    putNumberOfGoodsInSpan(target);
  };

  // Обработчик mousemove для ценового фильтра

  var onPriceFilterMousemove = function (evt) {
    evt.preventDefault();
    filterByPrice(evt, window.goods);
  };

  var submitButton = filterSidebar.querySelector('.catalog__submit');

  var onSubmitButton = function () {
    activeFilters.foodKinds = [];
    activeFilters.foodProperties = [];
    activeFilters.price = [];
    activeFilters.favorites = [];
    activeFilters.available = [];
    activeFilters.popular = [];
    activeFilters.expensiveFirst = [];
    activeFilters.cheapFirst = [];
    activeFilters.foodRating = [];
    filteredList = [];
    removeItems();
    window.renderCards(window.goods);
    removeAttributeChecked(submitButton.value);
  };

  submitButton.addEventListener('click', onSubmitButton);

  filterSidebar.addEventListener('click', onFiltersClick);

  rangeButtonRight.addEventListener('mousemove', onPriceFilterMousemove);

  rangeButtonLeft.addEventListener('mousemove', onPriceFilterMousemove);

  // Перемещение ползунков фильтра

  rangeButtonLeft.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    console.log(rangeButtonLeft.getBoundingClientRect().left);
    var shiftX = evt.clientX - rangeButtonLeft.getBoundingClientRect().left;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    function onMouseMove(evtMove) {
      var newLeft = evtMove.clientX - shiftX - rangeFilter.getBoundingClientRect().left;

      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = rangeButtonRight.offsetLeft - rangeButtonRight.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      rangeButtonLeft.style.left = newLeft + 'px';

      rangeFillLine.style.left = newLeft + 'px';

      var getRangeProcent = function (newSide, rangePrice) {
        var procent = Math.round(newSide / rangeFilter.offsetWidth * 100);
        rangePrice.textContent = procent;
      };

      getRangeProcent(newLeft, rangePriceMin);

    }

    function onMouseUp(evtUp) {

      var dropX = evtUp.clientX - shiftX - rangeFilter.getBoundingClientRect().left;
      if (dropX < 0) {
        dropX = 0;
      }

      var rightEdge = rangeButtonRight.offsetLeft - rangeButtonRight.offsetWidth;

      if (dropX > rightEdge) {
        dropX = rightEdge;
      }

      var getRangeProcent = function (newSide, rangePrice) {
        var procent = Math.round(newSide / rangeFilter.offsetWidth * 100);
        rangePrice.textContent = procent;
      };

      getRangeProcent(dropX, rangePriceMin);

      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  });

  rangeButtonLeft.ondragstart = function () {
    return false;
  };

  rangeButtonRight.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    console.log(rangeButtonRight.getBoundingClientRect().right);

    var shiftX = rangeButtonRight.getBoundingClientRect().right - evt.clientX;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(evtMove) {

      var newRight = evtMove.clientX + shiftX - rangeFilter.getBoundingClientRect().left;

      if (newRight < rangeButtonLeft.getBoundingClientRect().right - rangeFilter.getBoundingClientRect().left) {
        newRight = rangeButtonLeft.getBoundingClientRect().right - rangeFilter.getBoundingClientRect().left;
      }

      var leftEdge = rangeFilter.offsetWidth - rangeButtonRight.offsetWidth;

      if (newRight > leftEdge) {
        newRight = leftEdge;
      }

      rangeButtonRight.style.left = newRight + 'px';

      rangeFillLine.style.right = (rangeFilter.offsetWidth - newRight) + 'px';

      var getRangeProcent = function (newSide, rangePrice) {
        var procent = Math.round(newSide / (rangeFilter.offsetWidth - rangeButtonRight.offsetWidth) * 100);
        rangePrice.textContent = procent;
      };

      getRangeProcent(newRight, rangePriceMax);

    }

    function onMouseUp(evtUp) {

      var dropX = evtUp.clientX + shiftX - rangeFilter.getBoundingClientRect().left;
      if (dropX < rangeButtonLeft.getBoundingClientRect().right - rangeFilter.getBoundingClientRect().left) {
        dropX = rangeButtonLeft.getBoundingClientRect().right - rangeFilter.getBoundingClientRect().left;
      }

      var leftEdge = rangeFilter.offsetWidth - rangeButtonRight.offsetWidth;

      if (dropX > leftEdge) {
        dropX = leftEdge;
      }

      var getRangeProcent = function (newSide, rangePrice) {
        var procent = Math.round(newSide / (rangeFilter.offsetWidth - rangeButtonRight.offsetWidth) * 100);
        rangePrice.textContent = procent;
      };

      getRangeProcent(dropX, rangePriceMax);

      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }

  });

  rangeButtonRight.ondragstart = function () {
    return false;
  };
})();
