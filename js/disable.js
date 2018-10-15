'use strict';

(function () {
  // Функция, которая создает массив инпутов в форме и удаляет им атрибуты disabled

  window.removeDisabledAttribute = function (form) {
    var inputsArrey = form.querySelectorAll('input');
    for (var i = 0; i < inputsArrey.length; i++) {
      inputsArrey[i].removeAttribute('disabled', 'disabled');
    }
  };

  // Функция, которая создает массив инпутов в форме и устанавливает им атрибуты disabled

  window.setDisabledAttribute = function (form) {
    var inputsArrey = form.querySelectorAll('input');
    console.log(inputsArrey);
    for (var i = 0; i < inputsArrey.length; i++) {
      inputsArrey[i].setAttribute('disabled', 'disabled');
      console.log(inputsArrey[i]);
    }
  };

  // Если в корзине нет ни одного товара, форма оформления заказа блокируется

  window.getFormBlocked = function () {
    var cart = document.querySelector('.goods__cards');
    var currentCartArrey = cart.querySelectorAll('.goods_card');
    if (currentCartArrey.length === 0) {
      window.setDisabledAttribute(formOrder);
      submitBtn.setAttribute('disabled', 'disabled');
    }
  };

})();
