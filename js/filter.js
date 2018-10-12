'use strict';
(function () {
  // Перемещение ползунков фильтра

  var range = document.querySelector('.range');
  var rangeFilter = range.querySelector('.range__filter');
  var rangeButtonLeft = rangeFilter.querySelector('.range__btn--left');
  var rangeButtonRight = rangeFilter.querySelector('.range__btn--right');
  var rangePriceMin = range.querySelector('.range__price--min');
  var rangePriceMax = range.querySelector('.range__price--max');
  var rangeFillLine = range.querySelector('.range__fill-line');

  rangeButtonLeft.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var shiftX = evt.clientX - rangeButtonLeft.getBoundingClientRect().left;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    function onMouseMove(evtMove) {
      var newLeft = evtMove.clientX - shiftX - rangeFilter.getBoundingClientRect().left;

      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = rangeButtonRight.offsetLeft - rangeButtonRight.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      rangeButtonLeft.style.left = newLeft + 'px';

      rangeFillLine.style.left = newLeft + 'px';

      var getRangeProcent = function (newSide, rangePrice) {
        var procent = Math.round(newSide / rangeFilter.offsetWidth * 100);
        rangePrice.textContent = procent;
      };

      getRangeProcent(newLeft, rangePriceMin);

    }

    function onMouseUp(evtUp) {

      var dropX = evtUp.clientX - shiftX - rangeFilter.getBoundingClientRect().left;
      if (dropX < 0) {
        dropX = 0;
      }

      var rightEdge = rangeButtonRight.offsetLeft - rangeButtonRight.offsetWidth;

      if (dropX > rightEdge) {
        dropX = rightEdge;
      }

      var getRangeProcent = function (newSide, rangePrice) {
        var procent = Math.round(newSide / rangeFilter.offsetWidth * 100);
        rangePrice.textContent = procent;
      };

      getRangeProcent(dropX, rangePriceMin);

      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  });

  rangeButtonLeft.ondragstart = function () {
    return false;
  };

  rangeButtonRight.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var shiftX = rangeButtonRight.getBoundingClientRect().right - evt.clientX;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(evtMove) {

      var newRight = evtMove.clientX + shiftX - rangeFilter.getBoundingClientRect().left;

      if (newRight < rangeButtonLeft.getBoundingClientRect().right - rangeFilter.getBoundingClientRect().left) {
        newRight = rangeButtonLeft.getBoundingClientRect().right - rangeFilter.getBoundingClientRect().left;
      }

      var leftEdge = rangeFilter.offsetWidth - rangeButtonRight.offsetWidth;

      if (newRight > leftEdge) {
        newRight = leftEdge;
      }

      rangeButtonRight.style.left = newRight + 'px';

      rangeFillLine.style.right = (rangeFilter.offsetWidth - newRight) + 'px';

      var getRangeProcent = function (newSide, rangePrice) {
        var procent = Math.round(newSide / (rangeFilter.offsetWidth - rangeButtonRight.offsetWidth) * 100);
        rangePrice.textContent = procent;
      };

      getRangeProcent(newRight, rangePriceMax);

    }

    function onMouseUp(evtUp) {

      var dropX = evtUp.clientX + shiftX - rangeFilter.getBoundingClientRect().left;
      if (dropX < rangeButtonLeft.getBoundingClientRect().right - rangeFilter.getBoundingClientRect().left) {
        dropX = rangeButtonLeft.getBoundingClientRect().right - rangeFilter.getBoundingClientRect().left;
      }

      var leftEdge = rangeFilter.offsetWidth - rangeButtonRight.offsetWidth;

      if (dropX > leftEdge) {
        dropX = leftEdge;
      }

      var getRangeProcent = function (newSide, rangePrice) {
        var procent = Math.round(newSide / (rangeFilter.offsetWidth - rangeButtonRight.offsetWidth) * 100);
        rangePrice.textContent = procent;
      };

      getRangeProcent(dropX, rangePriceMax);

      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }

  });

  rangeButtonRight.ondragstart = function () {
    return false;
  };
})();
