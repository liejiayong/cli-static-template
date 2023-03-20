// 轮播图或滚动公告使用
var mySwiper = new Swiper('#rankls', {
  loop: true,
  autoplay: true,
  initialSlide: 0,
  direction: 'vertical',
  slidesPerView: 7,
  slidesPerGroup: 7,
  observer: true,
  observeParents: true,
  autoplay: {
    disableOnInteraction: false,
  },
});

function initSwiper() {
  setTimeout(function() {
    mySwiper.update();
  }, 100);
}
initSwiper();

/* 全部滚动业务逻辑 */
jtool = {
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
};

jtool.swiper('#psw');

