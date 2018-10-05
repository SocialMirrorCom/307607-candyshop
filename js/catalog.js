'use strict';
(function () {
  // Загружаем с сервера массив из 28 объектов товара

  // Модальное окно ошибки

  var modalError = document.querySelector('.modal--error');
  var errorMessage = modalError.querySelector('.modal__message');
  var modalErrorClose = modalError.querySelector('.modal__close');

  var onModalClose = function (modal) {
    modal.classList.add('modal--hidden');
  };

  var onModalOpen = function (modal) {
    modal.classList.remove('modal--hidden');
  };

  var onError = function (message) {
    console.error(message);
    onModalOpen(modalError);
    errorMessage.textContent = message;
    modalErrorClose.addEventListener('click', function () {
      onModalClose(modalError);
    });
  };

  var goods = [];

  var onLoad = function (data) {
    return goods = data;
    console.log(goods);
  };


  // Находим и сохраняем в переменную каталог товаров

  var catalogCardsContainer = document.querySelector('.catalog__cards');

  // Создаем пустой массив, в который будем добавлять/удалять помещенные в корзину товары

  var addedProductsList = [];

  // Корзина

  window.cart = document.querySelector('.goods__cards');

  // Находим и сохраняем в переменную шаблон карточки товара

  var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.catalog__card');

  var emptyCart = document.querySelector('.goods__card-empty');

  var removeCartMessage = function () {
    cart.classList.toggle('goods__cards--empty');
    emptyCart.classList.toggle('visually-hidden');
  };

  var addCartMessage = function () {
    emptyCart.classList.toggle('visually-hidden');
    cart.classList.toggle('goods__cards--empty');

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
        addCartMessage();
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

    cardElement.querySelector('.card__img').setAttribute('src', good.picture);
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

    // cardElement.querySelector('.card__composition').classList.remove('card__composition--hidden');
    cardElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;

    // Вешаем на карточку обработчик клика

    cardElement.addEventListener('click', function (evt) {
      evt.preventDefault();
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
        showTotal(addedProductsList);
        getCartMessageinHeader(addedProductsList);
        renderBasket();
    });

    return cardElement;
  };

  var renderCards = function () {

  // Создаем фрагмент

  var fragment = document.createDocumentFragment();

  // Вставляем во фрагмент элементы

  for (var i = 0; i < goods.length; i++) {
    fragment.appendChild(renderCard(similarCardTemplate, goods[i]));
  }

  // Вставляем фрагмент

  catalogCardsContainer.appendChild(fragment);

  };

  // Template карточки товара в корзине

  var cartTemplate = document.querySelector('#card-order')
      .content
      .querySelector('.goods_card');

  var createBasket = function(node, good) {
    var cardElement = node.cloneNode(true);

    cardElement.querySelector('.card-order__title').textContent = good.name;

    cardElement.querySelector('.card-order__img').setAttribute('src', good.picture);
    cardElement.querySelector('.card-order__img').setAttribute('alt', good.name);

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
          // cart.removeChild(evt.currentTarget);
          evt.currentTarget.remove();
        }
      });
     }
      showTotal(addedProductsList);
      getCartMessageinHeader(addedProductsList);
      renderBasket();
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

    var form = document.querySelector('.form-order');
    var submitBtn = form.querySelector('.buy__submit-btn');
    removeDisabledAttribute(form);
    submitBtn.removeAttribute('disabled', 'disabled');
  };

   // Запускаем функцию и размещаем товар на сайте

  renderCards();

  // Добавление товара в избранное

  var cardFavorites = document.querySelectorAll('.card__btn-favorite');

  for (var i = 0; i < cardFavorites.length; i++) {
    cardFavorites[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      var currentTarget = evt.currentTarget;
      currentTarget.classList.toggle('card__btn-favorite--selected');
    });
  }
})();
