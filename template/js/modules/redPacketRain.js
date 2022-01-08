/**
 * 红包雨专题
 */

/* 图片预加载器 */
var ImgLoader = function (opts) {
  this.urls = null;
  this.maps = {};
  this.scale = opts.scale || 1;
};
ImgLoader.prototype.load = function (url, success) {
  var t = this;
  var img = document.createElement('img');
  img.src = url;
  img.onload = function () {
    var name = t.getName(url),
      width = img.width * t.scale,
      height = img.height * t.scale;
    img.width = width;
    img.height = height;
    success &&
      success({
        name: name,
        url: url,
        el: img,
        width: width,
        height: height,
      });
  };
  return this;
};
ImgLoader.prototype.init = function (urls) {
  var t = this;
  var toString = Object.prototype.toString,
    is;
  (Array = toString.call(urls) === '[object Array]'), (isObj = toString.call(urls) === '[object Object]');
  this.urls = isArray ? urls : [url];
  if (isArray) {
    this.urls.forEach(function (url) {
      t.load(url, function (obj) {
        t.maps[obj.name] = obj;
      });
    });
  }
  return this;
};
ImgLoader.prototype.get = function (name) {
  return this.maps[name];
};
ImgLoader.prototype.getName = function (url) {
  var name = String(url).replace(/.*\/(.*)\.\w+$/g, '$1');
  return name;
};

/* 红包 */
var RedPacket = function (ctx, el, width, height, x, y) {
  this.ctx = ctx;
  this.el = el;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
};
RedPacket.prototype.move = function (x, y) {
  this.ctx.drawImage(this.el, this.x, this.y, this.width, this.height);
};
/* 红包控制器 */
var RPController = function (el) {
  this.el = document.querySelector(el);
  this.ctx = this.el.getContext('2d');
  this.rf = null;
  this.collect = [];
  this.play = false;
  this.speed = 0;
  this.gen = {
    current: 0,
    diff: 300,
  };
};
RPController.prototype.init = function () {
  var getPixelRatio = function (context) {
    var backingStore =
      context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1;
    return (window.devicePixelRatio || 1) / backingStore;
  };
  var t = this,
    canvas = t.el,
    context = t.ctx,
    ratio = getPixelRatio(context),
    winWidth = $(window).width(),
    winHeight = $(window).height();
  this.width = context.width = canvas.width = winWidth * ratio;
  this.height = context.height = canvas.height = winHeight * ratio;
  this.scale = context.scale = ratio;

  var imgLoader = new ImgLoader({ scale: ratio });
  imgLoader.load([jtool.imgCrossPath + 'ico-packet.png'], function (texture) {
    t.texture = texture;
  });
};
RPController.prototype.load = function (cb) {
  if (this.play) return;
  this.play = true;
  this.collect = [];
  cancelAnimationFrame(this.rf);

  cb && cb();
  this.loop();
};
RPController.prototype.loop = function () {
  var t = this;

  t.ctx.save();
  t.genSprite();
  t.ctx.clearRect(0, 0, t.width, t.height);
  t.move();
  t.rf = requestAnimationFrame(function () {
    t.loop();
  });
};
RPController.prototype.genSprite = function () {
  if (!this.play) return;
  var texture = this.texture,
    t = this,
    gen = t.gen,
    timestamp = Date.now();
  if (gen.diff + gen.current < timestamp) {
    gen.current = timestamp;
    var x = jtool.getRandom(0, this.width - texture.width),
      sprite = new RedPacket(this.ctx, texture.el, texture.width, texture.height, x, -texture.height);
    this.collect.push(sprite);
  }
};
RPController.prototype.move = function () {
  if (!this.play) return;
  var t = this;
  t.collect = t.collect.filter(function (sprite) {
    return sprite.alpha == 1 || !sprite.edge;
  });
  t.collect.forEach(function (sprite) {
    if (sprite.y >= t.height) {
      sprite.edge = true;
      return;
    }
    sprite.y += t.speed;
    sprite.move(sprite.x, sprite.y);
  });
};
RPController.prototype.watchSpeed = function (time) {
  var moveMap = RPController.moveMap,
    countMap = RPController.countMap,
    gen = this.gen;
  this.speed = moveMap[time] ? moveMap[time] : this.speed;
  gen.current = countMap[time] ? countMap[time] : gen.current;
};
RPController.prototype.stop = function () {
  this.play = false;
  cancelAnimationFrame(this.rf);
  this.ctx.clearRect(0, 0, this.width, this.height);
};
RPController.moveMap = {
  30: 1,
  28: 2,
  26: 3,
  24: 4,
  20: 6,
  18: 8,
  15: 10,
  10: 12,
  4: 13,
  2: 13,
  1: 13,
  0: 0,
};
RPController.countMap = {
  30: +120,
  28: +60,
  26: -40,
  24: -80,
  20: -100,
  18: -120,
  15: -140,
  10: +100,
  4: +20,
  2: +40,
  1: +60,
  0: 0,
};
