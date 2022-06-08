// var DEG = 360 / 12;
// $('.jlottery-btn').rotate({
//   bind: {
//     click: function () {
//       $('.jlottery-btn').addClass(jtool.disableCls);
//       var count = 1;
//       // $.post('/act.php',{},function(){
//       $('.ico-lottery-panel').rotate({
//         angle: 0,
//         animateTo: 360 * 8 + (count - 1) * DEG,
//         duration: 3500,
//         center: ['50%', '50%'],
//         callback: function () {
//           $('.jlottery-btn').removeClass(jtool.disableCls);
//           jtool.showTip({
//             content: '<div class="tc"><div>xxx领取成功</div></div>',
//           });
//         },
//         step: function () {},
//         easing: function (x, t, b, c, d) {
//           return c * (t / d) + b;
//         },
//         getRotateAngle: function () {},
//         stopRotate: function () {},
//       });
//       // },'json');
//     },
//   },
// });

// /* 方形抽奖 */
// $('.jlottery-btn').on('click', function () {
//   var index = jtool.getRandom(0, 11);
//   jtool.lottery(
//     index,
//     12,
//     function (index) {
//       $('.lottery-item').eq(index).addClass(jtool.activeCls).siblings().removeClass(jtool.activeCls);
//     },
//     function (index) {
//       $('.lottery-item').eq(index).addClass(jtool.activeCls).siblings().removeClass(jtool.activeCls);
//       jtool.showTip({ content: '<p>恭喜获得' + index + '</p>' });
//     }
//   );
// });

jtool = {
  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  /**
   // 抽奖
    $('.jlottery-btn').on('click', function () {
      var index = jtool.getRandom(0, 11);
      jtool.lottery(
        index,
        12,
        function (index) {
          $('.lottery-item').eq(index).addClass(jtool.activeCls).siblings().removeClass(jtool.activeCls);
        },
        function (index) {
          $('.lottery-item').eq(index).addClass(jtool.activeCls).siblings().removeClass(jtool.activeCls);
          jtool.showTip({ content: '<p>恭喜获得' + index + '</p>' });
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
    /**
     * 判断数字类型
     * @param {number} number
     */
    function isNumber(number) {
      return Object.prototype.toString.call(number).toLocaleLowerCase() === '[object number]';
    }
    if (!isNumber(index)) return new Error('the arguments of index must number!');
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
};
