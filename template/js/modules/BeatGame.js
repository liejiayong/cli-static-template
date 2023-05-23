/**
 * 打动物消除类游戏
 * @param {object} opts
var beatGame = new BeatGame({ mainClass: '.tigerls', eachTime: function () {} });
logic.hillInstall = new TimerController({
  stopTime: 0,
  DEFAULT_TIME: 20,
  eachTime: function (install) {
    beatGame.setTime(install.current);
    $('.sec2 .countdown span').text(install.current + 's');
  },
  stop: function () {
    beatGame.stop();
    logic.beatResult();
  },
});
logic.hillInstall.start(function () {
  beatGame.start();
});
logic.hillInstall.beatGame = beatGame;
 */
function BeatGame(opts) {
  this.timer = null;
  this.playing = false;
  this.clickCount = 0; /* 砸开数量 */

  this.mainCls = opts.mainClass || "";
  this.activeCls = opts.activeCls || "active";

  this.curSpeed = 0; /* 当前展示间隔速度，单位 ms */
  this.SPEED = opts.speed || 1500; /* 展示间隔速度，单位 ms */
  this.duration = opts.duration || 700; /* 展示时长，单位 ms */
  this.curTime = this.totalTime = opts.totalTime || 20; /* 游戏总时长，单位 秒 */

  this.list = (Array.prototype.slice.call(document.querySelectorAll(this.mainCls)) || []).map(function (item, index) {
    return {
      el: item,
      index: index,
      loading: false,
      click: false,
      time: -1,
    };
  });
}
BeatGame.prototype.start = function () {
  this.playing = true;
  this.reset();
  this._run();
};
BeatGame.prototype.stop = function () {
  var self = this;
  this.playing = false;
  clearTimeout(this.timer);
  // this.list.forEach(function (item) {
  //   item.el.classList.remove(self.activeCls);
  // });
};
BeatGame.prototype.reset = function () {
  this.clickCount = 0;
  this.curSpeed = this.SPEED;
  this.curTime = this.totalTime;
  this.timer = null;
  this.list.forEach(function (item) {
    item.time = -1;
    item.loading = false;
    item.click = false;
  });
};
BeatGame.prototype.setTime = function (time) {
  this.curTime = time;
};
BeatGame.prototype.click = function (index, callback) {
  var self = this;
  if (!self.playing || self.list[index].loading) {
    return;
  }

  // 设置延迟动画
  self.list[index].time = Date.now();
  self.list[index].loading = true;
  self.list[index].el.classList.remove(self.activeCls);
  self.clickCount++;

  callback && callback(self);
};
BeatGame.prototype._run = function () {
  var self = this,
    duration = self.duration,
    SPEED = self.SPEED;
  var i = jtool.getRandom(0, this.list.length); // 随机格子
  var j = (k = null);

  if (self.curTime > (self.totalTime / 4) * 3) {
    self.curSpeed = SPEED;
  } else if (self.curTime > (self.totalTime / 4) * 2) {
    self.curSpeed = SPEED - 100;
    j = Math.abs(5 - i);
    k = Math.abs(7 - j);
  } else if (self.curTime > self.totalTime / 4) {
    self.curSpeed = SPEED - 200;
    j = Math.abs(5 - i);
    k = Math.abs(6 - j);
  } else {
    self.curSpeed = SPEED - 150;
    j = Math.abs(5 - i);
    k = Math.abs(7 - j);
  }

  // 设置状态
  self.list.forEach(function (item, ii, arr) {
    if (!item.loading) {
      if (i == item.index) item.time = Date.now();
      if (j == item.index) item.time = Date.now();
      if (k == item.index) item.time = Date.now();
    }
  });

  // 设置动画
  self.list.forEach(function (item, ii, arr) {
    // 出现蛋
    if (item.time > 0) {
      // 砸蛋后
      if (Date.now() - item.time > duration) {
        item.time = -1;
        item.loading = false;
        arr[item.index]["el"].classList.remove(self.activeCls);
      }
      // 未砸蛋
      else {
        // 设置新蛋
        if (!item.loading) {
          arr[item.index]["el"].classList.add(self.activeCls);
        }
      }
    }
    // 隐藏蛋
    else {
      item.time = -1;
      item.loading = false;
      arr[item.index]["el"].classList.remove(self.activeCls);
    }
  });

  self.timer = setTimeout(function () {
    self._run();
  }, self.curSpeed);
};
