'use strict';
(function () {

  // Выбор формы оплаты заказа
  // Переменные
  var form = document.querySelector('.form-order');
  var submitBtn = form.querySelector('.buy__submit-btn');
  var inputCard = form.querySelector('input[value=card]');
  var inputCash = form.querySelector('input[value=cash]');
  var paymentCardForm = form.querySelector('.payment__card-wrap');
  var paymentCashAlarm = form.querySelector('.payment__cash-wrap');
  var inputs = form.querySelectorAll('input');
  var floorNumber = form.querySelector('input[name=deliver-floor]');
  var cvcNumber = paymentCardForm.querySelector('input[name=card-cvc]');
  var cardDate = paymentCardForm.querySelector('input[name=card-date]');
  var emailValue = form.querySelector('input[name=email]');
  var cardNumderInput = paymentCardForm.querySelector('input[name=card-number]');
  var cardName = paymentCardForm.querySelector('input[name=cardholder]');
  var cardStatus = paymentCardForm.querySelector('.payment__card-status');

  // Модальное окно успешной отправки формы

  var modalSuccess = document.querySelector('.modal--success');
  var modalSuccessClose = modalSuccess.querySelector('.modal__close');

  // Функция, которая создает массив инпутов в форме и устанавливает им атрибуты disabled

  var setDisabledAttribute = function (form) {
    var inputsArrey = form.querySelectorAll('input');
    for (var i = 0; i < inputsArrey.length; i++) {
      inputsArrey[i].setAttribute('disabled', 'disabled');
    }
  };

  // Функция, которая создает массив инпутов в форме и удаляет им атрибуты disabled

  window.removeDisabledAttribute = function (form) {
    var inputsArrey = form.querySelectorAll('input');
    for (var i = 0; i < inputsArrey.length; i++) {
      inputsArrey[i].removeAttribute('disabled', 'disabled');
    }
  };

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
  // Если в корзине нет ни одного товара, форма оформления заказа блокируется

  var getFormBlocked = function () {
  var currentCartArrey = window.cart.querySelectorAll('.goods_card');
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

  var deliverStoreInput = form.querySelector('input[id=deliver__store]');

  // Обработчик с делегированием

  form.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.id === 'deliver__courier') {
      openDeliveryCourier();
    }
    if (target.id === 'deliver__store' || deliverStoreInput.checked) {
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
})();
