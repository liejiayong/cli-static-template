jtool = {
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
};

// 菜单栏
$('#menuWrapper').on('click', 'a', function () {
  if (logic.isGaming) return;
  var tag = $(this).attr('data-tag');
  switch (tag) {
    case 'house':
      jtool.navTo('.section-2');
      break;

    case 'swim':
      jtool.navTo('.section-3');
      break;
    case 'rank':
      jtool.navTo('.section-4');
      break;

    default:
      jtool.navTo('.section-4');
      break;
  }
});
