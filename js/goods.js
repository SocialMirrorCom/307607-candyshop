'use strict';

// Массив с названиями продукта

var names = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];

// Массив с ссылками на изображение продукта

var pictures = [
  'img/cards/gum-cedar.jpg',
  'img/cards/gum-chile.jpg',
  'img/cards/gum-eggplant.jpg',
  'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg',
  'img/cards/gum-wasabi.jpg',
  'img/cards/ice-cucumber.jpg',
  'img/cards/ice-eggplant.jpg',
  'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg',
  'img/cards/ice-mushroom.jpg',
  'img/cards/ice-pig.jpg',
  'img/cards/marmalade-beer.jpg',
  'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg',
  'img/cards/marmalade-new-year.jpg',
  'img/cards/marmalade-sour.jpg',
  'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg',
  'img/cards/marshmallow-shrimp.jpg',
  'img/cards/marshmallow-spicy.jpg',
  'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg',
  'img/cards/soda-celery.jpg',
  'img/cards/soda-cob.jpg',
  'img/cards/soda-garlic.jpg',
  'img/cards/soda-peanut-grapes.jpg',
  'img/cards/soda-russian.jpg'
];

// Массив с данными по составу продукта

var strings = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Функция по получению случайного элемента массива

var getRandomData = function (arrey) {
  var randomIndex = Math.floor(Math.random() * arrey.length);
  var data = arrey[randomIndex];
  return data;
};

// Функция по созданию массива с объектами - товарами

var getGoodsList = function (goodsQuantity) {
  var goodsList = [];
  for (var i = 0; i < goodsQuantity; i++) {
    goodsList[i] = {
      name: getRandomData(names),
      picture: getRandomData(pictures),
      amount: getRandomInt(0, 21),
      price: getRandomInt(100, 1501),
      weight: getRandomInt(30, 301),
      rating: {
        value: getRandomInt(1, 6),
        number: getRandomInt(10, 901)
      },
      nutritionFacts: {
        sugar: !!getRandomInt(0, 2),
        energy: getRandomInt(70, 501),
        contents: getRandomData(strings) + ', ' + getRandomData(strings) + ', ' + getRandomData(strings) + ', ' + getRandomData(strings)
      }
    };
  }

  return goodsList;
};

// Создаем массив из 26 объектов товара

var goods = getGoodsList(26);

// Скрываем блок и текст Данные загружаются

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

// Находим и сохраняем в переменную каталог товаров

var catalogCardsContainer = document.querySelector('.catalog__cards');

// Находим и сохраняем в переменную шаблон карточки товара

var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.catalog__card');

// Функция по созданию одного элемента по шаблону

var renderCard = function (good) {
  var cardElement = similarCardTemplate.cloneNode(true);

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

  return cardElement;
};

// Создаем фрагмент

var fragment = document.createDocumentFragment();

// Вставляем во фрагмент элементы

for (var i = 0; i < goods.length; i++) {
  fragment.appendChild(renderCard(goods[i]));
}

// Вставляем фрагмент

catalogCardsContainer.appendChild(fragment);

// Создаем массив товара, добавленного в корзину

var goodsInCart = getGoodsList(3);

var cart = document.querySelector('.goods__cards');

var cartTemplate = document.querySelector('#card-order')
    .content
    .querySelector('.goods_card');

var renderCardInCart = function (good) {
  var cardElement = cartTemplate.cloneNode(true);

  cardElement.querySelector('.card-order__title').textContent = good.name;

  cardElement.querySelector('.card-order__img').setAttribute('src', good.picture);
  cardElement.querySelector('.card-order__img').setAttribute('alt', good.name);

  cardElement.querySelector('.card-order__price').textContent = good.price + ' ₽';
  cardElement.querySelector('.card-order__count').value = good.orderedAmount;

  return cardElement;
};

// Создаем фрагмент

var fragment2 = document.createDocumentFragment();

// Вставляем во фрагмент элементы

for (var j = 0; j < goodsInCart.length; j++) {
  fragment2.appendChild(renderCardInCart(goodsInCart[j]));
}

// Вставляем фрагмент

// cart.appendChild(fragment2);

var emptyCart = document.querySelector('.goods__card-empty');

var removeCartMessage = function () {
  cart.classList.remove('goods__cards--empty');
  emptyCart.classList.add('visually-hidden');
};

var addCartMessage = function () {
  cart.classList.add('goods__cards--empty');
  emptyCart.classList.remove('visually-hidden');
};

// Добавление товара в избранное

var cardFavorites = document.querySelectorAll('.card__btn-favorite');

for (var i = 0; i < cardFavorites.length; i++) {
  cardFavorites[i].addEventListener('click', function (evt) {
    var currentTarget = evt.currentTarget;
    currentTarget.classList.toggle('card__btn-favorite--selected');
  });
}

// Выбор формы оплаты заказа
var form = document.querySelector('.form-order');
var submitBtn = form.querySelector('.buy__submit-btn');
var inputCard = document.querySelector('input[value=card]');
var inputCash = document.querySelector('input[value=cash]');
var paymentCardForm = document.querySelector('.payment__card-wrap');
var paymentCashAlarm = document.querySelector('.payment__cash-wrap');

// Функция, которая создает массив инпутов в форме и устанавливает им атрибуты disabled

var setDisabledAttribute = function (form) {
  var inputsArrey = form.querySelectorAll('input');
  for (var i = 0; i < inputsArrey.length; i++) {
    inputsArrey[i].setAttribute('disabled', 'disabled');
  }
};

// Функция, которая создает массив инпутов в форме и удаляет им атрибуты disabled

var removeDisabledAttribute = function (form) {
  var inputsArrey = form.querySelectorAll('input');
  for (var i = 0; i < inputsArrey.length; i++) {
    inputsArrey[i].removeAttribute('disabled', 'disabled');
  }
};

// Добавление товара в корзину

var cards = document.querySelectorAll('.catalog__card');
var currentCartArrey = cart.querySelectorAll('.goods_card');

// Создаем массив в который записываем добавляемые в корзину объекты

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', function (evt) {
    var currentProduct = evt.currentTarget;
    var currentProductName = currentProduct.querySelector('.card__title').textContent;
    for (var i = 0; i < goods.length; i++) {
      if (goods[i].name === currentProductName) {
        currentProduct = goods[i];
      }
    }
    console.log(currentProduct.amount);
    var addedProduct = Object.assign({}, currentProduct, {
      orderedAmount: 1
    });
    delete addedProduct.nutritionFacts;
    delete addedProduct.rating;
    delete addedProduct.weight;
    delete addedProduct.amount;



    currentCartArrey = cart.querySelectorAll('.goods_card');
    if (currentCartArrey.length > 0) {
      for (var i = 0; i < currentCartArrey.length; i++) {
        var repetedElement = 0;
        if (currentCartArrey[i].querySelector('.card-order__title').innerHTML === addedProduct.name) {

          if (currentProduct.amount >= 1) {
            addedProduct.orderedAmount = currentCartArrey[i].querySelector('.card-order__count').value;
            addedProduct.orderedAmount = parseInt(addedProduct.orderedAmount, 10);
            addedProduct.orderedAmount += 1;
            currentCartArrey[i].querySelector('.card-order__count').value = addedProduct.orderedAmount;
            repetedElement += 1;
            break;
          }
        }
      }
    }

    if (currentCartArrey.length === 0 || !!repetedElement === false) {
      if (currentProduct.amount >= addedProduct.orderedAmount) {
        cart.appendChild(renderCardInCart(addedProduct));
        removeCartMessage();
        removeDisabledAttribute(form);
        submitBtn.removeAttribute('disabled', 'disabled');

      }
    }

    currentProduct.amount--;
    console.log(currentProduct.amount);

    var cartMessage = document.querySelector('.main-header__basket');
    currentCartArrey = cart.querySelectorAll('.goods_card');
    if (currentCartArrey.length === 0) {
      cartMessage.textContent = 'В корзине ничего нет';
    } else {
      cartMessage.textContent = 'В корзине есть товар';
    }

    // Удаление товара из корзины

    currentCartArrey = cart.querySelectorAll('.goods_card');

    for (var i = 0; i < currentCartArrey.length; i++) {
      currentCartArrey[i].addEventListener('click', function (evt) {
        var currentProductinCart = evt.currentTarget;
      console.log(currentProductinCart);
        var cardInCartClose = currentProductinCart.querySelector('.card-order__close');
        var cardQuantityDecrease = currentProductinCart.querySelector('.card-order__btn--decrease');
        var cardQuantityIncrease = currentProductinCart.querySelector('.card-order__btn--increase');

        // Нажатие на кнопку card-order__btn--decrease уменьшает количество товара в корзине на единицу.
        // Если до этого, в корзине находилась одна единица товара, товар удаляется из корзины.

        if (evt.target === cardQuantityDecrease) {
          console.log(evt.target);

          var currentProductAmount = currentProductinCart.querySelector('.card-order__count').value;
          currentProductAmount = parseInt(currentProductAmount, 10);
          if (currentProductAmount >= 2) {
          currentProductAmount -= 1;
          currentProductinCart.querySelector('.card-order__count').value = currentProductAmount;
          currentProduct.amount++;
          console.log(currentProduct.amount);
          } else {
          cart.removeChild(currentProductinCart);
          console.log(currentCartArrey);
          addCartMessage();
          currentProduct.amount += currentProductAmount;
          console.log(currentProduct.amount);
          }
        }

        // Нажатие на кнопку card-order__btn--increase увеличивает количество товара в корзине на единицу, в пределах изначального количества товара.

        if (evt.target === cardQuantityIncrease) {
          if (currentProduct.amount > 0) {
          var currentProductAmount = currentProductinCart.querySelector('.card-order__count').value;
          currentProductAmount = parseInt(currentProductAmount, 10);
          currentProductAmount += 1;
          currentProductinCart.querySelector('.card-order__count').value = currentProductAmount;
          currentProduct.amount--;
          console.log(currentProduct.amount);
          }
        }

        // Удаляем продукт из корзины по нажатию на крестик, при удалении количество продукта пересчитывается

        if (evt.target === cardInCartClose) {

          cart.removeChild(currentProductinCart);
          currentCartArrey = cart.querySelectorAll('.goods_card'); // удаляет но ругается, что удаляемый элемент не чайлд нода
          console.log(currentCartArrey);
          addCartMessage();
          currentProduct.amount += parseInt(currentProductinCart.querySelector('.card-order__count').value, 10);
          console.log(currentProduct.amount);
        }
      });
    }
  });
}



// Если выбрана оплата наличными, то скрываем форму для внесения данных карты и блокируем ее, чтобы данные не отправлялись на сервер
// Открывает предупреждение

inputCash.addEventListener('click', function () {
  paymentCashAlarm.classList.remove('visually-hidden');
  paymentCardForm.classList.add('visually-hidden');
  setDisabledAttribute(paymentCardForm);
});

// Если выбрана оплата картой, то показываем форму внесения номера карты

inputCard.addEventListener('click', function () {
  paymentCashAlarm.classList.add('visually-hidden');
  paymentCardForm.classList.remove('visually-hidden');
  removeDisabledAttribute(paymentCardForm);
});

// Валидация формы оформления заказа
// Переменные

var form = document.querySelector('.form-order');
var inputs = form.querySelectorAll('input');
var submitBtn = form.querySelector('.buy__submit-btn');
var floorNumber = form.querySelector('input[name=deliver-floor]');
var cvcNumber = paymentCardForm.querySelector('input[name=card-cvc]');
var cardDate = paymentCardForm.querySelector('input[name=card-date]');
var emailValue = form.querySelector('input[name=email]');
var cardNumderInput = paymentCardForm.querySelector('input[name=card-number]');
var cardName = paymentCardForm.querySelector('input[name=cardholder]');
var cardStatus = paymentCardForm.querySelector('.payment__card-status');

// Если в корзине нет ни одного товара, форма оформления заказа блокируется

var getFormBlocked = function () {
var currentCartArrey = cart.querySelectorAll('.goods_card');
console.log(currentCartArrey);
if (currentCartArrey.length === 0) {
  setDisabledAttribute(form);
  submitBtn.setAttribute('disabled', 'disabled');
  }
};
getFormBlocked();

// Алгоритм Луна

var moonAlgorythm = function (inputValue) {
  var arr = inputValue.split(''); // turn string into arrey
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    arr[i] = parseInt(arr[i], 10);
    if (i % 2 === 0) {
      arr[i] *= 2;
    } else {
      arr[i];
    }
    if (arr[i] >= 10) {
      arr[i] -= 9;
    } else {
      arr[i];
    }
    sum += arr[i];
  }
  return sum % 10 === 0;
};

var valid = {
  cardNumderInput: false,
  cardDate: false,
  cvcNumber: false,
  cardName: false
};

// Определяем статус кредитной карты Одобрен/Не одобрен

paymentCardForm.addEventListener('input', function(evt) {
  if (evt.target === cardNumderInput) {
    valid.cardNumderInput = moonAlgorythm(evt.target.value);
    console.log(valid.cardNumderInput);
  }
  if (evt.target === cardDate) {
    valid.cardDate = evt.target.checkValidity();
    console.log(valid.cardDate);
  }
  if (evt.target === cvcNumber) {
    valid.cvcNumber = evt.target.checkValidity();
    console.log(valid.cvcNumber);
  }
  if (evt.target === cardName) {
    valid.cardName = evt.target.checkValidity();
    console.log(valid.cardName);
  }
  cardStatus.textContent = (valid.cardNumderInput && valid.cardDate && valid.cvcNumber && valid.cardName) ? 'одобрен' : 'не одобрен';
});

// Функция по кастомизации сообщений об ошибках

function CustomValidation() {}

CustomValidation.prototype = {
  // Установим пустой массив сообщений об ошибках
  invalidities: [],

  // Метод, проверяющий валидность
  checkValidity: function(input) {

    var validity = input.validity;

    if (validity.patternMismatch) {
      this.addInvalidity('Пожалуйста заполните поле по образцу');
    }

    if (validity.rangeOverflow) {
      var max = getAttributeValue(input, 'maxlength');
      this.addInvalidity('Максимальное количество знаков ' + max);
    }

    if (validity.rangeUnderflow) {
      var min = getAttributeValue(input, 'minlength');
      this.addInvalidity('Минимальное количество знаков ' + min);
    }

    if (validity.valueMissing) {
      this.addInvalidity('Обязательное поле');
    }

    if (!moonAlgorythm(cardNumderInput.value)) {
      console.log(cardNumderInput.value);
      this.addInvalidity('Введите правильный номер');
    }

    /*if (!floorNumber.value.match(/^[ 0-9]+$/g)) {
    this.addInvalidity('Введите этаж цифрой');
    }

    if (!cvcNumber.value.match(/[0-9]{3}/g)) {
    this.addInvalidity('Введите 3 цифры, указанные на обороте вашей карты');
    }

    if (!cardDate.value.match(/[0-9]{2}\.[0-9]{2}/g)) {
    this.addInvalidity('Введите дату по образцу');
    }

    if (!emailValue.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g)) {
    this.addInvalidity('Введите адрес электронной почты по образцу: someone@gmail.ru');
    }*/

  },

  // Добавляем сообщение об ошибке в массив ошибок
  addInvalidity: function(message) {
    this.invalidities.push(message);
  },

  // Получаем общий текст сообщений об ошибках
  getInvalidities: function() {
    return this.invalidities.join('. \n');
  },

  // Сбросим общий текст сообщений об ошибках
  resetInvalidity: function() {
    return this.invalidities.length = 0;
  }
};

// Добавляем обработчик клика на кнопку отправки формы

submitBtn.addEventListener('click', function() {
  // Пройдёмся по всем полям
  for (var i = 0; i < inputs.length; i++) {

    var input = inputs[i];

    // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()
    if (input.checkValidity() == false) {

      var inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
      inputCustomValidation.checkValidity(input); // Выявим ошибки
      var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
      input.setCustomValidity(customValidityMessage); // Установим специальное сообщение об ошибке
      inputCustomValidation.resetInvalidity(); // Сбрасываем текст сообщения об ошибке


    } // закончился if

  } // закончился цикл


});

var name = document.getElementById('input[name=name]');

var validate = function (input) {
if (input.length === 0) {
    input.setCustomValidity('Обязательное поле');
    return false;
} else {
    input.setCustomValidity('');
    return true;
}
};
validate(name);


/*// Добавим обработчик потери фокуса инпутом в форме

  // Пройдёмся по всем полям
  for (var i = 0; i < inputs.length; i++) {

    var input = inputs[i];
    input.addEventListener('blur', function () {

    // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()
    if (input.checkValidity() == false) {

      var inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
      inputCustomValidation.checkValidity(input); // Выявим ошибки
      var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
      input.setCustomValidity(customValidityMessage); // Установим специальное сообщение об ошибке
      var resetCustomValidity = inputCustomValidation.resetInvalidity();


    } // закончился if

  });
}*/


// Выбор способа доставки

var deliverCourier = document.querySelector('.deliver__courier');
var deliverStore = document.querySelector('.deliver__store');

// Функция, открывает заказ доставки курьером, дезактивирует радио инпуты со списком магазинов

var openDeliveryCourier = function () {
  deliverCourier.classList.remove('visually-hidden');
  deliverStore.classList.add('visually-hidden');
  setDisabledAttribute(deliverStore);
  removeDisabledAttribute(deliverCourier);
  deliverCourier.querySelector('.deliver__textarea').removeAttribute('disabled', 'disabled');
};

// Функция, открывает список магазинов, дезактивирует инпуты формы заказа

var openDeliveryStore = function () {
  deliverStore.classList.remove('visually-hidden');
  deliverCourier.classList.add('visually-hidden');
  setDisabledAttribute(deliverCourier);
  deliverCourier.querySelector('.deliver__textarea').setAttribute('disabled', 'disabled');
  removeDisabledAttribute(deliverStore);
};

// Блокируем поля для курьерской доставки при загрузке формы (так как Клавиша Заеду выбрана по умолчанию)

var deliverStoreInput = form.querySelector('input[value=store]');
if (deliverStoreInput.checked) {
  setDisabledAttribute(deliverCourier);
  deliverCourier.querySelector('.deliver__textarea').setAttribute('disabled', 'disabled');
}

// Обработчик с делегированием

document.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.id === 'deliver__courier') {
    openDeliveryCourier();
  }
  if (target.id === 'deliver__store') {
    openDeliveryStore();
  }
});

// Выбор станции метро для забора покупки с смена карты

var mapImg = document.querySelector('.deliver__store-map-img');
var mapAddress = document.querySelector('.deliver__store-describe');

document.querySelector('input[value=academicheskaya]').addEventListener('click', function () {
  mapImg.setAttribute('src', 'img/map/academicheskaya.jpg');
  mapImg.setAttribute('alt', 'Академическая');
  mapAddress.textContent = 'проспект Науки, д. 19, корп. 3, литер А, ТК «Платформа», 3-й этаж, секция 310';
});

document.querySelector('input[value=vasileostrovskaya]').addEventListener('click', function () {
  mapImg.setAttribute('src', 'img/map/vasileostrovskaya.jpg');
  mapImg.setAttribute('alt', 'Василеостровская');
  mapAddress.textContent = 'нет точного адреса';
});

document.querySelector('input[value=rechka]').addEventListener('click', function () {
  mapImg.setAttribute('src', 'img/map/rechka.jpg');
  mapImg.setAttribute('alt', 'Черная речка');
  mapAddress.textContent = 'нет точного адреса';
});

document.querySelector('input[value=petrogradskaya]').addEventListener('click', function () {
  mapImg.setAttribute('src', 'img/map/petrogradskaya.jpg');
  mapImg.setAttribute('alt', 'Петроградская');
  mapAddress.textContent = 'нет точного адреса';
});

document.querySelector('input[value=proletarskaya]').addEventListener('click', function () {
  mapImg.setAttribute('src', 'img/map/proletarskaya.jpg');
  mapImg.setAttribute('alt', 'Пролетарская');
  mapAddress.textContent = 'нет точного адреса';
});

document.querySelector('input[value=vostaniya]').addEventListener('click', function () {
  mapImg.setAttribute('src', 'img/map/vostaniya.jpg');
  mapImg.setAttribute('alt', 'Площадь Восстания');
  mapAddress.textContent = 'нет точного адреса';
});

document.querySelector('input[value=prosvesheniya]').addEventListener('click', function () {
  mapImg.setAttribute('src', 'img/map/prosvesheniya.jpg');
  mapImg.setAttribute('alt', 'Проспект Просвещения');
  mapAddress.textContent = 'нет точного адреса';
});

document.querySelector('input[value=frunzenskaya]').addEventListener('click', function () {
  mapImg.setAttribute('src', 'img/map/frunzenskaya.jpg');
  mapImg.setAttribute('alt', 'Фрунзенская');
  mapAddress.textContent = 'нет точного адреса';
});

document.querySelector('input[value=chernishevskaya]').addEventListener('click', function () {
  mapImg.setAttribute('src', 'img/map/chernishevskaya.jpg');
  mapImg.setAttribute('alt', 'Чернышевская');
  mapAddress.textContent = 'нет точного адреса';
});

document.querySelector('input[value=tehinstitute]').addEventListener('click', function () {
  mapImg.setAttribute('src', 'img/map/tehinstitute.jpg');
  mapImg.setAttribute('alt', 'Технологический институт');
  mapAddress.textContent = 'нет точного адреса';
});

// Перемещение ползунков фильтра

// Вешаем на каждый пин обработчик события
// Получаем от ивент таргет координаты: ху пина и


var range = document.querySelector('.range');
var rangeFilter = range.querySelector('.range__filter');
var rangeButtonLeft = rangeFilter.querySelector('.range__btn--left');
var rangeButtonRight = rangeFilter.querySelector('.range__btn--right');
var rangePriceMin = range.querySelector('.range__price--min');
var rangePriceMax = range.querySelector('.range__price--max');

var LEFT_START_POINT = 70;
var RANGE_FILTER_LENGTH = 245;

var getRangeProcent = function (dropCoords, rangePrice) {
  var pointOnFilter = dropCoords.x - LEFT_START_POINT;
  var procent = Math.round(pointOnFilter / RANGE_FILTER_LENGTH * 100);
  rangePrice.textContent = procent;
};

rangeButtonLeft.addEventListener('mouseup', function (evtUp) {
  var dropCoords = {
    x: evtUp.clientX,
    y: evtUp.clientY
  };

  getRangeProcent(dropCoords, rangePriceMin);
});

rangeButtonRight.addEventListener('mouseup', function (evtUp) {
  var dropCoords = {
    x: evtUp.clientX,
    y: evtUp.clientY
  };

  getRangeProcent(dropCoords, rangePriceMax);
});
