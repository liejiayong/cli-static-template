function SmoothSwing(el, range) {
  this.el = document.querySelector(el) || null;
  this.preX = 0;
  this.preY = 0;
  this.nextX = 0;
  this.nextY = 0;
  this.curX = 0;
  this.curY = 0;
  this.range = range;
}
SmoothSwing.prototype.setPosition = function (pos) {
  this.nextX = pos.x;
  this.nextY = pos.y;
  var curX,
    curY,
    range = this.range;
  curX = this.nextX - this.preX;
  curX = curX > 0 ? range[1] : range[0];
  curY = this.nextY - this.preY;
  curY = curY > 0 ? range[1] : range[0];
  this.curX = curX;
  this.curY = curY;
  this.preX = pos.x;
  this.preY = pos.y;
};
SmoothSwing.prototype.listen = function (cb) {
  var ever = document.body || document.documentElement,
    t = this;
  ever.addEventListener('mousemove', function (e) {
    t.setPosition({ x: e.clientX, y: e.clientY });
    var x = t.curX,
      y = t.curY;
    t.el.style.cssText =
      '-webkit-transition: all .2s;transition: all .2s;-webkit-transform:translate(' +
      x +
      'px, ' +
      y +
      'px)' +
      ';transform:translate(' +
      x +
      'px, ' +
      y +
      'px)';
    console.log();
  });
  this.ever = ever;
};
SmoothSwing.prototype.remove = function (cb) {
  this.ever.removeEventListener('mousemove', cb);
  this.ever = null;
};

// 使用前需要将元素设置固定定位
var smoothSwing = new SmoothSwing('.c-logo', [-10, 10]);
smoothSwing.listen();
