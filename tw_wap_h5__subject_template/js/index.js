/*
 * @Description: 工具函数
 * @version: 0.1.0
 * @Author: liejiayong(809206619@qq.com)
 * @Date: 2020-06-15 11:27:17
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2021-10-27 15:32:41
 * @FilePath: \tool-library\business-logic\tw_wap_h5__subject_template\js\index.js
 * @warning: 本页所有内容，后端同学不需要修改，谢谢~
 */
/* prettier-ignore */ (function(){if(typeof window==='undefined'){return}var eventTarget;var supportTouch='ontouchstart'in window;if(!document.createTouch){document.createTouch=function(view,target,identifier,pageX,pageY,screenX,screenY){return new Touch(target,identifier,{pageX:pageX,pageY:pageY,screenX:screenX,screenY:screenY,clientX:pageX-window.pageXOffset,clientY:pageY-window.pageYOffset,},0,0)}}if(!document.createTouchList){document.createTouchList=function(){var touchList=TouchList();for(var i=0;i<arguments.length;i++){touchList[i]=arguments[i]}touchList.length=arguments.length;return touchList}}if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector}if(!Element.prototype.closest){Element.prototype.closest=function(s){var el=this;do{if(el.matches(s))return el;el=el.parentElement||el.parentNode}while(el!==null&&el.nodeType===1);return null}}var Touch=function Touch(target,identifier,pos,deltaX,deltaY){deltaX=deltaX||0;deltaY=deltaY||0;this.identifier=identifier;this.target=target;this.clientX=pos.clientX+deltaX;this.clientY=pos.clientY+deltaY;this.screenX=pos.screenX+deltaX;this.screenY=pos.screenY+deltaY;this.pageX=pos.pageX+deltaX;this.pageY=pos.pageY+deltaY};function TouchList(){var touchList=[];touchList['item']=function(index){return this[index]||null};touchList['identifiedTouch']=function(id){return this[id+1]||null};return touchList}var initiated=false;function onMouse(touchType){return function(ev){if(ev.type==='mousedown'){initiated=true}if(ev.type==='mouseup'){initiated=false}if(ev.type==='mousemove'&&!initiated){return}if(ev.type==='mousedown'||!eventTarget||(eventTarget&&!eventTarget.dispatchEvent)){eventTarget=ev.target}if(eventTarget.closest('[data-no-touch-simulate]')==null){triggerTouch(touchType,ev)}if(ev.type==='mouseup'){eventTarget=null}}}function triggerTouch(eventName,mouseEv){var touchEvent=document.createEvent('Event');touchEvent.initEvent(eventName,true,true);touchEvent.altKey=mouseEv.altKey;touchEvent.ctrlKey=mouseEv.ctrlKey;touchEvent.metaKey=mouseEv.metaKey;touchEvent.shiftKey=mouseEv.shiftKey;touchEvent.touches=getActiveTouches(mouseEv);touchEvent.targetTouches=getActiveTouches(mouseEv);touchEvent.changedTouches=createTouchList(mouseEv);eventTarget.dispatchEvent(touchEvent)}function createTouchList(mouseEv){var touchList=TouchList();touchList.push(new Touch(eventTarget,1,mouseEv,0,0));return touchList}function getActiveTouches(mouseEv){if(mouseEv.type==='mouseup'){return TouchList()}return createTouchList(mouseEv)}function TouchEmulator(){window.addEventListener('mousedown',onMouse('touchstart'),true);window.addEventListener('mousemove',onMouse('touchmove'),true);window.addEventListener('mouseup',onMouse('touchend'),true)}TouchEmulator['multiTouchOffset']=75;if(!supportTouch){new TouchEmulator()}})();
/* prettier-ignore */ if(typeof Object.assign!=='function'){Object.defineProperty(Object,'assign',{value:function assign(target,varArgs){'use strict';if(target===null||target===undefined){throw new TypeError('Cannot convert undefined or null to object');}var to=Object(target);for(var index=1;index<arguments.length;index++){var nextSource=arguments[index];if(nextSource!==null&&nextSource!==undefined){for(var nextKey in nextSource){if(Object.prototype.hasOwnProperty.call(nextSource,nextKey)){to[nextKey]=nextSource[nextKey]}}}}return to},writable:true,configurable:true,})}
/* prettier-ignore */ (function(){var lastTime=0;var vendors=['webkit','moz','ms','o'];for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x){window.requestAnimationFrame=window[vendors[x]+'RequestAnimationFrame'];window.cancelAnimationFrame=window[vendors[x]+'CancelAnimationFrame']||window[vendors[x]+'CancelRequestAnimationFrame']}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(callback){var currTime=new Date().getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){return callback(currTime+timeToCall)},timeToCall);lastTime=currTime+timeToCall;return id}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(id){clearTimeout(id)}}})();
/* prettier-ignore */ var logic={extend:function(name,fn){var t=this;if(fn&&typeof fn=='function'){if(!t[fn]){return TypeError(JSON.stringify(fn)+'is existed')}else{t[name]=fn}}else if(Object.prototype.toString.call(name)==='[object Object]'){for(var key in name){t[key]=name[key]}}},$readyPop:function(){var $pop='<!-- pop game ready count --><div class="jy-pop " id="J_gameReadyPop"><div class="jy-pop_mask"></div><div class="jy-pop_ready"> <span id="gameReadyCount">3</span></div></div>';$pop=$($pop);$('body').append($pop)},};
var jtool = {
  imgPath: './img/', // 默认图片地址，后端请勿修改，需要修改请到index.html修改
  imgCrossPath: './img/', // 默认跨域图片地址，后端请勿修改，需要修改请到index.html修改
  mediaPath: './media/', // 默认媒体地址，后端请勿修改，需要修改请到index.html修改
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

      var MOBILE_MAX_WIDTH = 560; /* comparison iphone 5s origin height is 568 */
      window.addEventListener(
        resizeEvt,
        function () {
          var clientWidth = window.innerWidth,
            clientHeight = window.innerHeight;
          if (clientHeight < clientWidth && clientWidth > MOBILE_MAX_WIDTH) {
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
    var url = jtool.mediaPath + 'bgm.mp3?v=0',
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
    window.addEventListener('resize', sty);
    function sty() {
      var $parent = document.querySelector(parentCls),
        $scroll = document.querySelector(scrollCls),
        $menu = document.querySelector(menuCls),
        wrapperHeight = window.innerHeight - $menu.offsetHeight;
      $parent.style.position = 'relative';
      $scroll.style.height = wrapperHeight + 'px';
      $menu.style.top = wrapperHeight + 'px';
    }
    return sty;
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
};

// 倒计时
// var jcountdown = {
//   timer: null,
//   format: function (num) {
//     num = Number(num) || 0;
//     return num < 10 ? '0' + num : num;
//   },
//   getTime: function (y, mo, d, h, mi, s) {
//     return new Date(y, mo - 1, d, h, mi, s).getTime();
//   },
//   getDate: function (y, mo, d, h, mi, s) {
//     mo = mo - 1;
//     var now = new Date().getTime(),
//       last = new Date(y, mo, d, h, mi, s).getTime(),
//       diff = (last - now) / 1000,
//       day = 0,
//       hour = 0,
//       min = 0,
//       sec = 0,
//       end = true;

//     if (diff > 0) {
//       day = parseInt(diff / 24 / 60 / 60);
//       hour = parseInt((diff / 60 / 60) % 24);
//       min = parseInt((diff / 60) % 60);
//       sec = parseInt(diff % 60);
//       end = false;
//     }
//     return { end: end, day: this.format(day), hour: this.format(hour), min: this.format(min), sec: this.format(sec) };
//   },
//   setTimeDOM: function (y, mo, d, h, mi, s) {
//     var date = this.getDate(y, mo, d, h, mi, s);
//     $('#day').text(date.day);
//     $('#hour').text(date.hour);
//     $('#minute').text(date.min);
//     $('#second').text(date.sec);
//     if (!date.end) {
//       var t = this;
//       this.timer = setTimeout(function () {
//         t.setTimeDOM(y, mo, d, h, mi, s);
//       }, 1000);
//     }
//   },
//   countDown: function (y, mo, d, h, mi, s) {
//     clearTimeout(this.timer);
//     this.setTimeDOM(y, mo, d, h, mi, s);
//   },
// };
// // 第一波2月11号
// if (Date.now() < new Date(2021, 02, 11, 20, 00, 00)) {
//   jcountdown.countDown(2021, 02, 11, 20, 00, 00);
// }

// var ProgressController = function (duration) {
//   this.start = 0;
//   this.rfa = null;
//   this.duration = duration || 0;
// };
// ProgressController.prototype.start = function (opts, cb) {
//   if (opts.duration) this.duration = opts.duration;
//   this.start = opts.timestamps || Date.now();
//   cancelAnimationFrame(this.rfa);
//   this.rfa = window.requestAnimationFrame(function () {
//     cb && cb(this.start);
//   });
// };
// ProgressController.prototype.stop = function () {
//   cancelAnimationFrame(this.rfa);
//   this.start = 0;
// };
// var OFFSET_STATUS = { ready: 'ready', loading: 'loading', loaded: 'loaded' };
// var SPEED_RATE = [
//   { range: '0-100', value: 0.8 },
//   { range: '100-200', value: 0.6 },
//   { range: '200-300', value: 0.4 },
//   { range: '300-400', value: 0.2 },
//   { range: '400-500', value: 0.1 },
//   { range: '500-600', value: 0.1 },
//   { range: '600-700', value: 0.09 },
//   { range: '700-800', value: 0.08 },
//   { range: '900-1000', value: 0.07 },
//   { range: '1000-3000', value: 0.06 },
//   { range: '3000-6000', value: 0.05 },
//   { range: '6000-10000', value: 0.04 },
//   { range: '10000-100000000', value: 0 },
// ];
// /* 速度控制器 */
// var SpeedController = function (opts) {
//   this.time = 0; /* 初始计时 */
//   this.timeover = opts.timeover; /* 结束计时 */
//   this.timestamps = opts.mode ? 10000000 : Date.now(); /* 开始时间戳 */
//   this.mode = opts.mode || false; /*true:开启加速模式 */
//   this.rateOpts = opts.rate || []; /* 速率 */
// };
// SpeedController.prototype = {
//   constructor: SpeedController,
//   setTime: function (time) {
//     this.time = time;
//   },
//   /**
//    * 匀速
//    * @param {Function} cb 回调
//    */
//   constSpeed: function (cb) {
//     var now = Date.now(),
//       rate = (now - this.time) / 1000 / this.timeover;
//     cb && cb(rate);
//     return rate;
//   },
//   /**
//    * 加速
//    * @param {Function} cb 回调
//    */
//   aceSpeed: function (cb) {
//     var now = Date.now(),
//       diff = now - this.timestamps,
//       ace = 0;

//     this.rateOpts.forEach(function (item) {
//       var times = item.range.split('-');
//       if (diff > times[0] && diff <= times[1]) {
//         ace = item.value;
//       }
//     });

//     this.timestamps = now;
//     cb && cb(ace);
//     return ace;
//   },
//   /**
//    * 速度处理
//    * @param {Function} cb 回调
//    */
//   exce: function (cb) {
//     var ace = 0;
//     if (this.mode) {
//       ace = this.aceSpeed();
//     } else {
//       ace = this.constSpeed();
//     }
//     cb && cb(ace);
//   },
//   loop: function (cb) {
//     var now = Date.now(),
//       diff = now - this.timestamps,
//       ace = 0;

//     this.rateOpts.forEach(function (item) {
//       var times = item.range.split('-');
//       if (diff > times[0] && diff <= times[1]) {
//         ace = item.value;
//       }
//     });

//     cb && cb(ace);
//     return ace;
//   },
// };
// /* 位移控制器 */
// var OffsetController = function (el, opts) {
//   this.el = el;
//   this.status = OFFSET_STATUS.ready;
//   this.speed = 0;
//   this.ace = 0;
//   this.speeder = new SpeedController(opts.speeder);
//   this.mode = opts.mode || 'default';

//   this.init();
// };
// OffsetController.prototype = {
//   constructor: OffsetController,
//   init: function () {
//     this.status = OFFSET_STATUS.loading;
//     this.speeder.setTime(Date.now());
//     this.width = this.el.width();
//     var translate3d = 'translate3d(0,0,0)';
//     this.el.css({ webkitTransform: translate3d, mozTransform: translate3d, transform: translate3d });
//   },
//   move: function (cb) {
//     switch (this.mode) {
//       case 'default':
//         var ace = this.speeder.constSpeed();
//         this.speed = this.width * ace;
//         cb && cb(this.speed);
//         break;
//       default:
//         var ace = this.speeder.aceSpeed();
//         this.speed += ace;
//         cb && cb(this.speed);

//         break;
//     }
//   },
//   loop: function (cb) {
//     var ace = this.speeder.loop();
//     this.speed += ace;
//     cb && cb(this.speed);
//   },
// };

// // 公告
// jQuery('#hbans').slide({
//   mainCell: '.bd ul',
//   autoPlay: true,
//   effect: 'topMarquee',
//   vis: 5,
//   interTime: 50,
// });

/* @warning: 本页所有内容，后端同学不需要修改，谢谢~ */
// preinstall the code
$(function () {
  var queryTest = window.location.href;
  if (queryTest.indexOf('debug=jylie') > -1) new VConsole();
  jtool.tip.screen();
  jtool.elementCopy();
  jtool.pop.picker();
  jtool.pop.btnAuth('.jy-pop_input_cell-auth');
  // jtool.swiper('#psw');
  // jtool.menusCompat();
  // jtool.preload()
  // jtool.initMusic();
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

  /* game logic start */
  logic.extend({
    isGaming: false,
    timer: null,
    time: { DEFAULT: 20, current: 0, ready: 1 },
    score: { total: 0, current: 0 },
    tag: '',
    /* 游戏初始化 */
    gameReset: function () {
      var t = this;
      t.isGaming = true;
      t.score.current = 0;
      t.time.current = t.time.DEFAULT;
      t.setTime();
      t.changeTag(t.tag);
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
      });
      var role1, role2;
      if (t.tag == 'house') {
        role1 = '.ico-house-com';
        role2 = '.ico-house-role';
        t.role.DEFAULT = $('#track-house').width();
      } else {
        role1 = '.ico-swim-com';
        role2 = '.ico-swim-role';
        t.role.DEFAULT = $('#track-swim').width();
      }
      t.domFigureCom = new OffsetController($(role1), {
        speeder: {
          rate: SPEED_RATE,
          mode: false,
          timeover: t.time.DEFAULT,
        },
      });
      t.domFigureRole = new OffsetController($(role2), {
        mode: 'role',
        speeder: {
          rate: SPEED_RATE,
          mode: true,
          timeover: t.time.DEFAULT,
        },
      });
    },
    /* 循环事件各状态处理 */
    loopPlay: function () {
      var t = this;

      t.domProgressCom.move(function (width) {
        // console.log('domProgressCom', width);
        t.progress.com = +width;
        var translate3d = 'translate3d(' + width + 'px,0,0)';
        t.domProgressCom.el.css({
          webkitTransform: translate3d,
          mozTransform: translate3d,
          transform: translate3d,
        });
      });

      t.domFigureCom.move(function (width) {
        t.role.com = +width;
        var translate3d = 'translate3d(' + width + 'px,0,0)';
        t.domFigureCom.el.css({
          webkitTransform: translate3d,
          mozTransform: translate3d,
          transform: translate3d,
        });
      });

      logic.domProgressRole.loop(function (width) {
        logic.progress.role = +width;
        if (logic.progress.role >= logic.progress.DEFAULT) {
          logic.gameResult();
          return;
        }
        var translate3d = 'translate3d(' + width + 'px,0,0)';
        logic.domProgressRole.el.css({
          webkitTransform: translate3d,
          mozTransform: translate3d,
          transform: translate3d,
        });

        var progress = logic.progress,
          role = logic.role,
          width = (role.DEFAULT * progress.role) / progress.DEFAULT;
        var translate3d = 'translate3d(' + width + 'px,0,0)';
        logic.domFigureRole.el.css({
          webkitTransform: translate3d,
          mozTransform: translate3d,
          transform: translate3d,
        });

        logic.moveBG(-width);
      });
    },
    /* 循环事件 */
    loop: function () {
      var t = this;

      function run() {
        if (t.progress.com >= t.progress.DEFAULT || t.progress.role >= t.progress.DEFAULT || t.time.current == 0) {
          t.stop();

          return;
        }
        t.loopPlay();
        t.anFrame = requestAnimationFrame(function () {
          run();
        });
      }
      run();
    },
    /* 游戏倒计时 */
    setTime: function () {
      var t = this;
      var $gTime = $('#gTime'),
        time = t.time.current;
      $gTime.text(time + 'S');
    },
    /* 游戏定时器 */
    gameTimer: function () {
      var t = this;

      t.time.current--;
      this.timer = setTimeout(function () {
        t.setTime();

        if (t.time.current == 0) {
          t.stop();
          return;
        }

        t.gameTimer();
      }, 1000);
    },
    /* 停止循环 */
    stop: function () {
      var t = this;
      clearTimeout(t.timer);
      cancelAnimationFrame(t.anFrame);

      t.gameResult();
    },
    run: function () {
      var t = this;
      if (t.isGaming) {
        return true;
      }
      return false;
    },
    loadGame: function () {
      if (this.run()) {
        return;
      }

      var t = this,
        count = t.time.ready,
        $popReady = $('#J_gameReadyPop'),
        $count = $popReady.find('#gameReadyCount');
      // jtool.navTo('.section-2');
      $popReady.fadeIn();
      $count.text(count);

      var time = setInterval(function () {
        --count;
        if (count == -1) {
          clearInterval(time);
          return;
        } else if (count == 0) {
          $count.text('GO!');
          $popReady.fadeOut();
          setTimeout(function () {
            t.gameReset();
            t.gameTimer();
            t.loop();
          }, 100);
        } else {
          $count.text(count);
        }
      }, 1000);
    },
    changeState: function (tag) {
      if (tag == 'rank') {
        $('.jy-time').hide();
      } else {
        $('.jy-time').show();
      }
    },
    changeTag: function (tag) {
      var state = {
        house: {
          progress: { com: '华安', role: '官人' },
        },
        swim: {
          progress: { com: '石榴', role: '西施' },
        },
      };
      var tag = state[tag].progress,
        $time = $('.jy-time');
      $time.find('.i-progress-panel-xb .label').text(tag.com);
      $time.find('.i-progress-panel-gr .label').text(tag.role);
    },
    moveBG: function (width) {
      var cls = this.tag == 'house' ? '.bg-track' : '.bg-swim';
      $(cls).css({ 'background-position-x': width });
    },

    init: function () {
      this.$readyPop();
    },
  });
  logic.init();
  /* game logic end */
});
