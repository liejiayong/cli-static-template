/**
 * @description: 基于PtGame插件升级开发
 * @param {object} opt 配置
 * @return {object} install
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2023-03-20 10:44:53
    方法说明:
    startGame()	开始游戏
    resetGame()	重置游戏

    demo:
    var ptInstall = new PuzzlePlus({
      id: "#gamePT",
      imgSrc: ["./img/g2.jpg", "./img/g3.jpg"],
      width: 6.38,
      height: 7.5,
      level: 3,
      strick: true,
      zIndex: 200,
      onStep: function (step) {},
      onFinish: function () {
        JTool.window.reset();
        $(".jpopPT").fadeOut();
        $(".btn-get-pt").addClass("active");
        JTool.showToast({ message: "拼图成功" });
        
        // 拼图成功回调逻辑
      },
    });

    ptInstall.startGame()
    ptInstall.resetGame()
 */
function PuzzlePlus(opt) {
  this.isStop = false;
  this.stepCount = 0;
  this.bkPArr = [];
  this.id = opt.id; // id或class
  this.imgSrc = Object.prototype.toString.call(opt.imgSrc) === "[object Array]" ? opt.imgSrc : [opt.imgSrc]; // 图片地址
  this.width = opt.width; //图片/容器宽度（这里的单位为rem）
  this.height = opt.height; //图片/容器宽度（这里的单位为rem）
  this.level = opt.level || 2; //分成几份
  this.onStep = opt.onStep || function () {}; // 每步回调
  this.onFinish = opt.onFinish || function () {}; // 成功回调
  this.strick = typeof opt.strick === "boolean" ? opt.strick : false; /* true为开启严格模式，只能相邻元素互换 */
  this.zIndex = typeof opt.zIndex === "number" ? opt.zIndex : 200;

  this.init();
  this._on_();
}
PuzzlePlus.prototype = {
  constructor: PuzzlePlus,
  init: function () {
    //生成游戏开始
    var $id = $(this.id),
      bw = this.width / this.level,
      bh = this.height / this.level,
      sort = 0,
      square,
      imgSrc = this.imgSrc[this.getRandom(0, this.imgSrc.length - 1)];

    $id.html("");
    for (var i = 0; i < this.level; i++) {
      for (var j = 0; j < this.level; j++) {
        (square = document.createElement("div")),
          (x = (-j * this.width) / this.level),
          (y = (-i * this.height) / this.level);
        $(square).css({
          width: bw + "rem",
          height: bh + "rem",
          background: "url(" + imgSrc + ") no-repeat",
          backgroundSize: this.width + "rem" + " " + this.height + "rem",
          backgroundPosition: x + "rem " + y + "rem",
        });
        sort++;
        $(square).attr({
          sort: sort,
        });
        $id.append(square);
        this.bkPArr.push(x + "rem " + y + "rem");
      }
    }
    this.sort();
  },
  shuffle: function (arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
      var idx = Math.floor(Math.random() * (len - i));
      var temp = arr[idx];
      arr[idx] = arr[len - i - 1];
      arr[len - i - 1] = temp;
    }
    return arr;
  },
  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  sort: function () {
    var _this = this,
      pieceArr = $(_this.id).find("div[sort]"),
      level = _this.level,
      arr = [];
    for (var i = 0; i < pieceArr.length; i++) {
      arr[i] = i + 1;
    }
    this.shuffle(arr);
    //arr.sort(function(){ return  0.5 - Math.random() });

    $(arr).each(function (i) {
      var pos = _this.bkPArr[parseInt(arr[i]) - 1];
      $(pieceArr[i]).css("backgroundPosition", pos);
      $(pieceArr[i]).attr("sort", arr[i]);
    });
  },
  _on_: function () {
    var _this = this,
      pageLeft = 0,
      pageTop = 0,
      thisE = null,
      getStartX = 0,
      getStartY = 0,
      elStartX = 0,
      elStartY = 0,
      floatLayer = "",
      getSort = "",
      getBkP = "",
      direction = "",
      size = _this.width / _this.level,
      sizeHeight = _this.height / _this.level,
      target = $(_this.id);

    target.on("touchstart", function (e) {
      e.preventDefault();
      if (_this.isStop) {
        return;
      }
      if (floatLayer != "") {
        floatLayer.remove();
      }
      var getEvent = window.event || arguments.callee.caller.arguments[0];
      thisE = getEvent.target;
      if (getEvent.changedTouches && getEvent.changedTouches.length == 1) {
        var thisElement = getEvent.target;
        getSort = $(thisElement).attr("sort");
        getBkP = $(thisElement).css("backgroundPosition");
        getBkImg = $(thisElement).css("backgroundImage");
        floatLayer = $(document.createElement("div"))
          .attr({ sort: getSort })
          .css({
            backgroundSize: _this.width + "rem",
            backgroundPosition: getBkP,
            backgroundImage: getBkImg,
            zIndex: _this.zIndex,
            position: "fixed",
            width: size + "rem",
            height: sizeHeight + "rem",
          });
        getStartX = getEvent.changedTouches[0].clientX;
        getStartY = getEvent.changedTouches[0].clientY;
        curElClient = thisElement.getBoundingClientRect();
        pageLeft = curElClient.left;
        pageTop = curElClient.top;
        elStartX = pageLeft + 1;
        elStartY = pageTop + 1;
        floatLayer.css({ top: elStartY, left: elStartX });
        floatLayer.appendTo("body");
      }
      return true;
    });

    target.on("touchmove", function (e) {
      e.preventDefault();
      var getEvent = window.event || arguments.callee.caller.arguments[0];
      if (getEvent.changedTouches && getEvent.changedTouches.length == 1) {
        var getCurrentX = getEvent.changedTouches[0].clientX;
        var getCurrentY = getEvent.changedTouches[0].clientY;
      }
      if (floatLayer) {
        var _diffX = Math.abs(getCurrentX - getStartX),
          _diffY = Math.abs(getCurrentY - getStartY),
          width = floatLayer.width(),
          height = floatLayer.height(),
          absDiffX = _diffX - width > 0 ? _diffX - width : 0,
          absDiffY = _diffY - height > 0 ? _diffY - height : 0,
          curElClient = floatLayer.get(0).getBoundingClientRect(),
          getLayerX = curElClient.left,
          getLayerY = curElClient.top,
          top,
          left;

        if (_this.strick) {
          if (!direction && (_diffX > 20 || _diffY > 20)) {
            direction = _diffX > _diffY ? "horizontal" : "vertical";
          }

          if (direction === "horizontal") {
            top = getLayerY;
            left = getCurrentX - (getStartX - pageLeft);
            if (absDiffX > 0) {
              left = getCurrentX - getStartX > 0 ? elStartX + width : elStartX - width;
            }
          } else {
            top = getCurrentY - (getStartY - pageTop);
            if (absDiffY > 0) {
              top = getCurrentY - getStartY > 0 ? elStartY + height : elStartY - height;
            }
            left = getLayerX;
          }
        } else {
          top = getCurrentY - (getStartY - pageTop);
          left = getCurrentX - (getStartX - pageLeft);
        }

        floatLayer.css({ top: top, left: left });
      }
    });
    target.on("touchend", function (e) {
      e.preventDefault();
      var getEvent = window.event || arguments.callee.caller.arguments[0]; //获取触发事件的元素
      if (_this.isStop) {
        return;
      }
      if (floatLayer) {
        var getLayerX = floatLayer.offset().left;
        var getLayerY = floatLayer.offset().top;
        var layerValX = parseInt(getLayerX);
        var layerValY = parseInt(getLayerY);
        var layerCenterX = layerValX + floatLayer.width() / 2;
        var layerCenterY = layerValY + floatLayer.height() / 2;
        floatLayer.remove();
        direction = "";
        var piece = $(_this.id).find("div[sort]");
        for (var i = 0; i < piece.length; i++) {
          var getPieceX = $(piece[i]).offset().left;
          var getPieceY = $(piece[i]).offset().top;
          var pieceValX = parseInt(getPieceX);
          var pieceValY = parseInt(getPieceY);
          var pieceEndX = pieceValX + $(thisE).width();
          var pieceEndY = pieceValY + $(thisE).height();
          if (
            pieceValX < layerCenterX &&
            pieceValY < layerCenterY &&
            pieceEndX > layerCenterX &&
            pieceEndY > layerCenterY
          ) {
            var getEndSort = $(piece[i]).attr("sort");
            var getEndBkP = $(piece[i]).css("backgroundPosition");
            if (getEndSort != getSort) {
              _this.stepCount++;
              $(thisE).attr("sort", getEndSort).css("backgroundPosition", getEndBkP);
              $(piece[i]).attr("sort", getSort).css("backgroundPosition", getBkP);
              _this.onStep(_this.stepCount);
            }
          }
        }
        for (var i = 0; i < piece.length; i++) {
          var getSortVal = parseInt($(piece[i]).attr("sort"));
          var number = i + 1;
          if (getSortVal == number) {
            continue;
          } else {
            return;
          }
        }
        _this.isStop = true;
        _this.onFinish(_this.stepCount);
      } else {
        console.log("floatLayer no");
        return;
      }
    });
  },
  startGame: function (callback) {
    this.isStop = false;
    this.stepCount = 0;
    this.bkPArr = [];
    this.init();
    callback && callback();
  },
  resetGame: function () {
    this.sort();
    this.isStop = true;
  },
};
