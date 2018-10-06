'use strict';
(function () {
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
    'gum-cedar.jpg',
    'gum-chile.jpg',
    'gum-eggplant.jpg',
    'gum-mustard.jpg',
    'gum-portwine.jpg',
    'gum-wasabi.jpg',
    'ice-cucumber.jpg',
    'ice-eggplant.jpg',
    'ice-garlic.jpg',
    'ice-italian.jpg',
    'ice-mushroom.jpg',
    'ice-pig.jpg',
    'marmalade-beer.jpg',
    'marmalade-caviar.jpg',
    'marmalade-corn.jpg',
    'marmalade-new-year.jpg',
    'marmalade-sour.jpg',
    'marshmallow-bacon.jpg',
    'marshmallow-beer.jpg',
    'marshmallow-shrimp.jpg',
    'marshmallow-spicy.jpg',
    'marshmallow-wine.jpg',
    'soda-bacon.jpg',
    'soda-celery.jpg',
    'soda-cob.jpg',
    'soda-garlic.jpg',
    'soda-peanut-grapes.jpg',
    'soda-russian.jpg'
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

  window.data = function (goodsQuantity) {
    var goodsList = [];
    for (var i = 0; i < goodsQuantity; i++) {
      goodsList[i] = {
        name: getRandomData(names),
        picture: getRandomData(pictures),
        amount: getRandomInt(0, 21),
        orderedAmount: 0,
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

  // Скрываем блок и текст Данные загружаются

  var catalogCards = document.querySelector('.catalog__cards');
  catalogCards.classList.remove('catalog__cards--load');
  var catalogLoad = document.querySelector('.catalog__load');
  catalogLoad.classList.add('visually-hidden');
})();
