var logic = {
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
    /* 未压缩版 */
    window.setTimeout(function () {
      console.log('audio delay', delay);
      function curring(fn) {
        var slice = [].slice,
          arg = slice.call(arguments, 1);
        return function () {
          return fn.apply(arguments[0], arg);
        };
      }
      audio.load();
      btnAudio.on('click', function () {
        play();
      });
      $('document,body').one('click', curring(startPlay, 'andio awake by document,body click'));
      audio.addEventListener('abort', curring(changeStatus, false, 'abort'));
      audio.addEventListener('error', curring(changeStatus, false, 'error'));
      audio.addEventListener('pause', curring(changeStatus, false, 'pause'));
      audio.addEventListener('play', curring(changeStatus, true, 'play'));
      audio.addEventListener('canplay', curring(startPlay, 'andio canlpay'));
      audio.onloadedmetadata = function () {
        var duration = this.duration;
        console.log('audio loadedmetadata total durtion is ' + duration);
      };
      if (typeof WinxinJSBridge == 'object' && typeof WeixinJSBridge.invoke == 'function') {
        startPlay('wechat WeixinJSBridge is invoke');
      } else {
        if (document.addEventListener) {
          document.addEventListener(
            'WeixinJSBridgeReady',
            curring(startPlay, 'wechat WeixinJSBridgeReady by modernbrower'),
            false
          );
        } else {
          if (document.attachEvent) {
            document.attachEvent(
              'WeixinJSBridgeReady',
              curring(startPlay, 'wechat WeixinJSBridgeReady by iebrower'),
              false
            );
            document.attachEvent(
              'onWeixinJSBridgeReady',
              curring(startPlay, 'wechat onWeixinJSBridgeReady by iebrower'),
              false
            );
          }
        }
      }
    }, delay);
    /* 压缩版 */
    /* prettier-ignore */
    // eval(/* prettier-ignore */ function(p,a,c,k,e,r){/* prettier-ignore */e=function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'[2-9a-zA-C]'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('window.setTimeout(6(){k.l(\'3 d\',d);6 2(m){n e=[].e,o=e.call(p,1);q 6(){q m.apply(p[0],o)}}3.load();btnAudio.on(\'f\',6(){g()});$(\'4,r\').one(\'f\',2(7,\'s awake 9 4,r f\'));3.5(\'t\',2(a,8,\'t\'));3.5(\'u\',2(a,8,\'u\'));3.5(\'v\',2(a,8,\'v\'));3.5(\'g\',2(a,true,\'g\'));3.5(\'canplay\',2(7,\'s canlpay\'));3.onloadedmetadata=6(){n h=this.h;k.l(\'3 loadedmetadata total durtion w \'+h)};i(x WinxinJSBridge==\'object\'&&x y.z==\'6\'){7(\'b y w z\')}A{i(4.5){4.5(\'c\',2(7,\'b c 9 modernbrower\'),8)}A{i(4.j){4.j(\'c\',2(7,\'b c 9 B\'),8);4.j(\'C\',2(7,\'b C 9 B\'),8)}}}},d);',[],39,'||curring|audio|document|addEventListener|function|startPlay|false|by|changeStatus|wechat|WeixinJSBridgeReady|delay|slice|click|play|duration|if|attachEvent|console|log|fn|var|arg|arguments|return|body|andio|abort|error|pause|is|typeof|WeixinJSBridge|invoke|else|iebrower|onWeixinJSBridgeReady'.split('|'),0,{}));
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
};
