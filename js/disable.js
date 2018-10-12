'use strict';

(function () {
  // Функция, которая создает массив инпутов в форме и удаляет им атрибуты disabled

  window.removeDisabledAttribute = function (form) {
    var inputsArrey = form.querySelectorAll('input');
    for (var i = 0; i < inputsArrey.length; i++) {
      inputsArrey[i].removeAttribute('disabled', 'disabled');
    }
  };

})();
