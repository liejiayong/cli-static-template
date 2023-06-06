/**
 * 业务计时器
 * @param {object} opts
install = new TimerController({
  stopTime: 0,
  DEFAULT_TIME: 20,
  step: function (install) {
    console.log('TimerController eachTime')
  },
  stop: function () {
    console.log('TimerController stop')
  },
  finish: function() {
    console.log('TimerController finish')
  }
});
install.start(function () {
  console.log('TimerController start')
});
 */
function TimerController(opts) {
  this.current = 0; /* 动态初始时间, 单位：秒 */
  this.finish = opts.stopTime || 0; /* 结束时间 单位：秒 */
  this.DEFAULT_TIME = opts.DEFAULT_TIME || 20; /* 初始时间 单位：秒 */
  this.duration = opts.duration || 1000; /* 定时器相隔时长 */
  this.timer = null;

  this.stepCallback = opts.step || function stepCallback() {};
  this.stopCallBack = opts.stop || function stopCallBack() {};
  this.finishCallBack = opts.finish || function finishCallBack() {};
}
TimerController.prototype.start = function (callback) {
  var _this = this;
  callback && callback(_this);

  _this.current = _this.DEFAULT_TIME;
  _this.stepCallback(_this);
  _this._runCounter();
};
TimerController.prototype.restart = function (callback) {
  var _this = this;
  callback && callback(_this);
  _this.stepCallback(_this);

  _this._runCounter();
};
TimerController.prototype.stop = function () {
  var _this = this;
  clearTimeout(_this.timer);

  _this.stopCallBack();
};
TimerController.prototype._calTimer = function (current) {
  var _this = this;
  if (_this.finish > _this.DEFAULT_TIME) {
    return current + 1;
  } else {
    return current - 1;
  }
};
TimerController.prototype._runCounter = function () {
  var _this = this;
  _this.current = _this._calTimer(_this.current);
  _this.timer = setTimeout(function () {
    _this.stepCallback(_this);

    if (_this.current == _this.finish) {
      clearTimeout(_this.timer);
      _this.finishCallBack(_this);
      return;
    }

    _this._runCounter();
  }, _this.duration);
};
