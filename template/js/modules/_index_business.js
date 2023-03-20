/*
 * @Description: 工具函数
 * @version: 0.1.0
 * @Author: liejiayong(809206619@qq.com)
 * @Date: 2020-06-15 11:27:17
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2023-03-16 09:20:02
 * @FilePath: \tool-library\business-logic\template\js\modules\_index_business.js
 * @warning: 本页所有内容，后端同学不需要修改，谢谢~
 */
/* prettier-ignore */ var logic={extend:function(name,fn){var t=this;if(fn&&typeof fn=='function'){if(!t[fn]){return TypeError(JSON.stringify(fn)+'is existed')}else{t[name]=fn}}else if(Object.prototype.toString.call(name)==='[object Object]'){for(var key in name){t[key]=name[key]}}},$readyPop:function(){var $pop='<!-- pop game ready count --><div class="jy-pop " id="J_gameReadyPop"><div class="jy-pop_mask"></div><div class="jy-pop_ready"> <span id="gameReadyCount">3</span></div></div>';$pop=$($pop);$('body').append($pop)},};
var jtool = {
  imgPath: './img/', // 默认图片地址，后端请勿修改，需要修改请到index.html修改
  imgCrossPath: './img/', // 默认跨域图片地址，后端请勿修改，需要修改请到index.html修改
  mediaPath: './media/', // 默认媒体地址，后端请勿修改，需要修改请到index.html修改
  activeCls: 'active',
  disableCls: 'disable',  
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


      /* 后端须按需修改图片地址 */
      jtool.imgPath = './img/';
      /* 后端须按需修改跨域图片地址 */
      jtool.imgCrossPath = './img/';
      /* 后端须按需修改媒体地址 */
      jtool.mediaPath = './img/';
      jtool.preload.init(
        jtool.imgPath,
        [],
        function () {
          console.log('preload finish...');
          jtool.preload.close();
          // jtool.navTo('.section-1');
        },
        function (install) {
          var prsnum = install.processNum;
          $('#ploadingPro').html(prsnum + '%');
          console.log('preload process...', prsnum);
        }
      );

      /* 游戏结束逻辑 */
      logic.extend({
        // 游戏结束业务
        gameResult: function () {
          var self = logic,
            score = self.score;
          console.log("Game Result: ", JSON.stringify(logic));

          var flag = true;
          // game success
          if (flag) {
            jtool.showTip({
              content: '<div class="tc"><div>游戏success</div></div>',
            });
          }
          // game fail
          else {
            jtool.showTip({
              content: '<div class="tc"><div>游戏fail</div></div>',
            });
          }
        },
      });
