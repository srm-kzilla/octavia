// random shuffle

(function myshuffle($) {
  $.fn.shuffleLetters = function (prop) {
    var options = $.extend(
      {
        step: 10,
        fps: 20,
        text: '',
      },
      prop,
    );
    return this.each(function () {
      var el = $(this),
        str = '';
      el.data('animated', true);

      if (options.text) {
        str = options.text.split('');
      } else {
        str = el.text().split('');
      }

      var types = [],
        letters = [];

      for (var i = 0; i < str.length; i++) {
        var ch = str[i];

        if (ch == ' ') {
          types[i] = 'space';
          continue;
        } else if (/[a-z]/.test(ch)) {
          types[i] = 'lowerLetter';
        } else if (/[A-Z]/.test(ch)) {
          types[i] = 'upperLetter';
        } else {
          types[i] = 'symbol';
        }

        letters.push(i);
      }

      el.html('');

      (function shuffle(start) {
        var i,
          len = letters.length,
          strCopy = str.slice(0);

        if (start > len) {
          el.data('animated', false);
          return;
        }

        for (i = Math.max(start, 0); i < len; i++) {
          if (i < start + options.step) {
            strCopy[letters[i]] = randomChar(types[letters[i]]);
          } else {
            strCopy[letters[i]] = '';
          }
        }

        el.text(strCopy.join(''));

        setTimeout(function () {
          shuffle(start + 1);
        }, 1000 / options.fps);
      })(-options.step);
    });
  };

  function randomChar(type) {
    var pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.?/\\(^)![]{}*&^%$#\'"';
    var arr = pool.split('');
    return arr[Math.floor(Math.random() * arr.length)];
  }
})(jQuery);
