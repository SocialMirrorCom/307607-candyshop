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

    for (var i = 0; i < inputsArrey.length; i++) {
      if (!inputsArrey[i].disabled) {
        inputsArrey[i].setAttribute('disabled', 'disabled');
      }
    }
  };
})();
