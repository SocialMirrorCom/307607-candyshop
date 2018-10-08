'use strict';
(function () {
  // Загружаем с сервера массив из 28 объектов товара

  // Модальное окно ошибки

  var modalError = document.querySelector('.modal--error');
  var errorMessage = modalError.querySelector('.modal__message');
  var modalErrorClose = modalError.querySelector('.modal__close');
  var errorMessage2 = modalError.querySelector('p:last-child');

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

  var onLoad = function (data) {
    console.log(data);
  };

  var onErrorForm = function (message) {
    console.error(message);
    onModalOpen(modalError);
    errorMessage.textContent = message;
    errorMessage2.textContent = '';
    modalErrorClose.addEventListener('click', function () {
      onModalClose(modalError);
    });
  };

  //var goods = window.data(26);


  // Находим и сохраняем в переменную каталог товаров

  var catalogCardsContainer = document.querySelector('.catalog__cards');

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

  // Находим и записываем в переменные инпуты Бокового Фильтра

  var filterSidebar = document.querySelector('.catalog__sidebar');
  var labels = filterSidebar.querySelectorAll('.input-btn__label');
  var filterInputs = filterSidebar.querySelectorAll('.input-btn__input');
  var icecreamInput = filterSidebar.querySelectorAll('#filter-icecream');


  var goods =[];
  var filteredList = [];

  var onLoad = function (data) {
    goods = data;
    renderCards (goods);
  };


  // Функция для фильтрации по типу товара

  var filteredList = [];


  Array.prototype.unique = function() {
    return this.filter(function(value, index, _this) {
        return _this.indexOf(value) === index;
    });
}

  filterSidebar.addEventListener('change', function (evt) {
    console.log(evt.target.checked);
    console.log(evt.target.value);

    if (evt.target.checked && evt.target.value === 'icecream') {
      catalogCardsContainer.innerHTML = '';
      var icecreamList = goods.filter(function(it) {
      return it.kind === 'Мороженое';
      });
      filteredList = icecreamList;
      renderCards (filteredList);
      filterSidebar.querySelector('#filter-icecream ~ span').textContent = '(' + icecreamList.length + ')';
    }

    if (!evt.target.checked && evt.target.value === 'icecream') {
      catalogCardsContainer.innerHTML = '';
      filteredList.forEach(function(item, idx) {
        if (item.kind === 'Мороженое') {
          filteredList.splice(idx, 1);
        }
      });
      renderCards (filteredList);

    }

    if (evt.target.checked && evt.target.value === 'soda') {
      catalogCardsContainer.innerHTML = '';
      var sodaList = goods.filter(function(it) {
      return it.kind === 'Газировка';
    });
      filteredList = filteredList.concat(sodaList);
      renderCards (filteredList);
      filterSidebar.querySelector('#filter-soda ~ span').textContent = '(' + sodaList.length + ')';
    }

    if (!evt.target.checked && evt.target.value === 'soda') {
      catalogCardsContainer.innerHTML = '';
      for (var i = 0; i < filteredList.length; i++) {
        if (filteredList[i].kind === 'Газировка') {
          filteredList.splice(i, 1);
        }
      }
      renderCards (filteredList);
    }

    if (evt.target.checked && evt.target.value === 'gum') {
      catalogCardsContainer.innerHTML = '';
      var gumList = goods.filter(function(it) {
      return it.kind === 'Жевательная резинка';
      });
      filteredList = filteredList.concat(gumList);
      renderCards (filteredList);
      filterSidebar.querySelector('#filter-gum ~ span').textContent = '(' + gumList.length + ')';
    }

    if (!evt.target.checked && evt.target.value === 'gum') {
      catalogCardsContainer.innerHTML = '';
      for (var i = 0; i < filteredList.length; i++) {
        if (filteredList[i].kind === 'Жевательная резинка') {
          filteredList.splice(i, 1);
        }
      }
      renderCards (filteredList);
    }

    if (evt.target.checked && evt.target.value === 'marshmallows') {
      catalogCardsContainer.innerHTML = '';
      var marshmallowList = goods.filter(function(it) {
      return it.kind === 'Зефир';
      });
      filteredList = filteredList.concat(marshmallowList);
      renderCards (filteredList);
      filterSidebar.querySelector('#filter-marshmallows ~ span').textContent = '(' + marshmallowList.length + ')';
    }

    if (!evt.target.checked && evt.target.value === 'marshmallows') {
      catalogCardsContainer.innerHTML = '';
      for (var i = 0; i < filteredList.length; i++) {
        if (filteredList[i].kind === 'Зефир') {
          filteredList.splice(i, 1);
        }
      }
      renderCards (filteredList);
    }

    if (evt.target.checked && evt.target.value === 'marmalade') {
      catalogCardsContainer.innerHTML = '';
      var marmaladeList = goods.filter(function(it) {
      return it.kind === 'Мармелад';
      });
      filteredList = filteredList.concat(marmaladeList);
      renderCards (filteredList);
      filterSidebar.querySelector('#filter-marmalade ~ span').textContent = '(' + marmaladeList.length + ')';
    }

    if (!evt.target.checked && evt.target.value === 'marmalade') {
      catalogCardsContainer.innerHTML = '';
      for (var i = 0; i < filteredList.length; i++) {
        if (filteredList[i].kind === 'Мармелад') {
          filteredList.splice(i, 1);
        }
      }
      renderCards (filteredList);
    }

     if (evt.target.checked && evt.target.value === 'sugar-free') {
      catalogCardsContainer.innerHTML = '';
      var sugarfreeList = filteredList.filter(function(it) {
      return it.nutritionFacts.sugar === false;
      });
      filteredList = filteredList.concat(sugarfreeList);
      filteredList = filteredList.unique();
      renderCards (sugarfreeList);
      filterSidebar.querySelector('#filter-sugar-free ~ span').textContent = '(' + sugarfreeList.length + ')';
     }

     if (!evt.target.checked && evt.target.value === 'sugar-free') {
      catalogCardsContainer.innerHTML = '';
      renderCards (filteredList);
     }

     if (evt.target.checked && evt.target.value === 'gluten-free') {
      catalogCardsContainer.innerHTML = '';
      var glutenfreeList = filteredList.filter(function(it) {
      return it.nutritionFacts.gluten === false;
      });
      filteredList = filteredList.concat(glutenfreeList);
      filteredList = filteredList.unique();

      renderCards (filteredList);
      filterSidebar.querySelector('#filter-gluten-free ~ span').textContent = '(' + glutenfreeList.length + ')';
     }

     if (!evt.target.checked && evt.target.value === 'gluten-free') {
      catalogCardsContainer.innerHTML = '';
      renderCards (filteredList);
     }

     if (evt.target.checked && evt.target.value === 'vegetarian') {
      catalogCardsContainer.innerHTML = '';
      var vegetarianList = filteredList.filter(function(it) {
      return it.nutritionFacts.vegetarian === true;
      });

      filteredList = filteredList.concat(vegetarianList);
      filteredList = filteredList.unique();

      renderCards (vegetarianList);
      filterSidebar.querySelector('#filter-vegetarian ~ span').textContent = '(' + vegetarianList.length + ')';
     }

     if (!evt.target.checked && evt.target.value === 'vegetarian') {
      catalogCardsContainer.innerHTML = '';
      renderCards (filteredList);
     }

      console.log(filteredList);
  });


/*for (var key in ValueToArrey) {
      console.log (key);
      console.log (ValueToArrey[key])
      if (evt.target.checked && evt.target.value === key) {

        renderCards (ValueToArrey[key]);
      }
    }*/
    /*if (evt.target.checked && evt.target.value === 'icecream') {
    renderCards (icecreamList);
    }
    if (evt.target.checked && evt.target.value === 'icecream') {
    renderCards (icecreamList);
    }
    if (evt.target.checked && evt.target.value === 'icecream') {
    renderCards (icecreamList);
    }
    if (evt.target.checked && evt.target.value === 'icecream') {
    renderCards (icecreamList);
    }
    if (evt.target.checked && evt.target.value === 'icecream') {
    renderCards (icecreamList);
    }*/

    /*if (!evt.target.checked && evt.target.value === 'icecream') {

      catalogCardsContainer.removeChild(icecreamList);
    }*/


    /*if (evt.target.checked) {
      console.log(evt.target);
      evt.target.checked = false;
    } else {
      evt.target.checked = true;
    }*/






  var renderCards = function (data) {

  // Создаем фрагмент

  var fragment = document.createDocumentFragment();

  // Вставляем во фрагмент элементы

  for (var i = 0; i < data.length; i++) {
    data[i].orderedAmount = 0;

    fragment.appendChild(renderCard(similarCardTemplate, data[i]));


  // Вставляем фрагмент
    catalogCardsContainer.appendChild(fragment);


    }
  };



  //window.load(renderCards, onError);

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
          // cart.removeChild(evt.currentTarget);
          evt.currentTarget.remove();
        }
      });
     }
      showTotal(addedProductsList);
      getCartMessageinHeader(addedProductsList);
      renderBasket();

    });

    // Выводим сообщение об успешно отправленной форме и очищаем форму вместе с корзиной

      form.addEventListener('submit', function (evt) {
        evt.preventDefault();

        window.save(new FormData(form), function (response) {
          modalSuccess.classList.remove('modal--hidden');
          modalSuccessClose.addEventListener('click', function() {
            evt.preventDefault();
            modalSuccess.classList.add('modal--hidden');
            getClearForm(form);
            addedProductsList.forEach(function(item, idx) {

              if (item.name === good.name) {
                addedProductsList.splice(idx, 1);
                good.orderedAmount = 0;
              }
            showTotal(addedProductsList);
            getCartMessageinHeader(addedProductsList);
            });

            // Не видит Инпут, выдает null

            /*if (document.querySelector('input[value="cash"]').hasAttribute('checked', 'checked')) {
              document.querySelector('input[value=cash]').removeAttribute('checked', 'checked');
              document.querySelector('input[value=card]').setAttribute('checked', 'checked');
              console.log(document.querySelector('input[value=card]'));
            }*/
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

   // Запускаем функцию и размещаем товар на сайте

  //renderCards();
  window.load(onLoad, onError);

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
