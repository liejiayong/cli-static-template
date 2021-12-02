/* 倒计时 */
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
// 第一波2月11号
if (Date.now() < new Date(2021, 02, 11, 20, 00, 00)) {
  jcountdown.countDown(2021, 02, 11, 20, 00, 00);
}
