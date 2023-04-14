
/* 圆盘抽奖 */
$(".ico-lottery-btn").click(function () {
  $(".ico-lottery-btn").addClass('disable');
  var DEG = 360 / 6;
  var count = jtool.getRandom(0, 5);
  $(".jlottery-btn").rotate({
    angle: 0,
    animateTo: 360 * 8 + count * DEG - DEG / 2,
    duration: 3500,
    center: ["50%", "1.12rem"],
    callback: function () {
      $(".ico-lottery-btn").removeClass('disable');
      jtool.showTip({
        content: '<div class="tc"><div>恭喜您获得X积分</div><div>请前往【积分商城】兑换奖励</div></div>',
      });
    },
    step: function () {},
    easing: function (x, t, b, c, d) {
      return c * (t / d) + b;
    },
    getRotateAngle: function () {},
    stopRotate: function () {},
  });
});

/* 方形抽奖 */
$(".jlottery-btn").on("click", function () {
  $(".jlottery-btn").addClass('disable');
  var index = jtool.getRandom(0, 7);
  jtool.lottery(
    index,
    8,
    function (index) {
      $(".lottery-item").eq(index).addClass(jtool.activeCls).siblings().removeClass(jtool.activeCls);
    },
    function (index) {
      $(".lottery-item").eq(index).addClass(jtool.activeCls).siblings().removeClass(jtool.activeCls);
      jtool.showTip({ content: "<p>恭喜获得" + index + "</p>" });
      $(".jlottery-btn").removeClass('disable');
    }
  );
});

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