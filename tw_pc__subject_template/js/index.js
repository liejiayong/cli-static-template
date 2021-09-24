/*
 * Description:
 * version:
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-06-29 16:25:09
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2021-09-24 15:52:17
 */
var jtool = {
  disableCls: 'disable',
  activeCls: 'active',
  showTip: function (html, cls) {
    cls = cls || '#popTipNorm';
    var $tip = $('#J_tipPop');
    $tip.find(cls).html(html);
    $tip.fadeIn();
  },
  throttle: function throttle(fn, threshhold) {
    var timer = null;
    var start = Date.now();
    return function () {
      var context = this,
        arg = arguments,
        curr = Date.now();
      if (timer) clearTimeout(timer);
      if (curr - start >= threshhold) {
        fn.apply(context, arg);
        start = curr;
      } else {
        timer = setTimeout(function () {
          fn.apply(context, arg);
        }, threshhold);
      }
    };
  },
  preStyle: function preStyle(style) {
    var el = document.createElement('div');

    var vendor = (function () {
      var transformName = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform',
      };
      for (var key in transformName) {
        if (el[key] !== 'undefined') {
          return key;
        }
      }
      return false;
    })();

    if (vendor === false) {
      return false;
    }

    if (vendor === 'standard') {
      return style;
    }
    return '-' + vendor.toLowerCase() + '-' + style.toLowerCase();
  },
  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  // extend: function extend(def, nw) {
  //   for (var key in nw) {
  //     if (def[key] && nw.hasOwnProperty(key)) {
  //       def[key] = nw[key];
  //     }
  //   }
  //   return def;
  // },
  // /**
  //  * 骰子点数动画
  //  * @param {*} count 最后点数
  //  */
  // diss: function (count, cb, duration) {
  //   duration = duration || 800;
  //   var $diss = $('.btn-dot-i'),
  //     self = this;
  //   var ra, fn;
  //   fn = function () {
  //     ra = requestAnimationFrame(function () {
  //       $diss.attr('class', 'jy-btn btn-dot-i i-dot-' + self.getRandom(1, 6));
  //       fn();
  //     });
  //   };
  //   fn();
  //   setTimeout(function () {
  //     cancelAnimationFrame(ra);
  //     $diss.attr('class', 'jy-btn btn-dot-i i-dot-' + count);
  //     setTimeout(function () {
  //       cb();
  //     }, 100);
  //   }, duration);
  // },
};

// function SmoothSwing(el, range) {
//   this.el = document.querySelector(el) || null;
//   this.preX = 0;
//   this.preY = 0;
//   this.nextX = 0;
//   this.nextY = 0;
//   this.curX = 0;
//   this.curY = 0;
//   this.range = range;
// }
// SmoothSwing.prototype.setPosition = function (pos) {
//   this.nextX = pos.x;
//   this.nextY = pos.y;
//   var curX,
//     curY,
//     range = this.range;
//   curX = this.nextX - this.preX;
//   curX = curX > 0 ? range[1] : range[0];
//   curY = this.nextY - this.preY;
//   curY = curY > 0 ? range[1] : range[0];
//   this.curX = curX;
//   this.curY = curY;
//   this.preX = pos.x;
//   this.preY = pos.y;
// };
// SmoothSwing.prototype.listen = function (cb) {
//   var ever = document.body || document.documentElement,
//     t = this;
//   ever.addEventListener('mousemove', function (e) {
//     t.setPosition({ x: e.clientX, y: e.clientY });
//     var x = t.curX,
//       y = t.curY;
//     t.el.style.cssText = '-webkit-transition: all .2s;transition: all .2s;-webkit-transform:translate(' + x + 'px, ' + y + 'px)' + ';transform:translate(' + x + 'px, ' + y + 'px)';
//     console.log();
//   });
//   this.ever = ever;
// };
// SmoothSwing.prototype.remove = function (cb) {
//   this.ever.removeEventListener('mousemove', cb);
//   this.ever = null;
// };
// // 使用前需要将元素设置固定定位
// var smoothSwing = new SmoothSwing('.c-logo', [-10, 10]);
// smoothSwing.listen();
