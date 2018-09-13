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
//catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = document.querySelector('.catalog__load');
//catalogLoad.classList.add('visually-hidden');

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

var emptyCart = document.querySelector('.goods__card-empty');
//emptyCart.classList.add('visually-hidden');


