/* 赛龙舟游戏类型 */

/* 进度条 */
var ProgressController = function (duration) {
  this.start = 0;
  this.rfa = null;
  this.duration = duration || 0;
};
ProgressController.prototype.start = function (opts, cb) {
  if (opts.duration) this.duration = opts.duration;
  this.start = opts.timestamps || Date.now();
  cancelAnimationFrame(this.rfa);
  this.rfa = window.requestAnimationFrame(function () {
    cb && cb(this.start);
  });
};
ProgressController.prototype.stop = function () {
  cancelAnimationFrame(this.rfa);
  this.start = 0;
};
var OFFSET_STATUS = { ready: 'ready', loading: 'loading', loaded: 'loaded' };
var SPEED_RATE = [
  { range: '0-100', value: 0.8 },
  { range: '100-200', value: 0.6 },
  { range: '200-300', value: 0.4 },
  { range: '300-400', value: 0.2 },
  { range: '400-500', value: 0.1 },
  { range: '500-600', value: 0.1 },
  { range: '600-700', value: 0.09 },
  { range: '700-800', value: 0.08 },
  { range: '900-1000', value: 0.07 },
  { range: '1000-3000', value: 0.06 },
  { range: '3000-6000', value: 0.05 },
  { range: '6000-10000', value: 0.04 },
  { range: '10000-100000000', value: 0 },
];
/* 速度控制器 */

var SpeedController = function (opts) {
  this.time = 0; /* 初始计时 */
  this.timeover = opts.timeover; /* 结束计时 */
  this.timestamps = opts.mode ? 10000000 : Date.now(); /* 开始时间戳 */
  this.mode = opts.mode || false; /*true:开启加速模式 */
  this.rateOpts = opts.rate || []; /* 速率 */
};
SpeedController.prototype = {
  constructor: SpeedController,
  setTime: function (time) {
    this.time = time;
  },
  /**
   * 匀速
   * @param {Function} cb 回调
   */
  constSpeed: function (cb) {
    var now = Date.now(),
      rate = (now - this.time) / 1000 / this.timeover;
    cb && cb(rate);
    return rate;
  },
  /**
   * 加速
   * @param {Function} cb 回调
   */
  aceSpeed: function (cb) {
    var now = Date.now(),
      diff = now - this.timestamps,
      ace = 0;

    this.rateOpts.forEach(function (item) {
      var times = item.range.split('-');
      if (diff > times[0] && diff <= times[1]) {
        ace = item.value;
      }
    });

    this.timestamps = now;
    cb && cb(ace);
    return ace;
  },
  /**
   * 速度处理
   * @param {Function} cb 回调
   */
  exce: function (cb) {
    var ace = 0;
    if (this.mode) {
      ace = this.aceSpeed();
    } else {
      ace = this.constSpeed();
    }
    cb && cb(ace);
  },
  loop: function (cb) {
    var now = Date.now(),
      diff = now - this.timestamps,
      ace = 0;

    this.rateOpts.forEach(function (item) {
      var times = item.range.split('-');
      if (diff > times[0] && diff <= times[1]) {
        ace = item.value;
      }
    });

    cb && cb(ace);
    return ace;
  },
};
/* 
  位移控制器
  t.domProgressCom = new OffsetController($('#gpbCom'), {
    speeder: {
      rate: SPEED_RATE,
      mode: false,
      timeover: t.time.DEFAULT,
    },
  });
  t.domProgressRole = new OffsetController($('#gpbRole'), {
    mode: 'role',
    speeder: {
      rate: SPEED_RATE,
      mode: true,
      timeover: t.time.DEFAULT,
    },
*/
var OffsetController = function (el, opts) {
  this.el = el;
  this.status = OFFSET_STATUS.ready;
  this.speed = 0;
  this.ace = 0;
  this.speeder = new SpeedController(opts.speeder);
  this.mode = opts.mode || 'default';

  this.init();
};
OffsetController.prototype = {
  constructor: OffsetController,
  init: function () {
    this.status = OFFSET_STATUS.loading;
    this.speeder.setTime(Date.now());
    this.width = this.el.width();
    var translate3d = 'translate3d(0,0,0)';
    this.el.css({ webkitTransform: translate3d, mozTransform: translate3d, transform: translate3d });
  },
  move: function (cb) {
    switch (this.mode) {
      case 'default':
        var ace = this.speeder.constSpeed();
        this.speed = this.width * ace;
        cb && cb(this.speed);
        break;
      default:
        var ace = this.speeder.aceSpeed();
        this.speed += ace;
        cb && cb(this.speed);

        break;
    }
  },
  loop: function (cb) {
    var ace = this.speeder.loop();
    this.speed += ace;
    cb && cb(this.speed);
  },
};
