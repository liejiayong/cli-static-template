/**
 * 业务计时器
 * @param {object} opts
install = new TimerController({
  stopTime: 0,
  DEFAULT_TIME: 20,
  eachTime: function (install) {
    console.log('TimerController eachTime')
  },
  stop: function () {
    console.log('TimerController stop')
  },
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

  this.eachTimeCallBack = opts.eachTime || function eachTimeCallBack() {};
  this.stopCallBack = opts.stop || function stop() {};
}
TimerController.prototype.start = function (callback) {
  callback && callback(self);

  this.current = this.DEFAULT_TIME;
  this._runCounter();
};
TimerController.prototype.stop = function () {
  clearTimeout(this.timer);
};
TimerController.prototype._calTimer = function (current) {
  if (this.finish > this.DEFAULT_TIME) {
    return current + 1;
  } else {
    return current - 1;
  }
};
TimerController.prototype._runCounter = function () {
  var self = this;
  self.current = self._calTimer(self.current);
  self.timer = setTimeout(function () {
    self.eachTimeCallBack(self);

    if (self.current == self.finish) {
      clearTimeout(self.timer);
      self.stopCallBack(self);
      return;
    }

    self._runCounter();
  }, self.duration);
};
