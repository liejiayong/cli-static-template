/**
 * 答题专题
 */

MatterController = function (opts) {
  this.total = opts.total || 0;
  this.collect = opts.collect || [];
  this.finish = opts.finish;
  this.isTimer = typeof opts.isTimer === 'undefined' ? MatterController.opts.isTimer : opts.isTimer;
  this.time = Object.assign(MatterController.opts.time, opts.time || {});
  this.duration = opts.duration === 0 ? 0 : opts.duration ? opts.duration : MatterController.opts.duration;
  this.play = false;
  this.timer = null;
  this.list = [];
  this.current = 0;
};
MatterController.prototype.start = function (callback) {
  this.reset(callback);
  // callback && callback();
};
MatterController.prototype.init = function (callback) {
  this.reset();
  callback && callback(this._callbackParams());
};
MatterController.prototype.initQA = function (callback) {
  callback && callback(this._callbackParams());
};
MatterController.prototype.next = function (callback) {
  var t = this;
  ++t.current;
  setTimeout(function () {
    if (t.current >= t.total) {
      t.finish && t.finish(t._callbackParams());
      return;
    }
    callback && callback(t._callbackParams());
  }, t.duration);
};
MatterController.prototype.stop = function (callback) {
  clearTimeout(this.timer);
  this.list = [];
  callback && callback();
};
MatterController.prototype.reset = function (callback) {
  this.time.current = this.time.order === 'dec' ? this.time.DEFAULT : 0;
  this.list = this._shuffle(this.collect).slice(0, this.total);
  this.current = 0;
  callback && callback(this._callbackParams());
};
MatterController.prototype._callbackParams = function () {
  return { current: this.current, list: this.list, time: this.time };
};
MatterController.prototype._getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
MatterController.prototype._shuffle = function (arr) {
  var _arr = arr.slice();
  for (var i = 0; i < _arr.length; i++) {
    var j = this._getRandom(0, i);
    var n = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = n;
  }
  return _arr;
};
MatterController.opts = {
  isTimer: false,
  time: { DEFAULT: 15, currrent: 0, order: 'dec' /* asc|dec */ },
  duration: 1500,
};

logic.extend({
  qaTimes: { DEFAULT: 5, current: 0 }, // 每天答题次数
  score: 0, // 答题答对次数
  day: 1, // 共答题三天，第一天为1
  initQa: function (curStatus) {
    var map = {
      0: '一',
      1: '二',
      2: '三',
      3: '四',
      4: '五',
    };
    var current = curStatus.current,
      curQa = curStatus.list[current];
    var tpl = '';
    curQa.content.forEach(function (item) {
      tpl += '<li data-click="false" class="cell">' + item.label + '.' + item.value + '</li>';
    });
    $('#qaTit').text(curQa.title);
    $('#qaNum').text(map[current]);
    $('#qaContent').html(tpl);
    $('#qaContainer').addClass('active');
    setTimeout(function () {
      $('#qaContainer').removeClass('active');
    }, 400);
  },
  resetQa: function () {
    var self = this;

    $('.qa-ready').hide();
    $('.qa-wrapper').show();
    var qaController = new MatterController({
      total: 5,
      collect: qalist.slice((self.day - 1) * 5, self.day * 5),
      finish: logic.gameResult,
    });
    qaController.init(function (param) {
      self.initQa(param);
    });
    self.qaController = qaController;
    self.score = 0;
  },
  loadGame: function (opts) {
    var self = this;
    if (self.qaTimes.current >= self.qaTimes.DEFAULT) {
      return;
    }

    self.qaTimes++;

    var count = (opts && opts.count) || 3,
      onReady = (opts && opts.onReady) || function () {},
      $popReady = $('#J_gameReadyPop'),
      $count = $popReady.find('#gameReadyCount');
    $popReady.fadeIn();
    $count.text(count);

    self.resetQa();

    var timer = setInterval(function () {
      --count;
      if (count === 0) {
        $count.text('GO!');
        $popReady.fadeOut();
        clearInterval(timer);
        setTimeout(function () {
          onReady();
        }, 100);
      } else {
        $count.text(count);
      }
    }, 1000);
  },
});
