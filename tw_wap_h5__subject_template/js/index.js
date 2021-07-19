/*
 * @Description: 工具函数
 * @version: 0.1.0
 * @Author: liejiayong(809206619@qq.com)
 * @Date: 2020-06-15 11:27:17
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2021-07-19 18:00:23
 * @FilePath: \tool-library\business-logic\tw_wap_h5__subject_template\js\index.js
 */

var logic = {
  extend: function (name, fn) {
    var t = this;
    if (fn && typeof fn == 'function') {
      if (!t[fn]) {
        return TypeError(JSON.stringify(fn) + 'is existed');
      } else {
        t[name] = fn;
      }
    } else if (Object.prototype.toString.call(name) === '[object Object]') {
      for (var key in name) {
        t[key] = name[key];
      }
    }
  },
  /* 游戏预备倒计时弹窗 */
  $readyPop: function () {
    var $pop =
      '' +
      '<!-- pop game ready count -->' +
      '<div class="jy-pop " id="J_gameReadyPop">' +
      '<div class="jy-pop_mask"></div>' +
      '<div class="jy-pop_ready">' +
      ' <span id="gameReadyCount">3</span>' +
      '<div class="mt-30 fs-24">温馨提示：点击加速即可为奥运加油！</div' +
      '</div>' +
      '</div>';
    $pop = $($pop);
    $('body').append($pop);
  },
};
var jtool = {
  imgPath: './img/', // 图片地址
  audioPath: './media/', // 音乐地址
  activeCls: 'active',
  disableCls: 'disable',
  doc: document.documentElement.body || document.body,
  /**
   * swiper.js 滚动页面
   * @param {Element} el
   */
  swiper: function (el) {
    var psw = new Swiper(el, {
      initialSlide: 0,
      direction: 'vertical',
      height: $(window).height(),
      autoHeight: true,
    });
    this.psw = psw;
    var startScroll, touchStart, touchCurrent;
    psw.slides.on(
      'touchstart',
      function (e) {
        startScroll = Math.ceil(this.scrollTop);
        touchStart = e.targetTouches[0].pageY;
      },
      true
    );
    psw.slides.on(
      'touchmove',
      function (e) {
        touchCurrent = e.targetTouches[0].pageY;
        var touchesDiff = touchCurrent - touchStart;
        var slide = this;
        var onlyScrolling =
          slide.scrollHeight > slide.offsetHeight && //allow only when slide is scrollable
          ((touchesDiff < 0 && startScroll === 0) || //start from top edge to scroll bottom
            (touchesDiff > 0 && startScroll === slide.scrollHeight - slide.offsetHeight) || //start from bottom edge to scroll top
            (startScroll > 0 && startScroll < slide.scrollHeight - slide.offsetHeight)); //start from the middle
        if (onlyScrolling) {
          e.stopPropagation();
        }
      },
      true
    );
  },
  /**
   * 点击元素复制文本
   * @param {className} btnCopyCls
   */
  elementCopy: function (btnCopyCls) {
    btnCopyCls = btnCopyCls || '.jbtnpopcode';
    var $tip = $(
      '<div class="jy-copytips" style="display: none; padding: 10px; position: fixed; top: 30%; left: 50%; transform: translateX(-50%); background-color: rgb(0, 0, 0); color: rgb(255, 255, 255); box-shadow: rgb(0, 0, 0) 0px 0px 5px; white-space: nowrap; z-index: 2001;"></div>'
    );
    $('body').append($tip);
    var clipboard = new ClipboardJS(btnCopyCls);
    clipboard.on('success', function () {
      $tip.text('复制成功').fadeIn(500).fadeOut(1000);
    });
    clipboard.on('error', function () {
      $tip.text('您的手机不支持点击复制，请长按复制！').fadeIn(500).fadeOut(1000);
    });
  },
  /**
   * tip pop
   */
  tip: {
    screen: function () {
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
      var $tip = '';
      $tip += '<!--旋屏提示 -->';
      $tip += '<div id="orientLayer" class="jy-orient_layer">';
      $tip += '<div class="jy-orient_content">';
      $tip += '<i class="jy-orient_icon"></i>';
      $tip += '<div class="jy-orient_extra">为了更好的体验，请使用竖屏浏览</div>';
      $tip += '</div>';
      $tip += '</div>';
      $tip = $($tip);
      $('body').append($tip);
      window.addEventListener(
        resizeEvt,
        function () {
          var clientWidth = window.innerWidth,
            clientHeight = window.innerHeight;
          if (clientHeight < clientWidth) {
            if (!$tip.hasClass('active')) {
              $tip.addClass('active');
              setTimeout(function () {
                $tip.removeClass('active');
              }, 5000);
            }
          } else {
            $tip.removeClass('active');
          }
        },
        false
      );
    },
  },
  /**
   * 随机数
   * @param {number} min
   * @param {number} max
   */
  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  /**
   * 洗牌
   * @param {Array} arr
   */
  shuffle: function (arr) {
    var _arr = arr.slice();
    for (var i = 0; i < _arr.length; i++) {
      var j = this.getRandom(0, i);
      var n = _arr[i];
      _arr[i] = _arr[j];
      _arr[j] = n;
    }
    return _arr;
  },
  /**
   * 防抖
   * @param {Function} fn
   * @param {number} delay
   */
  debounce: function (fn, delay) {
    var timer = null;
    return function () {
      var context = this,
        arg = arguments;
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, arg);
      }, delay);
    };
  },
  /**
   * 节流
   * @param {Function} fn
   * @param {number} delay
   */
  throttle: function (fn, delay) {
    if (!delay) delay = 160;
    var timer = null;
    var start = Date.now();
    return function () {
      var context = this,
        arg = arguments,
        curr = Date.now();
      if (curr - start >= delay) {
        fn.apply(context, arg);
        start = Date.now();
      } else {
        timer = setTimeout(function () {
          fn.apply(context, arg);
        }, delay);
      }
    };
  },
  /**
   * 去除前后空格
   * @param {String} str
   */
  trim: function (str) {
    return str.replace(/^\s+|\s+$/g, '');
  },
  /**
   *
   * @param {string} key
   * @param {string} type search|hash
   */
  getQueryString: function (key, type) {
    type = type ? type : 'search';
    const regExp = new RegExp('[?&#]{1}' + key + '=(.*?)([&/#]|$)');
    const value = window.location[type].match(regExp);
    return value && decodeURIComponent(value[1]);
  },
  /**
   * 判断数字类型
   * @param {number} number
   */
  isNumber: function (number) {
    return Object.prototype.toString.call(number).toLocaleLowerCase() === '[object number]';
  },
  /**
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
  language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  pop: {
    picker: function () {
      var $picker =
        '' +
        '<!-- pop selector  -->' +
        '<div style="z-index:1001;" class="jy-pop " id="J_selectorPop">' +
        '<div div class="jy-pop_mask jy-pop_mask--clickable" ></div>' +
        '<div class="jy-pop_picker_main">' +
        ' <div class="jy-pop_picker_hd">' +
        '<a href="javascript:;" class="jy-pop_picker_btn jy-pop_picker_btn--cancel">取消</a>' +
        '<a href="javascript:;" class="jy-pop_picker_btn jy-pop_picker_btn--confirm">确定</a>' +
        '</div>' +
        '<div class="jy-pop_picker__body">' +
        '<ul id="jyPopPicker">' +
        '<li class="active">xxx</li>' +
        '<li>xxx</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div >';
      $picker = $($picker);
      $picker.insertBefore($('#J_tipPop'));

      return {
        $picker: $picker,
      };
    },
    authTime: { current: 60, default: 60 },
    authDisable: false,
    authTimer: null,
    btnAuth: function (cls) {
      var self = this;
      $(cls).on('click', function () {
        if (self.authDisable) return;
        self.authDisable = true;
        clearTimeout(self.authTimer);
        self.authTime.current = self.authTime.default;
        $btn = $(this);
        function count() {
          $btn.text('倒计时' + self.authTime.current + 's').addClass('disable');
          self.authTimer = setTimeout(function () {
            if (self.authTime.current == 1) {
              clearTimeout(self.timer);
              self.authDisable = false;
              $btn.text('验证码').removeClass('disable');
              return;
            }
            --self.authTime.current;
            $btn.text('倒计时' + self.authTime.current + 's');
            count();
          }, 1000);
        }
        count();
      });
    },
  },
  /**
   * 弹窗展示
   * @param {Element|String|number} html
   */
  showTip: function (html) {
    var $tip = $('#J_tipPop');
    $tip.find('#popTipNorm').html(html);
    $tip.fadeIn();
  },
  /**
   * 跳转页面
   * @param {string} cls
   * @param {string} siblings
   */
  navTo: function (cls, siblings) {
    siblings = siblings || '.jy-section';
    $(cls).addClass(this.activeCls).siblings(siblings).removeClass(this.activeCls);
  },
  $window: {
    fixed: function (cls) {
      cls = cls || '.jy-content';
      $(cls).css({ 'overflow-y': 'hidden' });
    },
    reset: function (cls) {
      cls = cls || '.jy-content';
      $(cls).css({ 'overflow-y': 'auto' });
    },
    winReset: function () {
      document.querySelector('body').style.overflow = '';
    },
    winFixed: function () {
      document.querySelector('body').style.overflow = 'hidden';
    },
  },
  preload: {
    init: (function () {
      var $loading =
        '' +
        '<!-- preload -->' +
        '<div class="ploading " id="pagePreload">' +
        '<div class="progress">' +
        '<p>loading...</p>' +
        '<p id="ploadingPro">0%</p>' +
        '</div>' +
        '</div>';
      $loading = $($loading);
      $('body').append($loading);

      return function (path, imgArr, cbSuccess, cbProcess) {
        $loading.fadeIn();
        $loading = null;
        var loader = new ImagesLoader();
        loader.loadImages(imgArr, path);
        loader.complete(function () {
          cbSuccess();
        });
        loader.process(function () {
          cbProcess(this);
        });
        loader.start();
        jtool.$window.winFixed();
      };
    })(),
    open: function () {
      jtool.$window.winFixed();
      $('#pagePreload').fadeIn();
    },
    close: function () {
      jtool.$window.winReset();
      $('#pagePreload').fadeOut();
    },
  },
  touchMove: {
    $doms: [],
    addListener: function (cls) {
      var dom = document.querySelector(cls);
      this.$doms.push({
        cls: cls,
        dom: dom,
        stat: false, // 不阻止
      });
    },
    has: function (cls) {
      var ret = null;
      this.$doms.forEach(function (dom, index) {
        if (dom.cls == cls) {
          ret = {
            stat: dom.stat,
            cls: dom.cls,
            dom: dom.dom,
            index: index,
          };
        } else {
          ret = false;
        }
      });
      return ret;
    },
    preventFn: function (e) {
      e.preventDefault();
    },
    prevent: function (cls) {
      var self = this,
        clsStat = this.has(cls);
      if (!clsStat) return;
      if (clsStat && clsStat.stat) return;
      self.$doms[clsStat.index].stat = true;
      // console.log('prevent', this.has(cls), clsStat.dom, self.preventFn)
      // clsStat.dom.addEventListener('touchmove', function (e) { self.preventFn(e, callback) }, {
      clsStat.dom.addEventListener('touchmove', self.preventFn, {
        passive: false,
      });
    },
    reset: function (cls) {
      var self = this,
        clsStat = this.has(cls);
      if (!clsStat) return;
      if (clsStat && !clsStat.stat) return;
      self.$doms[clsStat.index].stat = false;
      // console.log('reset', this.has(cls), clsStat.dom, self.preventFn)
      // clsStat.dom.removeEventListener('touchmove', function (e) { self.preventFn(e, callback) }, {
      clsStat.dom.removeEventListener('touchmove', self.preventFn, {
        passive: false,
      });
    },
  },
  /**
   * music
   * @param {el} btnAudio
   */
  initMusic: function (btnAudio) {
    var url = jtool.audioPath + 'bgm.mp3?v=0',
      btnAudio = btnAudio || $('.btn-aud'),
      audio = new Audio(),
      delay = 2000;
    audio.setAttribute('src', url);
    audio.setAttribute('preload', 'auto'); /* ios自动缓冲，保险些可以设置audio.load()来加载缓冲 */
    audio.setAttribute('loop', true);
    // 静音状态
    // audio.setAttribute('autoplay', true);
    // audio.setAttribute('muted', false);
    audio.volume = 0.5;
    audio.style.cssText = ';opacity:.1;height:1px;';
    document.addEventListener('DOMContentLoaded', function () {
      document.body.appendChild(audio);
    });

    /* prettier-ignore */
    eval(/* prettier-ignore */ function(p,a,c,k,e,r){/* prettier-ignore */e=function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'[2-9a-zA-C]'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('window.setTimeout(6(){k.l(\'3 d\',d);6 2(m){n e=[].e,o=e.call(p,1);q 6(){q m.apply(p[0],o)}}3.load();btnAudio.on(\'f\',6(){g()});$(\'4,r\').one(\'f\',2(7,\'s awake 9 4,r f\'));3.5(\'t\',2(a,8,\'t\'));3.5(\'u\',2(a,8,\'u\'));3.5(\'v\',2(a,8,\'v\'));3.5(\'g\',2(a,true,\'g\'));3.5(\'canplay\',2(7,\'s canlpay\'));3.onloadedmetadata=6(){n h=this.h;k.l(\'3 loadedmetadata total durtion w \'+h)};i(x WinxinJSBridge==\'object\'&&x y.z==\'6\'){7(\'b y w z\')}A{i(4.5){4.5(\'c\',2(7,\'b c 9 modernbrower\'),8)}A{i(4.j){4.j(\'c\',2(7,\'b c 9 B\'),8);4.j(\'C\',2(7,\'b C 9 B\'),8)}}}},d);',[],39,'||curring|audio|document|addEventListener|function|startPlay|false|by|changeStatus|wechat|WeixinJSBridgeReady|delay|slice|click|play|duration|if|attachEvent|console|log|fn|var|arg|arguments|return|body|andio|abort|error|pause|is|typeof|WeixinJSBridge|invoke|else|iebrower|onWeixinJSBridgeReady'.split('|'),0,{}));
    var isPlay = false;
    function changeStatus(flag, sign) {
      // console.log('audio change status to ', sign);
      if (flag) {
        isPlay = true;
        btnAudio.addClass(jtool.activeCls);
      } else {
        isPlay = false;
        btnAudio.removeClass(jtool.activeCls);
      }
    }
    function startPlay(notice) {
      // console.log('audio initial status: ', isPlay, ' and', notice);
      this.stopPropagation();
      if (isPlay) {
        return console.log('audio first playing, not ', notice);
      }
      audio.play();
    }
    function play() {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  },
  /**
   * menu compatible
   * @param {*} parentCls 父元素容器
   * @param {*} scrollCls 滚动容器
   * @param {*} menuCls 菜单容器
   */
  menusCompat: (function (parentCls, scrollCls, menuCls) {
    parentCls = parentCls || '#topWrapper';
    scrollCls = scrollCls || '#mainWrapper';
    menuCls = menuCls || '#menuWrapper';
    return function () {
      var $parent = document.querySelector(parentCls),
        $scroll = document.querySelector(scrollCls),
        $menu = document.querySelector(menuCls),
        wrapperHeight = $parent.offsetHeight - $menu.offsetHeight;
      $parent.style.position = 'relative';
      $scroll.style.height = wrapperHeight + 'px';
      $menu.style.top = wrapperHeight + 'px';
    };
  })(),
  /**
   * child 滚动到 parent 的相对底部位置
   * @param {className} parentCls
   * @param {className} childCls
   */
  scrollToBottom: function (parentCls, childCls) {
    var $p = $(parentCls),
      $c = $(childCls),
      pH = $p.height(),
      cH = $c.height();
    if (pH < cH) {
      $p.scrollTop(cH - pH);
    }
  },
  ctxParticle: function () {
    new particleCanvas(ctxId, [
      {
        type: {
          typeName: 'image',
          url: './img/particle1.png',
        },
        number: 5,
        op: {
          min: 0.7,
          max: 1,
        },
        size: {
          min: 15,
          max: 15,
        },
        speed: {
          min: 1,
          max: 1,
        },
        angle: {
          value: 0,
          float: 20,
        },
        area: {
          leftTop: [120, 0],
          rightBottom: [600, 700],
        },
        rota: {
          value: 0,
          speed: 2,
          floatValue: 0,
          floatSpeed: 3,
        },
        zoom: {
          max: 0,
          min: 0,
        },
        reIn: '',
      },
    ]);
  },
};

// 倒计时
var jcountdown = {
  timer: null,
  format: function (num) {
    num = Number(num) || 0;
    return num < 10 ? '0' + num : num;
  },
  getTime: function (y, mo, d, h, mi, s) {
    return new Date(y, mo - 1, d, h, mi, s).getTime();
  },
  getDate: function (y, mo, d, h, mi, s) {
    mo = mo - 1;
    var now = new Date().getTime(),
      last = new Date(y, mo, d, h, mi, s).getTime(),
      diff = (last - now) / 1000,
      day = 0,
      hour = 0,
      min = 0,
      sec = 0,
      end = true;

    if (diff > 0) {
      day = parseInt(diff / 24 / 60 / 60);
      hour = parseInt((diff / 60 / 60) % 24);
      min = parseInt((diff / 60) % 60);
      sec = parseInt(diff % 60);
      end = false;
    }
    return { end: end, day: this.format(day), hour: this.format(hour), min: this.format(min), sec: this.format(sec) };
  },
  setTimeDOM: function (y, mo, d, h, mi, s) {
    var date = this.getDate(y, mo, d, h, mi, s);
    $('#day').text(date.day);
    $('#hour').text(date.hour);
    $('#minute').text(date.min);
    $('#second').text(date.sec);
    if (!date.end) {
      var t = this;
      this.timer = setTimeout(function () {
        t.setTimeDOM(y, mo, d, h, mi, s);
      }, 1000);
    }
  },
  countDown: function (y, mo, d, h, mi, s) {
    clearTimeout(this.timer);
    this.setTimeDOM(y, mo, d, h, mi, s);
  },
};
// // 第一波2月11号
// if (Date.now() < new Date(2021, 02, 11, 20, 00, 00)) {
//   jcountdown.countDown(2021, 02, 11, 20, 00, 00);
// }

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
/* 位移控制器 */
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

// preinstall the code
$(function () {
  jtool.preload.init(
    jtool.imgPath,
    [],
    function () {
      console.log('preload finish...');
      jtool.preload.close();
      jtool.navTo('.section-1');
    },
    function (install) {
      var prsnum = install.processNum;
      $('#ploadingPro').html(prsnum + '%');
      console.log('preload process...', prsnum);
    }
  );
  // jtool.swiper('#psw');
  jtool.tip.screen();
  jtool.elementCopy();
  jtool.pop.picker();
  jtool.pop.btnAuth('.jy-pop_input_cell-auth');
  jtool.menusCompat();
  // jtool.initMusic();
  var queryTest = window.location.href;
  if (queryTest.indexOf('debug=jylie') > -1) new VConsole();
  // 只复位到顶部
  // $("input, textarea, select").on("blur", function () {
  //   window.scroll(0, 0);
  // });
  // // 复位到特定情景的顶部
  // (function () {
  //   var bfscrolltop = document.body.scrollTop;
  //   $("input, textarea, select")
  //     .focus(function () {
  //       bfscrolltop = document.body.scrollTop;
  //     })
  //     .blur(function () {
  //       document.body.scrollTop = bfscrolltop;
  //     });
  // })();

  //   // test touchMove
  //   jtool.touchMove.addListener('.section-1')
  //   // jtool.touchMove.addListener('.section-2')
  //   setTimeout(() => {
  //     jtool.touchMove.prevent('.section-1', function (e) {
  //       console.log('0000000000', e)
  //     })
  //   }, 3000);
  //   setTimeout(() => {
  //     jtool.touchMove.reset('.section-1', function (e) {
  //       console.log('111111111', e)
  //     })
  //   }, 6000);
});
