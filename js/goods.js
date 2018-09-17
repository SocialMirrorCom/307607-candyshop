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

/*var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');*/

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

//catalogCardsContainer.appendChild(fragment);

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

  return cardElement;
};

// Создаем фрагмент

var fragment2 = document.createDocumentFragment();

// Вставляем во фрагмент элементы

for (var j = 0; j < goodsInCart.length; j++) {
  fragment2.appendChild(renderCardInCart(goodsInCart[j]));
}

// Вставляем фрагмент

//cart.appendChild(fragment2);

//cart.classList.remove('goods__cards--empty');

/*var emptyCart = document.querySelector('.goods__card-empty');
emptyCart.classList.add('visually-hidden');*/



var nameInput = document.querySelector('input[name=name]');

nameInput.addEventListener('invalid', function () {
  if (nameInput.validity.valueMissing) {
    nameInput.setCustomValidity('Обязательное поле');
  } else {
    nameInput.setCustomValidity('');
  }
});


var telInput = document.querySelector('input[name=tel]');

telInput.addEventListener('invalid', function () {
  if (telInput.validity.valueMissing) {
    telInput.setCustomValidity('Обязательное поле');
  } else {
    telInput.setCustomValidity('');
  }
});

var emailInput = document.querySelector('input[name=email]');

emailInput.addEventListener('invalid', function () {
  if (emailInput.validity.patternMismatch) {
    emailInput.setCustomValidity('Пожалуйста введите электронный адрес по образцу inanov@mail.ru');
  } else {
    emailInput.setCustomValidity('');
  }
});


// Выбор формы оплаты заказа

var inputCard = document.querySelector('input[value=card]');
var inputCash = document.querySelector('input[value=cash]');
var paymentCardForm = document.querySelector('.payment__card-wrap');
var paymentCashAlarm = document.querySelector('.payment__cash-wrap');

// Если выбрана оплата наличными, то скрываем форму для внесения данных карты и блокируем ее, чтобы данные не отправлялись на сервер
// Открывает предупреждение

inputCash.addEventListener('click', function () {
  paymentCashAlarm.classList.remove('visually-hidden');
  paymentCardForm.classList.add('visually-hidden');
  paymentCardForm.querySelectorAll('input[name=card-number]').setAttribute('disabled', 'disabled');
  paymentCardForm.querySelectorAll('#payment__card-date').setAttribute('disabled', 'disabled');
  paymentCardForm.querySelectorAll('#payment__card-cvc').setAttribute('disabled', 'disabled');
  paymentCardForm.querySelectorAll('#payment__cardholder').setAttribute('disabled', 'disabled');
});

// Если выбрана оплата картой, то показываем форму внесения номера карты

inputCard.addEventListener('click', function () {
  paymentCashAlarm.classList.add('visually-hidden');
  paymentCardForm.classList.remove('visually-hidden');
});


var cardNumderInput = paymentCardForm.querySelector('input[name=card-number]');

// Получаем номер карты

var cardNumberValue = cardNumderInput.value;

// Алгоритм Луна для обработки введенных данных карты

var luhn = function (cardNumberValue) {
    var arr = cardNumberValue.split('').map(function(char, index) {
        var digit = parseInt(char);

        if ((index + cardNumberValue.length) % 2 === 0) {
            var digitX2 = digit * 2;

            return digitX2 > 9 ? digitX2 - 9 : digitX2;
        }

        return digit;
    });

    return !(arr.reduce(function (a, b) { return a + b }, 0) % 10);
};

// Кастомизируем события в случае некорректно введенных данных

cardNumderInput.addEventListener('invalid', function () {
  if (cardNumderInput.validity.tooShort) {
    cardNumderInput.setCustomValidity('Номер карты должен состоять из 16-ти цифр.');
  } else if (cardNumderInput.validity.tooLong) {
    cardNumderInput.setCustomValidity('Номер карты должен состоять из 16-ти цифр.');
  } else if (cardNumderInput.validity.valueMissing) {
    cardNumderInput.setCustomValidity('Обязательное поле');
  } else if (cardNumderInput.validity.patternMismatch) {
    cardNumderInput.setCustomValidity('Номер карты должен состоять из 16-ти цифр, введенных без пробела.');
  } else {
    cardNumderInput.setCustomValidity('');
  }
});

// Без понятия что тут делаем и зачем, узнать

cardNumderInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 16) {
    target.setCustomValidity('Номер карты должен состоять из 16-ти цифр.');
  } else {
    target.setCustomValidity('');
  }
});

var cardDateInput = paymentCardForm.querySelector('#payment__card-date');

// Кастомизируем события в случае некорректно введенных данных

cardDateInput.addEventListener('invalid', function () {
  if (cardDateInput.validity.tooShort) {
    cardDateInput.setCustomValidity('Введите пожалуйста месяц и год окончания действия карты по образцу.');
  } else if (cardDateInput.validity.tooLong) {
    cardDateInput.setCustomValidity('Введите пожалуйста месяц и год окончания действия карты по образцу.');
  } else if (cardDateInput.validity.valueMissing) {
    cardDateInput.setCustomValidity('Обязательное поле');
  } else if (cardDateInput.validity.patternMismatch) {
    cardDateInput.setCustomValidity('Введите пожалуйста месяц и год окончания действия карты по образцу.');
  } else {
    cardDateInput.setCustomValidity('');
  }
});

// Без понятия что тут делаем и зачем, узнать

cardDateInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 5) {
    target.setCustomValidity('Введите пожалуйста месяц и год окончания действия карты по образцу.');
  } else {
    target.setCustomValidity('');
  }
});

var cardCvcInput = paymentCardForm.querySelector('#payment__card-cvc');

// Кастомизируем события в случае некорректно введенных данных

cardCvcInput.addEventListener('invalid', function () {
  if (cardCvcInput.validity.tooShort) {
    cardCvcInput.setCustomValidity('Введите пожалуйста CVC номер вашей карты - 3 цифры.');
  } else if (cardCvcInput.validity.tooLong) {
    cardCvcInput.setCustomValidity('Введите пожалуйста CVC номер вашей карты - 3 цифры.');
  } else if (cardCvcInput.validity.valueMissing) {
    cardCvcInput.setCustomValidity('Обязательное поле');
  } else if (cardCvcInput.validity.patternMismatch) {
    cardCvcInput.setCustomValidity('Введите пожалуйста CVC номер вашей карты - 3 цифры.');
  } else {
    cardCvcInput.setCustomValidity('');
  }
});

// Без понятия что тут делаем и зачем, узнать

cardCvcInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 3) {
    target.setCustomValidity('Введите пожалуйста CVC номер вашей карты - 3 цифры.');
  } else {
    target.setCustomValidity('');
  }
});

var cardHolderInput = paymentCardForm.querySelector('#payment__cardholder');

// Кастомизируем события в случае некорректно введенных данных

cardHolderInput.addEventListener('invalid', function () {
  if (cardHolderInput.validity.tooShort) {
    cardHolderInput.setCustomValidity('Введите пожалуйста ваше имя и фамилию в том виде, как они указаны на карте.');
  } else if (cardHolderInput.validity.tooLong) {
    cardHolderInput.setCustomValidity('Введите пожалуйста ваше имя и фамилию в том виде, как они указаны на карте.');
  } else if (cardHolderInput.validity.valueMissing) {
    cardHolderInput.setCustomValidity('Обязательное поле');
  } else {
    cardHolderInput.setCustomValidity('');
  }
});

// Без понятия что тут делаем и зачем, узнать

cardHolderInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 35) {
    target.setCustomValidity('Введите пожалуйста ваше имя и фамилию в том виде, как они указаны на карте.');
  } else {
    target.setCustomValidity('');
  }
});

var cardStatus = paymentCardForm.querySelector('.payment__card-status');



if (cardNumderInput.checkValidity() && cardDateInput.checkValidity() && cardCvcInput.checkValidity() && cardHolderInput.checkValidity()) {
  cardStatus.textContent = 'Одобрен';
} else {
  cardStatus.textContent = 'Не определен';
}


/*function CustomValidation() { } luhn(cardNumberValue) &&

CustomValidation.prototype = {
  // Установим пустой массив сообщений об ошибках
  invalidities: [],

  // Метод, проверяющий валидность
  checkValidity: function(input) {

    var validity = input.validity;

    if (validity.patternMismatch) {
      this.addInvalidity('Пожалуйста заполните ячейку согласно образцу.');
    }

    if (validity.rangeOverflow) {
      var max = getAttributeValue(input, 'max');
      this.addInvalidity('Максимальное количество знаков ' + max);
    }

    if (validity.rangeUnderflow) {
      var min = getAttributeValue(input, 'min');
      this.addInvalidity('Минимальное количество знаков ' + min);
    }

    if (validity.valueMissing) {
      //var step = getAttributeValue(input, 'step');
      this.addInvalidity('Обязательное поле');
    }
  },

  // Добавляем сообщение об ошибке в массив ошибок
  addInvalidity: function(message) {
    this.invalidities.push(message);
  },

  // Получаем общий текст сообщений об ошибках
  getInvalidities: function() {
    return this.invalidities.join('. \n');
  }
};

// Добавляем обработчик клика на кнопку отправки формы

submit.addEventListener('click', function(e) {

   //var inputs = document.querySelectorAll('input[type=text]');
  // Пройдёмся по всем полям
  for (var i = 0; i < inputs.length; i++) {

    var input = inputs[i];

    // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()
    if (input.checkValidity() == false) {

      var inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
      inputCustomValidation.checkValidity(input); // Выявим ошибки
      var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
      input.setCustomValidity(customValidityMessage); // Установим специальное сообщение об ошибке

    } // закончился if
  } // закончился цикл
});*/


// Выбор способа доставки

var inputDeliverCourier = document.querySelector('input[value=courier]');
var inputDeliverStore = document.querySelector('input[value=store]');
var deliverCourier = document.querySelector('.deliver__courier');
var deliverStore = document.querySelector('.deliver__store');

// Если выбрана доставка курьером, то открывается форма для заполнения адреса

inputDeliverCourier.addEventListener('click', function () {
  deliverCourier.classList.remove('visually-hidden');
  deliverStore.classList.add('visually-hidden');
});

// Если выбран самостоятельный забор, то открывается форма выбора станции метро, а форма для заполнения адреса получает статус не активная.

inputDeliverStore.addEventListener('click', function () {
  deliverCourier.classList.add('visually-hidden');
  deliverStore.classList.remove('visually-hidden');
  //deliverCourier.querySelectorAll('input[type=radio]').setAttribute('disabled', 'disabled');
});

// Выбор станции метро для забора покупки с смена карты

// Массив с ссылками на изображение карты

var mapsImages = [
  'img/map/academicheskaya.jpg',
  'img/map/chernishevskaya.jpg',
  'img/map/frunzenskaya.jpg',
  'img/map/petrogradskaya.jpg',
  'img/map/proletarskaya.jpg',
  'img/map/prosvesheniya.jpg',
  'img/map/rechka.jpg',
  'img/map/tehinstitute.jpg',
  'img/map/vasileostrovskaya.jpg',
  'img/map/vostaniya.jpg'
];

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

var streetInput = document.querySelector('input[name=deliver-street]');

streetInput.addEventListener('invalid', function () {
  if (streetInput.validity.valueMissing) {
    streetInput.setCustomValidity('Обязательное поле');
  } else {
    streetInput.setCustomValidity('');
  }
});

var houseInput = document.querySelector('input[name=deliver-house]');

houseInput.addEventListener('invalid', function () {
  if (houseInput.validity.valueMissing) {
    houseInput.setCustomValidity('Обязательное поле');
  } else {
    houseInput.setCustomValidity('');
  }
});

var roomInput = document.querySelector('input[name=deliver-room]');

roomInput.addEventListener('invalid', function () {
  if (roomInput.validity.valueMissing) {
    roomInput.setCustomValidity('Обязательное поле');
  } else {
    roomInput.setCustomValidity('');
  }
});

var floorInput = document.querySelector('input[name=deliver-floor]');

floorInput.addEventListener('invalid', function () {
  if (floorInput.validity.patternMismatch) {
    floorInput.setCustomValidity('Пожалуйста введите число');
  } else {
    floorInput.setCustomValidity('');
  }
});






