'use strict';
(function () {

  // Модальное окно ошибки

  var modalError = document.querySelector('.modal--error');
  var errorMessage = modalError.querySelector('.modal__message');
  var modalErrorClose = modalError.querySelector('.modal__close');
  var errorMessage2 = modalError.querySelector('p:last-child');

  // Закрытие сообщения об ошибке по клавише Esc

  var onModalEscPress = function (evt) {
    window.close.isEscEvent(evt, closeModal);
  };

  // Закрытие  сообщения об ошибке

  var closeModal = function () {
    modalError.classList.add('modal--hidden');
    document.removeEventListener('keydown', onModalEscPress);
  };

  // Открытие сообщения об ошибке

  var openModal = function () {
    modalError.classList.remove('modal--hidden');
    document.addEventListener('keydown', onModalEscPress);
  };

  var onError = function (message) {
    openModal();
    errorMessage.textContent = message;
    modalErrorClose.addEventListener('click', closeModal);
  };

  var onErrorForm = function (message) {
    openModal();
    errorMessage.textContent = message;
    errorMessage2.textContent = '';
    modalErrorClose.addEventListener('click', closeModal);
  };

  // Находим и сохраняем в переменную каталог товаров

  var catalogCards = document.querySelector('.catalog__cards');
  var catalogLoad = document.querySelector('.catalog__load');

  // Создаем пустой массив, в который будем добавлять/удалять помещенные в корзину товары

  var addedProductsList = [];

  // Корзина

  var cart = document.querySelector('.goods__cards');

  // Находим и сохраняем в переменную шаблон карточки товара

  var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.catalog__card');

  var emptyCart = document.querySelector('.goods__card-empty');

  var removeCartMessage = function () {
    cart.classList.remove('goods__cards--empty');
    emptyCart.classList.add('visually-hidden');
  };

  /*var addCartMessage = function () {
    emptyCart.classList.toggle('visually-hidden');
    cart.classList.toggle('goods__cards--empty');

  };*/

  // Получаем сумму количества заказанных товаров.

  var getSumOfAmount = function (arrey) {
    var sum = 0;
    for (var i = 0; i < arrey.length; i++) {
      sum += arrey[i].orderedAmount;
    }
    return sum;
  };

  // Изменение сообщения корзины в шапке сайта.

  var getCartMessageinHeader = function (arrey) {

    var cartMessage = document.querySelector('.main-header__basket');
      if (arrey.length === 0) {
        cartMessage.textContent = 'В корзине ничего нет';
        putEmptyCartMessage();
      } else {
        cartMessage.textContent = 'В корзине есть товар: ' + getSumOfAmount(arrey);
      }
    };

    // Функция подставления слова товар с правильным окончанием

    var gerCorrectWord = function (number) {
      var word = '';
      if (number === 1 || number === 21 || number === 31) {
        word = 'товар';
      } else if
        (number === 2 || number === 22 || number === 32 ||
        number === 3 || number === 23 || number === 33 ||
        number === 4 || number === 24 || number === 34)
      {
        word = 'товара';
      } else {
        word = 'товаров';
      }
      return word;
    }

    // Считаем сумму заказанных товаров

    var showTotal = function (arrey) {
    var totalDiv = document.querySelector('.goods__total');
    var totalMessage = document.querySelector('.goods__total-count');
    var total = 0;
    var totalAmount = 0;
    for (var i = 0; i < arrey.length; i++) {
      total += arrey[i].price * arrey[i].orderedAmount;
      totalAmount += arrey[i].orderedAmount;
      }
    totalDiv.classList.remove('visually-hidden');
    totalMessage.innerHTML = '<p class="goods__total-count">Итого за ' + totalAmount + ' ' + gerCorrectWord(totalAmount) + ': <span class="goods__price"> ' + total + ' ₽</span></p>';
  };

  // Функция по созданию одного элемента - карточки товара - по шаблону

  var renderCard = function (node, good) {
    var cardElement = node.cloneNode(true);

    cardElement.classList.remove('card--in-stock');

    if (good.amount > 5) {
      cardElement.classList.add('card--in-stock');
    } else
    if (good.amount >= 1 && good.amount <= 5) {
      cardElement.classList.add('card--little');
    } else
    if (good.amount === 0) {
      cardElement.classList.add('card--soon');
    }

    cardElement.querySelector('.card__title').textContent = good.name;

    cardElement.querySelector('.card__img').setAttribute('src', 'img/cards/' + good.picture);
    cardElement.querySelector('.card__img').setAttribute('alt', good.name);
    //cardElement.querySelector('.card__img').innerHTML = '<img class="card__img" src="img/cards/' + good.picture + '" alt="' + good.name + '" width="265" height="264">';

    cardElement.querySelector('.card__price').innerHTML = good.price + '<span class="card__currency">₽</span><span class="card__weight">/' + good.weight + 'Г</span>';

    var starsRating = cardElement.querySelector('.stars__rating');
    starsRating.classList.remove('stars__rating--five');

    if (good.rating.value === 1) {
      starsRating.classList.add('stars__rating--one');
    } else
    if (good.rating.value === 2) {
      starsRating.classList.add('stars__rating--two');
    } else
    if (good.rating.value === 3) {
      starsRating.classList.add('stars__rating--three');
    } else
    if (good.rating.value === 4) {
      starsRating.classList.add('stars__rating--four');
    } else
    if (good.rating.value === 5) {
      starsRating.classList.add('stars__rating--five');
    }

    cardElement.querySelector('.star__count').textContent = '(' + good.rating.number + ')';

    var cardCharacteristic = cardElement.querySelector('.card__characteristic');

    if (!good.nutritionFacts.sugar) {
      cardCharacteristic.textContent = 'Без сахара. ' + good.nutritionFacts.energy + ' ккал';
    } else {
      cardCharacteristic.textContent = 'Содержит сахар. ' + good.nutritionFacts.energy + ' ккал';
    }

    // cardElement.querySelector('.card__composition').classList.remove('card__composition--hidden');
    cardElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;

    // Вешаем на карточку обработчик клика

    cardElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      var cardButton = cardElement.querySelector('.card__btn');
      if (evt.target === cardButton) {
      var duplicate = false;
      addedProductsList.forEach(function(item) {
        if (item.name === good.name) {
          if (good.amount > 0) {
          good.orderedAmount += 1;
          good.amount -= 1;
          duplicate = true;
          }
        }
      });
      if (!duplicate) {
          if (good.amount > 0) {
          addedProductsList.push(good);
          good.orderedAmount += 1;
          good.amount -= 1;
        }
      }
    }
     // Добавление товара в избранное

      var cardFavorite = cardElement.querySelector('.card__btn-favorite');

      if (evt.target === cardFavorite) {
          if (good.favorite) {
            good.favorite = false;
          } else {
            good.favorite = true;
          }

        console.log(good);
        cardFavorite.classList.toggle('card__btn-favorite--selected');
      }
        showTotal(addedProductsList);
        getCartMessageinHeader(addedProductsList);
        renderBasket();

    });

    return cardElement;
  };

  // Находим и записываем в переменные инпуты Бокового Фильтра

  var filterSidebar = document.querySelector('.catalog__sidebar');

  var range = document.querySelector('.range');
  var rangeFilter = range.querySelector('.range__filter');
  var rangeButtonLeft = rangeFilter.querySelector('.range__btn--left');
  var rangeButtonRight = rangeFilter.querySelector('.range__btn--right');
  var rangePriceMin = range.querySelector('.range__price--min');
  var rangePriceMax = range.querySelector('.range__price--max');


  var goods =[];
  var filteredList = [];

  var onLoad = function (data) {
    goods = data;
    for (var i = 0; i < goods.length; i++) {
      goods[i].orderedAmount = 0;
      goods[i].favorite = false;
    }
    closeCardLoad();
    renderCards (goods);
    console.log(goods);
  };

  var closeCardLoad = function () {
    catalogCards.classList.remove('catalog__cards--load');
    catalogLoad.classList.add('visually-hidden');
  };


  // Функция для фильтрации по типу товара

  // Объект с массивами активных фильтров

  var activeFilters = {
    foodKinds: [],
    foodProperties: [],
    price: [],
    favorites: [],
    available: [],
    popular: [],
    expensiveFirst: [],
    cheapFirst: [],
    foodRating: []
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
    renderCards(goods);
    catalogCards.removeChild(emptyFilterMessage);
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

  // Находим правильный спан для записи количества продукции

  var putNumberOfGoodsInSpan = function (target) {
    var span;
    if (target === 'Мороженое') {
      var icecreamList = goods.filter(function(it) {
        return it.kind === 'Мороженое';
      });
      span = filterSidebar.querySelector('#filter-icecream ~ span');
      span.textContent = '(' + icecreamList.length + ')';
    }
    if (target === 'Газировка') {
      var sodaList = goods.filter(function(it) {
        return it.kind === 'Газировка';
      });
      span = filterSidebar.querySelector('#filter-soda ~ span');
      span.textContent = '(' + sodaList.length + ')';
    }
    if (target === 'Жевательная резинка') {
      var gumList = goods.filter(function(it) {
        return it.kind === 'Жевательная резинка';
      });
      span = filterSidebar.querySelector('#filter-gum ~ span');
      span.textContent = '(' + gumList.length + ')';
    }
    if (target === 'Мармелад') {
      var marmaladeList = goods.filter(function(it) {
        return it.kind === 'Мармелад';
      });
      span = filterSidebar.querySelector('#filter-marmalade ~ span');
      span.textContent = '(' + marmaladeList.length + ')';
    }
    if (target === 'Зефир') {
      var marshmallowList = goods.filter(function(it) {
        return it.kind === 'Зефир';
      });
      span = filterSidebar.querySelector('#filter-marshmallows ~ span');
      span.textContent = '(' + marshmallowList.length + ')';
    }
    if (target === 'Без сахара') {
      var sugarfreeList = goods.filter(function(it) {
        return it.nutritionFacts.sugar === false;
      });
      span = filterSidebar.querySelector('#filter-sugar-free ~ span');
      span.textContent = '(' + sugarfreeList.length + ')';
    }
    if (target === 'Безглютеновое') {
      var glutenfreeList = goods.filter(function(it) {
        return it.nutritionFacts.gluten === false;
      });
      span = filterSidebar.querySelector('#filter-gluten-free ~ span');
      span.textContent = '(' + glutenfreeList.length + ')';
    }
    if (target === 'Вегетарианское') {
      var vegetarianList = goods.filter(function(it) {
        return it.nutritionFacts.vegetarian === true;
      });
      span = filterSidebar.querySelector('#filter-vegetarian ~ span');
      span.textContent = '(' + vegetarianList.length + ')';
    }
    if (target === 'Только избранное') {
      var favoriteList = goods.filter(function(it) {
        return it.favorite === true;
      });
      span = filterSidebar.querySelector('#filter-favorite ~ span');
      span.textContent = '(' + favoriteList.length + ')';
    }
    if (target === 'В наличии') {
      var availableList = goods.filter(function(it) {
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

      var isEmptyPopular = activeFilters.popular.length === 0;
      var isExistPopular = !isEmptyPopular;

      var isEmptyExpensiveFirst = activeFilters.expensiveFirst.length === 0;
      var isExistExpensiveFirst = !isEmptyExpensiveFirst;

      var isEmptyCheapFirst = activeFilters.cheapFirst.length === 0;
      var isExistCheapFirst = !isEmptyCheapFirst;

      var isEmptyFoodRating = activeFilters.foodRating.length === 0;
      var isExistFoodRating = !isEmptyFoodRating;

      // Если есть какие-то изменения то добавляем в массив

      if ((isEmptyKind || isExistInKind) && (isEmptyFoodProperty || isExistFoodProperty) && (isEmptyPrice || isExistPrice) &&
        (isEmptyFavorite || isExistFavorite) && (isEmptyAvailable || isExistAvailable)) {
        filteredList.push(current);
      }

      // Ломает весь фильтр

      /*if (isEmptyPopular || isExistPopular) {
        filteredList = items;
      }*/

      if (isEmptyExpensiveFirst || isExistExpensiveFirst) {
        filteredList = getHigherPriceFirst(filteredList);
      }
      if (isEmptyCheapFirst || isExistCheapFirst) {
        filteredList = getLowerPriceFirst(filteredList);
      }

      if (isEmptyFoodRating || isExistFoodRating) {
        filteredList = getHigherRatingFirst(filteredList);
      }

    });

    renderCards(filteredList);

    putEmptyFilterMessage();
  };

  // Фильтр для food-type

  var filterByKind = window.utils.debounce(function (evt, items) {
    var target = evt.target.innerText;
    console.log('items', target);
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
      var target = parseInt(rangePriceMax.textContent, 10);
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

  // Фильтр для избранного

  var filterByFavorite = window.utils.debounce(function (evt, items) {
    var target = evt.target.innerText;
    console.log('items', target);
    setCheckedOnFilter(evt.target);

    // если фильтр по избранному пуст добавляем таргет в фильтры
    if (activeFilters.favorites.length === 0) {
      activeFilters.favorites.push(target);
    } else if (activeFilters.favorites.indexOf(target) !== -1 && activeFilters.favorites.length === 1) {
      // если таргет есть в фильтрах и длина массива равна 1, очищаем массив
      activeFilters.favorites = [];
    }

    if (activeFilters.foodKinds.length > 0) {
      activeFilters.foodKinds = [];
    }
    if (activeFilters.foodProperties.length > 0) {
      activeFilters.foodProperties = [];
    }
    if (activeFilters.price.length > 0) {
      activeFilters.price = [];
    }
    if (activeFilters.available.length > 0) {
      activeFilters.available = [];
    }
    if (activeFilters.expensiveFirst.length > 0) {
      activeFilters.expensiveFirst = [];
    }
    removeItems();
    applyFilters(items, target);
  });

  // Фильтр для В наличие

  var filterByAvailable = window.utils.debounce(function (evt, items) {
    var target = evt.target.innerText;
    console.log('items', target);
    setCheckedOnFilter(evt.target);

    // если фильтр по избранному пуст добавляем таргет в фильтры
    if (activeFilters.available.length === 0) {
      activeFilters.available.push(target);
    } else if (activeFilters.available.indexOf(target) !== -1 && activeFilters.available.length === 1) {
      // если таргет есть в фильтрах и длина массива равна 1, очищаем массив
      activeFilters.available = [];
    }

    if (activeFilters.foodKinds.length > 0) {
      activeFilters.foodKinds = [];
    }
    if (activeFilters.foodProperties.length > 0) {
      activeFilters.foodProperties = [];
    }
    if (activeFilters.price.length > 0) {
      activeFilters.price = [];
    }
    if (activeFilters.favorites.length > 0) {
      activeFilters.favorites = [];
    }
    if (activeFilters.expensiveFirst.length > 0) {
      activeFilters.expensiveFirst = [];
    }

    removeItems();
    applyFilters(items, target);
  });

  // Вспомогательная функция для сортировки цены по убыванию

  var getLowerPriceFirst = function (arrey) {
    var arreyCopy = arrey.slice();
    arreyCopy.sort(function (first, second) {
      if(first.price > second.price) {
        return 1;
      } else if (first.price < second.price) {
        return -1;
      } else {
        return 0;
      }
    });
      return arreyCopy;
    };


  // Вспомогательная функция для сортировки цены по возрастанию

  var getHigherPriceFirst = function (arrey) {
    var arreyCopy = arrey.slice();
    arreyCopy.sort(function (first, second) {
      if(first.price < second.price) {
        return 1;
      } else if (first.price > second.price) {
        return -1;
      } else {
        return 0;
      }
    });
      return arreyCopy;
  };

  // Вспомогательная функция для сортировки по рейтингу по убыванию

  var getHigherRatingFirst = function (arrey) {
    var arreyCopy = arrey.slice();
    var rating5 = arreyCopy.filter(function(it) {
      return it.rating.value === 5;
    });
    rating5 = getHigherRatingNumberFirst(rating5);

    var rating4 = arreyCopy.filter(function(it) {
      return it.rating.value === 4;
    });
    rating4 = getHigherRatingNumberFirst(rating4);

    var rating3 = arreyCopy.filter(function(it) {
      return it.rating.value === 3;
    });
    rating3 = getHigherRatingNumberFirst(rating3);

    var rating2 = arreyCopy.filter(function(it) {
      return it.rating.value === 2;
    });
    rating2 = getHigherRatingNumberFirst(rating2);

    var rating1 = arreyCopy.filter(function(it) {
      return it.rating.value === 1;
    });
    rating1 = getHigherRatingNumberFirst(rating1);

    arreyCopy = rating5.concat(rating4).concat(rating3).concat(rating2).concat(rating1);

    return arreyCopy;
    };

    var getHigherRatingNumberFirst = function (arrey) {
    var arreyCopy = arrey.slice();
    arreyCopy.sort(function (first, second) {
      if(first.rating.number < second.rating.number) {
        return 1;
      } else if (first.rating.number > second.rating.number) {
        return -1;
      } else {
        return 0;
      }
    });
      return arreyCopy;
    };

  // Сортировка по цене по убыванию

  var filterByExpensivePriceFirst = window.utils.debounce(function (evt, items) {
    var target = evt.target.innerText;
    console.log('items', target);
    setCheckedOnFilter(evt.target);
      // если в фильтрах по типу нет ни одного фильтра, добавляем текущий таргет
    if (activeFilters.expensiveFirst.length === 0) {
      activeFilters.expensiveFirst.push(target);
    } else if (activeFilters.expensiveFirst.indexOf(target) !== -1 && activeFilters.expensiveFirst.length === 1) {
      // если в фильтрах по типу есть таргет и он единственный в массиве, очищаем массив
      activeFilters.expensiveFirst = [];
    }

    removeItems();
    applyFilters(items, target);
  });

  // Сортировка по цене по возрастанию

  var filterByCheapPriceFirst = window.utils.debounce(function (evt, items) {
    var target = evt.target.innerText;
    console.log('items', target);
    setCheckedOnFilter(evt.target);
      // если в фильтрах по типу нет ни одного фильтра, добавляем текущий таргет
    if (activeFilters.cheapFirst.length === 0) {
      activeFilters.cheapFirst.push(target);
    } else if (activeFilters.cheapFirst.indexOf(target) !== -1 && activeFilters.cheapFirst.length === 1) {
      // если в фильтрах по типу есть таргет и он единственный в массиве, очищаем массив
      activeFilters.cheapFirst = [];
    }

    removeItems();
    applyFilters(items, target);
  });

  // Сортировка по рейтингу по убыванию

  var filterByRating = window.utils.debounce(function (evt, items) {
    var target = evt.target.innerText;
    console.log('items', target);
    setCheckedOnFilter(evt.target);
      // если в фильтрах по типу нет ни одного фильтра, добавляем текущий таргет
    if (activeFilters.foodRating.length === 0) {
      activeFilters.foodRating.push(target);
    } else if (activeFilters.foodRating.indexOf(target) !== -1 && activeFilters.foodRating.length === 1) {
      // если в фильтрах по типу есть таргет и он единственный в массиве, очищаем массив
      activeFilters.foodRating = [];
    }

    removeItems();
    applyFilters(items, target);
  });

  /*var filterByPopular = window.utils.debounce(function (evt, items) {
    var target = evt.target.innerText;
    console.log('items', target);
    setCheckedOnFilter(evt.target);
      // если в фильтрах по типу нет ни одного фильтра, добавляем текущий таргет
    if (activeFilters.popular.length === 0) {
      activeFilters.popular.push(target);
    } else if (activeFilters.popular.indexOf(target) !== -1 && activeFilters.popular.length === 1) {
      // если в фильтрах по типу есть таргет и он единственный в массиве, очищаем массив
      activeFilters.popular = [];
    } else if (activeFilters.popular.indexOf(target) !== -1 && activeFilters.popular.length > 1) {
      // если в фильтрах есть таргет и длина массива больше 1, удаляем таргет из фильтров
      activeFilters.popular = activeFilters.popular.filter(function (item) {
        return item !== target;
      });
    } else if (activeFilters.popular.indexOf(target) === -1 && activeFilters.popular.length > 0) {
      // если в фильтрах нет таргета, и длина массива с фильтрами больше 0, добавляем таргет в фильтры
      activeFilters.popular.push(target);
    }
    removeItems();
    applyFilters(items, target);
  });*/

  // Oбработчик на клик по фильтрам
  var onFiltersClick = function (evt) {
    evt.preventDefault();
    var target = evt.target.innerText;
    if (target === 'Мороженое' || target === 'Газировка' || target === 'Жевательная резинка' || target === 'Мармелад' || target === 'Зефир') {
      filterByKind(evt, goods);
    } else if (target === 'Без сахара') {
      filterByFoodProperty(evt, goods, 'sugar');
    } else if (target === 'Безглютеновое') {
      filterByFoodProperty(evt, goods, 'gluten');
    } else if (target === 'Вегетарианское') {
      filterByFoodProperty(evt, goods, 'vegetarian');
    } else if (target === 'Только избранное') {
      filterByFavorite(evt, goods);
    } else if (target === 'В наличии') {
      filterByAvailable(evt, goods);
    //} else if (target === 'Сначала популярные') {
      //filterByPopular(evt, goods);
    } else if (target === 'Сначала дорогие') {
      filterByExpensivePriceFirst(evt, goods);
    } else if (target === 'Сначала дешёвые') {
      filterByCheapPriceFirst(evt, goods);
    } else if (target === 'По рейтингу') {
      filterByRating(evt, goods);
    }

    putNumberOfGoodsInSpan(target);
  };

  // Обработчик mousemove для ценового фильтра

  var onPriceFilterMousemove = function (evt) {
    evt.preventDefault();
    if (evt.target === rangeButtonLeft) {
      var target = parseInt(rangePriceMin.textContent, 10);
    }
    if (evt.target === rangeButtonRight) {
      var target = parseInt(rangePriceMax.textContent, 10);
    }
    filterByPrice(evt, goods);
    //putEmptyFilterMessage();
  };

  var submitButton = filterSidebar.querySelector('.catalog__submit');

  var onSubmitButton = function (evt) {
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
    console.log(filteredList);
    renderCards(goods);
  };

  submitButton.addEventListener('click', onSubmitButton);

  filterSidebar.addEventListener('click', onFiltersClick);

  rangeButtonRight.addEventListener('mousemove', onPriceFilterMousemove);

  rangeButtonLeft.addEventListener('mousemove', onPriceFilterMousemove);




  /////////////////////////////////////////////////////////////////////////////////












  var renderCards = function (data) {

  // Создаем фрагмент

  var fragment = document.createDocumentFragment();

  // Вставляем во фрагмент элементы

  for (var i = 0; i < data.length; i++) {
    //data[i].orderedAmount = 0;
    //data[i].favorite = false;

    fragment.appendChild(renderCard(similarCardTemplate, data[i]));

  // Вставляем фрагмент

    catalogCards.appendChild(fragment);
    }
  };

  // Модальное окно успешной отправки формы

  var modalSuccess = document.querySelector('.modal--success');
  var modalSuccessClose = modalSuccess.querySelector('.modal__close');
  var form = document.querySelector('.form-order');
  var submitBtn = form.querySelector('.buy__submit-btn');

  // Функция, которая очищает корзину

  var getClearForm = function (form) {
    cart.innerHTML = '';
    var inputs = form.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    form.querySelector('.deliver__textarea').value = '';
    }
  };

  // Template карточки товара в корзине

  var cartTemplate = document.querySelector('#card-order')
      .content
      .querySelector('.goods_card');

  var createBasket = function(node, good) {
    var cardElement = node.cloneNode(true);

    cardElement.querySelector('.card-order__title').textContent = good.name;

    cardElement.querySelector('.card-order__img').setAttribute('src', 'img/cards/' + good.picture);
    cardElement.querySelector('.card-order__img').setAttribute('alt', good.name);
    //cardElement.querySelector('.card-order__img').innerHTML = '<img src="img/cards/' + good.picture + '" alt="' + good.name + '" class="card-order__img" width="265" height="264">';

    cardElement.querySelector('.card-order__price').textContent = good.price + ' ₽';
    cardElement.querySelector('.card-order__count').value = good.orderedAmount;

    cardElement.addEventListener("click", function(evt) {
      evt.preventDefault();

      // Записываем в переменные активные элементы на карточке в корзине (удаление, уменьшение количества товара,
      // увеличесние количества товара)

      var cardInCartClose = cardElement.querySelector('.card-order__close');
      var cardQuantityDecrease = cardElement.querySelector('.card-order__btn--decrease');
      var cardQuantityIncrease = cardElement.querySelector('.card-order__btn--increase');

      if (evt.target === cardQuantityDecrease) {

      addedProductsList.forEach(function(item, idx) {
        if (item.name === good.name) {
          if (good.orderedAmount >= 2) {
          good.orderedAmount -= 1;
          good.amount +=1;
          } else {
            addedProductsList.splice(idx, 1);
            good.amount += good.orderedAmount;
            good.orderedAmount = 0;
            cart.removeChild(evt.currentTarget);
          }
        }
      });
     }

     if (evt.target === cardQuantityIncrease) {
      addedProductsList.forEach(function(item) {
        if (item.name === good.name) {
          if (good.amount > 0) {
          good.orderedAmount += 1;
          good.amount -= 1;
          }
        }
      });
     }

     if (evt.target === cardInCartClose) {

      addedProductsList.forEach(function(item, idx) {

        if (item.name === good.name) {
          addedProductsList.splice(idx, 1);
          good.amount += good.orderedAmount;
          good.orderedAmount = 0;
          evt.currentTarget.remove();
        }
      });
     }
      showTotal(addedProductsList);
      getCartMessageinHeader(addedProductsList);
      renderBasket();
      putEmptyCartMessage();
    });

  // Закрытие сообщения об успешно отправленной форме Esc

  var onModalSuccessEscPress = function (evt) {
    window.close.isEscEvent(evt, closeModalSuccess);
  };

  // Закрытие  сообщения об успешно отправленной форме

  var closeModalSuccess = function () {
    modalSuccess.classList.add('modal--hidden');
    document.removeEventListener('keydown', onModalSuccessEscPress);
  };

  // Открытие сообщения об успешно отправленной форме

  var openModalSucces = function () {
    modalSuccess.classList.remove('modal--hidden');
    document.addEventListener('keydown', onModalSuccessEscPress);
  };

    // Выводим сообщение об успешно отправленной форме и очищаем форму вместе с корзиной

      form.addEventListener('submit', function (evt) {
        evt.preventDefault();

        window.save(new FormData(form), function (response) {
          openModalSucces();
          modalSuccessClose.addEventListener('click', function() {
            evt.preventDefault();
            closeModalSuccess();
            getClearForm(form);
            addedProductsList.forEach(function(item, idx) {

              if (item.name === good.name) {
                addedProductsList.splice(idx, 1);
                good.orderedAmount = 0;
              }
            showTotal(addedProductsList);
            getCartMessageinHeader(addedProductsList);
            });
          });
        },
        onErrorForm);
      });

    return cardElement;

  };

  var renderBasket = function() {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < addedProductsList.length; i++) {
      fragment.appendChild(createBasket(cartTemplate, addedProductsList[i]));
    }

    cart.innerHTML = "";
    cart.appendChild(fragment);

    // Удаляем сообщение из корзины

    removeCartMessage();

    // Делаем форму заказа активной

    removeDisabledAttribute(form);
    submitBtn.removeAttribute('disabled', 'disabled');
  };

  // Информируем о пустой корзине

  var emptyCartTemplate = document.querySelector('#cards-empty')
    .content
    .querySelector('.goods__card-empty');
    var emptyCartMessage = emptyCartTemplate.cloneNode(true);

  var putEmptyCartMessage = function () {
    cart.appendChild(emptyCartMessage);
  };

   // Запускаем функцию и размещаем товар на сайте

  window.load(onLoad, onError);

})();
