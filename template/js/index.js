/*
 * @Description: 工具函数
 * @version: 0.1.0
 * @Author: liejiayong(809206619@qq.com)
 * @Date: 2020-06-15 11:27:17
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2022-12-28 17:48:41
 * @FilePath: \tool-library\business-logic\template\js\index.js
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
  language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  /**
   * 点击元素复制文本
   * @param {className} btnCopyCls
   */
  elementCopy: (function () {
    var $tip = $(
      '<div class="jy-copytips" style="display: none; padding:12px 20px; position: fixed; top: 30%; left: 50%; transform: translateX(-50%); background-color: rgb(0, 0, 0); color: rgb(255, 255, 255); font-size: 18px;box-shadow: rgb(0, 0, 0) 0px 0px 5px; white-space: nowrap; z-index: 2001;"></div>'
    );
    $("body").append($tip);
    window.$showTip = function (str) {
      $tip.text(str).fadeIn(500).fadeOut(1000);
    };
    return function (btnCopyCls) {
      btnCopyCls = btnCopyCls || ".jbtnpopcode";
      var clipboard = new ClipboardJS(btnCopyCls);
      clipboard.on("success", function () {
        window.$showTip("复制成功");
      });
      clipboard.on("error", function () {
        window.$showTip("您的浏览器不支持点击复制，请长按复制！");
      });
    };
  })(),
    /**
   * 弹窗展示
    jtool.showTip({
      content:
        '<div class="tl"><div>xxx领取成功</div></div>',
      title: '温馨提示',
      titlePad: 'span',
      titleId: '#popTipTit',
      contentId: '#popTipNorm',
      btnCloseId: '#popTipClose',
      btnOkId: '#popTipOk',
      btnOkText: '确认',
      showBtnClose: true,
      showBtnOk: true,
      showTitle: true
    });
   */
  showTip: function (opts) {
    var content = opts.content,
      tit = opts.title || '温馨提示',
      titPad = opts.titlePad || '.jy-pop_header__sym',
      titId = opts.titleId || '#popTipTit',
      contentId = opts.contentId || '#popTipNorm',
      btnCloseId = opts.btnCloseId || '#popTipClose',
      btnOkId = opts.btnOkId || '#popTipOk',
      btnOkText = opts.btnOkText || '确认',
      showBtnClose = typeof opts.showBtnClose === 'boolean' ? opts.showBtnClose : true,
      showBtnOk = typeof opts.showBtnOk === 'boolean' ? opts.showBtnOk : true,
      showTitle = typeof opts.showTitle === 'boolean' ? opts.showTitle : true;
    $tip = $('#J_tipPop');

    showBtnClose ? $(btnCloseId).show() : $(btnCloseId).hide();
    showBtnOk ? $(btnOkId).text(btnOkText).show() : $(btnOkId).hide();

    if (showTitle) {
      var titPadCache = titId + ' ' + titPad;
      if ($tip.find(titPadCache) && $tip.find(titPadCache).length) {
        $tip.find(titPadCache).html(tit);
      } else {
        $tip.find(titId).html(tit);
      }
    } else {
      $tip.find(titId).hide();
    }
    if (Object.prototype.toString.call(content) === '[object Array]') {
      content = content.join('');
    }

    $tip.find(contentId).html(content);
    $tip.fadeIn();
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
  /**
   * 跳转页面
   * @param {string} cls
   * @param {string} siblings
   */
  navTo: function (cls, siblings) {
    siblings = siblings || '.jy-section';
    $(cls).addClass(this.activeCls).siblings(siblings).removeClass(this.activeCls);
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
    var regExp = new RegExp('[?&#]{1}' + key + '=(.*?)([&/#]|$)');
    var value = window.location[type].match(regExp);
    return value && decodeURIComponent(value[1]);
  },
  pop: {
  /* 
    wap端区服选择器
    // select item
    $("#jyPopPicker").on("click", "li", function () {
      // 业务逻辑

      $(this).addClass(jtool.activeCls).siblings().removeClass(jtool.activeCls);
    });
    // wake up the custom selector
    $("#jyCallPicker").on("click", function () {
      // 业务逻辑

      $("#J_selectorPop").fadeIn();
    });
    // comfirm button
    $(".jy-pop_picker_btn--confirm").on("click", function () {
      // 业务逻辑

      $(this).parents(".jy-pop").fadeOut();
      $("#J_gamePop").hide();
    });
  */
    picker: function () {
      var $picker =
        '' +
        '<!-- pop selector  -->' +
        '<div style="z-index:201;" class="jy-pop " id="J_selectorPop">' +
        '<div div class="jy-pop_mask jy-pop_mask--clickable" ></div>' +
        '<div class="jy-pop_picker_main">' +
        ' <div class="jy-pop_picker_hd">' +
        '<a href="javascript:;" class="jy-pop_picker_btn jy-pop_picker_btn--cancel">取消</a>' +
        '<input placeholder="请输入关键字"/>' +
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
  preload: {
    /* 本版吧不预设 */
    init: function () {
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
    },
    open: function () {
      jtool.$window.winFixed();
      $('#pagePreload').fadeIn();
    },
    close: function () {
      jtool.$window.winReset();
      $('#pagePreload').fadeOut();
    },
  },

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
  createImage: function (path, cb) {
    var img = new Image();
    img.src = path;
    img.setAttribute('crossOrigin', 'Anonymous');
    img.onload = function () {
      cb && cb(img);
    };
    return img;
  },
};

/* @warning: 本页所有内容，后端同学不需要修改，谢谢~ */
// preinstall the code
$(function () {
  jtool.elementCopy();
  
  // var queryTest = window.location.href;
  // if (queryTest.indexOf('debug=jylie') > -1) new VConsole();
  // jtool.tip.screen();
  // jtool.pop.picker();
  // jtool.pop.btnAuth('.jy-pop_input_cell-auth');

  /* game logic start */
  logic.extend({
    score: { game: 0 },
    /* 游戏倒计时 */
    setTime: function () {
      var t = this;
      var $gTime = $('#gTime'),
        time = t.time.current;
      $gTime.text(time + 'S');
    },
    loadGame: function (opts) {
      var self = this,
        count = (opts && opts.count) || 3,
        onReady = (opts && opts.onReady) || function () {},
        $popReady = $('#J_gameReadyPop'),
        $count = $popReady.find('#gameReadyCount');
      $popReady.fadeIn();
      $count.text(count);
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
    init: function () {
      this.$readyPop();
    },
  });
  logic.init();
  /* game logic end */
});
