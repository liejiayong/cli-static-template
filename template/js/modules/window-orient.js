var jtool = {
  vid: document.querySelector("#vids"),
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
  detectWinOrient: function detectWinOrient(portraitCB, landscapeCB) {
    return function () {
      var storage = localStorage;
      var data = storage.getItem("J-recordOrientX");
      var cw = document.documentElement.clientWidth;
      var _Width = 0,
        _Height = 0;
      if (!data) {
        sw = window.screen.width;
        sh = window.screen.height;
        _Width = sw < sh ? sw : sh;
        _Height = sw >= sh ? sw : sh;
        storage.setItem("J-recordOrientX", _Width + "," + _Height);
      } else {
        var str = data.split(",");
        _Width = str[0];
        _Height = str[1];
      }
      if (cw == _Width) {
        portraitCB && portraitCB();
        return;
      }
      if (cw == _Height) {
        landscapeCB && landscapeCB();
        return;
      }
    };
  },
  detectWinOrientFn: function detectWinOrientFn() {
    jtool.detectWinOrient(
      function () {
        var myVideo = jtool.vid;
        var w = document.documentElement.clientWidth || document.body.clientWidth;
        var h = document.documentElement.clientHeight || document.body.clientHeigth;
        var cha = Math.abs(h - w) / 2;
        myVideo.style.width = h + "px";
        myVideo.style.height = w + "px";
        myVideo.style.top = 0;
        myVideo.style.transform = "translate(-" + cha + "px," + cha + "px) rotate(90deg)";
      },
      function () {
        var myVideo = jtool.vid;
        myVideo.style.width = "100%";
        myVideo.style.height = "100%";
        myVideo.style.transform = "translate(-" + 0 + "px," + 0 + "px) rotate(0deg)";
      }
    )();
  },
  detectWinOrientInvoke: function detectWinOrientInvoke() {
    window.onresize = jtool.debounce(jtool.detectWinOrientFn, 300);
    jtool.detectWinOrientFn();
  },
};

jtool.detectWinOrientInvoke();
