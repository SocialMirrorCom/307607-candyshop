'use strict';
(function () {

  var FILTER_PRICE_MIN = 15;
  var FILTER_PRICE_MAX = 85;
  var LEFT_RANGE_BUTTON_X = 104.75 - 68;
  var RIGHT_RANGE_BUTTON_X = 266.25 - 68;

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

  // Удаляем сообщение о пустой корзине

  var emptyCart = document.querySelector('.goods__card-empty');

  var removeCartMessage = function () {
    cart.classList.remove('goods__cards--empty');
    emptyCart.classList.add('visually-hidden');
  };

  // Помещаем/удаляем сообщение в/из пустую корзину с помощью tamplate

  var emptyCartTemplate = document.querySelector('#cards-empty')
    .content
    .querySelector('.goods__card-empty');
  var emptyCartMessage = emptyCartTemplate.cloneNode(true);

  var putEmptyCartMessage = function () {
    cart.appendChild(emptyCartMessage);
  };

  var removeEmptyCartMessage = function () {
    cart.removeChild(emptyCartMessage);
  };

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
    } else {
      cartMessage.textContent = 'В корзине есть товар: ' + getSumOfAmount(arrey);
    }
  };

  // Функция подставления слова товар с правильным окончанием

  var gerCorrectWord = function (number) {
    var word = '';
    if (number === 1 || number === 21 || number === 31) {
      word = 'товар';
    } else if (number === 2 || number === 22 || number === 32 || number === 3 || number === 23 || number === 33 || number === 4 || number === 24 || number === 34) {
      word = 'товара';
    } else {
      word = 'товаров';
    }
    return word;
  };

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

    cardElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;

    // Вешаем на карточку обработчик клика

    cardElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      var cardButton = cardElement.querySelector('.card__btn');
      if (evt.target === cardButton) {
        var duplicate = false;
        addedProductsList.forEach(function (item) {
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
        cardFavorite.classList.toggle('card__btn-favorite--selected');
      }
      showTotal(addedProductsList);
      getCartMessageinHeader(addedProductsList);
      renderBasket();
    });
    return cardElement;
  };

  window.goods = [];

  var onLoad = function (data) {
    goods = data;
    for (var i = 0; i < goods.length; i++) {
      goods[i].orderedAmount = 0;
      goods[i].favorite = false;
    }
    closeCardLoad();
    renderCards(goods);
  };

  var closeCardLoad = function () {
    catalogCards.classList.remove('catalog__cards--load');
    catalogLoad.classList.add('visually-hidden');
  };

  // Функция для фильтрации по типу товара


  // Отрисовываем карточки

  window.renderCards = function (data) {

    // Создаем фрагмент

    var fragment = document.createDocumentFragment();

    // Вставляем во фрагмент элементы

    for (var i = 0; i < data.length; i++) {

      fragment.appendChild(renderCard(similarCardTemplate, data[i]));

      // Вставляем фрагмент

      catalogCards.appendChild(fragment);
    }
  };

  // Модальное окно успешной отправки формы

  var modalSuccess = document.querySelector('.modal--success');
  var modalSuccessClose = modalSuccess.querySelector('.modal__close');
  var formOrder = document.querySelector('.form-order');
  var submitBtn = formOrder.querySelector('.buy__submit-btn');

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

  var createBasket = function (node, good) {
    var cardElement = node.cloneNode(true);

    cardElement.querySelector('.card-order__title').textContent = good.name;

    cardElement.querySelector('.card-order__img').setAttribute('src', 'img/cards/' + good.picture);
    cardElement.querySelector('.card-order__img').setAttribute('alt', good.name);

    cardElement.querySelector('.card-order__price').textContent = good.price + ' ₽';
    cardElement.querySelector('.card-order__count').value = good.orderedAmount;

    cardElement.addEventListener('click', function (evt) {
      evt.preventDefault();

      // Записываем в переменные активные элементы на карточке в корзине (удаление, уменьшение количества товара,
      // увеличесние количества товара)

      var cardInCartClose = cardElement.querySelector('.card-order__close');
      var cardQuantityDecrease = cardElement.querySelector('.card-order__btn--decrease');
      var cardQuantityIncrease = cardElement.querySelector('.card-order__btn--increase');

      if (evt.target === cardQuantityDecrease) {
        addedProductsList.forEach(function (item, idx) {
          if (item.name === good.name) {
            if (good.orderedAmount >= 2) {
              good.orderedAmount -= 1;
              good.amount += 1;
            } else {
              addedProductsList.splice(idx, 1);
              good.amount += good.orderedAmount;
              good.orderedAmount = 0;
              cart.removeChild(evt.currentTarget);
              getClearForm(formOrder);
              window.setDisabledAttribute(formOrder);
              submitBtn.setAttribute('disabled', 'disabled');
              //window.getFormBlocked();
            }
          }
        });
      }

      if (evt.target === cardQuantityIncrease) {
        addedProductsList.forEach(function (item) {
          if (item.name === good.name) {
            if (good.amount > 0) {
              good.orderedAmount += 1;
              good.amount -= 1;
            }
          }
        });
      }

      if (evt.target === cardInCartClose) {
        addedProductsList.forEach(function (item, idx) {
          if (item.name === good.name) {
            addedProductsList.splice(idx, 1);
            good.amount += good.orderedAmount;
            good.orderedAmount = 0;
            evt.currentTarget.remove();
            getClearForm(formOrder);
            window.setDisabledAttribute(formOrder);
            submitBtn.setAttribute('disabled', 'disabled');
            //window.getFormBlocked();
          }
        });
      }
      showTotal(addedProductsList);
      getCartMessageinHeader(addedProductsList);
      renderBasket();
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

    var oncloseModalSuccess = function () {
      closeModalSuccess();
      getClearForm(formOrder);
      addedProductsList.forEach(function (item, idx) {
        if (item.name === good.name) {
          addedProductsList.splice(idx, 1);
          good.orderedAmount = 0;
        }
        showTotal(addedProductsList);
        getCartMessageinHeader(addedProductsList);
        window.setDisabledAttribute(formOrder);
      });
    };

    // Выводим сообщение об успешно отправленной форме и очищаем форму вместе с корзиной

    var onLoadModalSuccess = function () {
      openModalSucces();
    };

    formOrder.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.save(new FormData(formOrder), onLoadModalSuccess, onErrorForm);
    });

    modalSuccessClose.addEventListener('click', oncloseModalSuccess);
    modalSuccessClose.addEventListener('keydown', oncloseModalSuccess);


    return cardElement;
  };

  var renderBasket = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < addedProductsList.length; i++) {
      fragment.appendChild(createBasket(cartTemplate, addedProductsList[i]));
    }
    cart.innerHTML = '';
    cart.appendChild(fragment);

    // Удаляем/возвращаем сообщение из корзины

    if (addedProductsList.length === 0) {
      putEmptyCartMessage();
    } else {
      removeCartMessage();
      //removeEmptyCartMessage();
    }

    // Делаем форму заказа активной

    window.removeDisabledAttribute(formOrder);
    submitBtn.removeAttribute('disabled', 'disabled');
  };

  // Запускаем функцию и размещаем товар на сайте

  window.load(onLoad, onError);

})();
