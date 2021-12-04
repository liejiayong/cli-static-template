/*
 * Description:
 * version:
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-06-29 16:25:09
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2021-12-04 14:29:22
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
  /**
   * 判断数字类型
   * @param {number} number
   */
  isNumber: function (number) {
    return Object.prototype.toString.call(number).toLocaleLowerCase() === '[object number]';
  },
  /**
   // 抽奖
    $('.btn-lottery').on('click', function () {
      var index = jtool.getRandom(0, 11);
      jtool.lottery(
        index,
        12,
        function (index) {
          $('.lottery-item').eq(index).addClass(jtool.activeCls).siblings().removeClass(jtool.activeCls);
        },
        function (index) {
          $('.lottery-item').eq(index).addClass(jtool.activeCls).siblings().removeClass(jtool.activeCls);
          jtool.showTip('<p>恭喜获得' + index + '</p>');
        }
      );
    });
   * 正方形顺时针抽奖装盘
   * @param {number} index 当前元素索引
   * @param {number} total 元素总数
   * @param {Function} cbCurrent 实时回调
   * @param {Function} cbEnd 结束回调
   */
  lottery(index, total, cbCurrent, cbEnd) {
    if (!this.isNumber(index)) return new Error('the arguments of index must number!');
    if (typeof cbEnd !== 'function') return new Error('the arguments of cbEnd must function!');
    if (typeof cbCurrent !== 'function') return new Error('the arguments of cbCurrent must function!');
    var TYPE_SPEED = 0;
    var TYPE_ADD_SPEED = 20;
    var TYPE_LAST_SPEED = 500;
    var TYPE_MAX_INDEX = total;
    var currSpeed = 0;
    var totalIndex = 0;
    var currentIndex = 0;
    var animate = function () {
      var timer = setTimeout(function () {
        totalIndex += 1;
        currSpeed += TYPE_ADD_SPEED;
        if (currSpeed > TYPE_LAST_SPEED) {
          if (currentIndex === index) {
            clearTimeout(timer);
            cbEnd(currentIndex);
          } else {
            currentIndex = totalIndex % TYPE_MAX_INDEX;
            clearTimeout(timer);
            cbCurrent(currentIndex);
            animate();
          }
        } else {
          currentIndex = totalIndex % TYPE_MAX_INDEX;
          clearTimeout(timer);
          cbCurrent(currentIndex);
          animate();
        }
      }, TYPE_SPEED + currSpeed);
    };
    animate();
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
