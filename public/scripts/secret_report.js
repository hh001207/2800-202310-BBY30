document.addEventListener('DOMContentLoaded', function () {
  var reportButton = document.getElementById('reportButton');
  var pressTimer;

  reportButton.addEventListener('click', function () {
    window.location.href = '/report';
  });

  reportButton.addEventListener('mousedown', function () {
    pressTimer = window.setTimeout(function () {
      window.location.href = '/secret_report';
    }, 1000);
  });

  reportButton.addEventListener('mouseup', function () {
    clearTimeout(pressTimer);
  });

  reportButton.addEventListener('mouseleave', function () {
    clearTimeout(pressTimer);
  });

  reportButton.addEventListener('touchstart', function () {
    pressTimer = window.setTimeout(function () {
      window.location.href = '/secret_report';
    }, 1000);
  });

  reportButton.addEventListener('touchend', function () {
    clearTimeout(pressTimer);
  });

  reportButton.addEventListener('touchcancel', function () {
    clearTimeout(pressTimer);
  });
});
