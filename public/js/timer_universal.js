$(function () {

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

  var intervals = {
    day: ['день', 'дня', 'дней'],
    hour: ['час', 'часа', 'часов'],
    minute: ['минута', 'минуты', 'минут'],
    second: ['секунда', 'секунды', 'секунд']
  };

  var async = function (u, c) {
    var d = document, t = 'script',
      o = d.createElement(t),
      s = d.getElementsByTagName(t)[0];
    o.src = u;
    if (c) { o.addEventListener('load', function (e) { c(null, e); }, false); }
    s.parentNode.insertBefore(o, s);
  };

  async('js/timer.js', function () {
    $('.idvd_timer.autostart').each(function () {
      var REDIRECT_URL = $(this).data('redirect_url');
      var DURATION_HOURS = $(this).data('duration_hours');

      var start_time = new Date().getTime();
      if (getCookie('start_time') != null) {
        start_time = parseInt(getCookie('start_time'));
      } else {
        setCookie('start_time', start_time, 365);
      }

      var end_time = start_time + DURATION_HOURS * 60 * 60 * 1000 - 1;

      if (end_time < new Date().getTime()) {
        end_time = new Date().getTime() + DURATION_HOURS * 60 * 60 * 1000 - 1;
      }

      $('.idvd_timer').countdown(end_time, function (event) {
        $(this).html(event.strftime(
          '<div class="tmr_el"><div class="tmr_el_val">%-D</div><div class="tmr_el_unit">' + intervals['day'][2] + '</div></div>' +
          '<div class="tmr_el"><div class="tmr_el_val">%-H</div><div class="tmr_el_unit">' + intervals['hour'][2] + '</div></div>' +
          '<div class="tmr_el"><div class="tmr_el_val">%-M</div><div class="tmr_el_unit">' + intervals['minute'][2] + '</div></div>' +
          '<div class="tmr_el"><div class="tmr_el_val">%-S</div><div class="tmr_el_unit">' + intervals['second'][2] + '</div></div>'
        ));
      }).on('finish.countdown', function () {
        setCookie('start_time', new Date().getTime(), 365);
      });
    });

  });


});