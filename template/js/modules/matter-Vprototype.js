/**
 * 答题专题
 */

MatterController = function (opts) {
  this.total = opts.total || 0;
  this.collect = opts.collect || [];
  this.finish = opts.finish;
  this.isTimer = typeof opts.isTimer === 'undefined' ? MatterController.opts.isTimer : opts.isTimer;
  this.time = Object.assign(MatterController.opts.time, opts.time || {});
  this.duration = opts.duration || MatterController.opts.duration;
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
  }, this.duration);
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
    tpl += '<div class="ico-qa-tit qanum"> 第' + map[current] + '题</div>';
    tpl += '<div class="qatit">' + curQa.title + '？</div>';
    tpl += '<ul class="qacho">';
    curQa.content.forEach(function (item) {
      tpl += '<li data-click="false" class="">' + item.label + '.' + item.value + '</li>';
    });
    tpl + '</ul>';
    $('#qaPanel').html(tpl).addClass('active');
    $('#qaSuc').text(logic.qaNum);
    setTimeout(function () {
      $('#qaPanel').removeClass('active');
    }, 400);
  },
  loadGame: function () {
    if (this.run()) {
      return;
    }

    var t = this,
      count = t.time.ready,
      $popReady = $('#J_gameReadyPop'),
      $count = $popReady.find('#gameReadyCount');
    $popReady.fadeIn();
    $count.text(count);

    $('.start-panel').hide();
    var qaController = new MatterController({ total: 5, collect: qalist, finish: logic.gameResult });
    qaController.init(function (param) {
      t.initQa(param);
    });
    this.qaController = qaController;
    $('#qaPanel').show();

    var time = setInterval(function () {
      --count;
      if (count == -1) {
        clearInterval(time);
        return;
      } else if (count == 0) {
        $count.text('GO!');
        $popReady.fadeOut();
      } else {
        $count.text(count);
      }
    }, 1000);
  },
});
