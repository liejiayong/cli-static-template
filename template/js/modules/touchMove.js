const jtool = {
  /* 
  touchMove 设置阻止指定原素页面默认滚动效果

  // test touchMove
  jtool.touchMove.addListener('.section-1')
  // jtool.touchMove.addListener('.section-2')
  setTimeout(() => {
    jtool.touchMove.prevent('.section-1', function (e) {
      console.log('0000000000', e)
    })
  }, 3000);
  setTimeout(() => {
    jtool.touchMove.reset('.section-1', function (e) {
      console.log('111111111', e)
    })
  }, 6000);  
    */
  touchMove: {
    $doms: [],
    addListener: function (cls) {
      var dom = document.querySelector(cls);
      this.$doms.push({
        cls: cls,
        dom: dom,
        stat: false, // 不阻止
      });
    },
    has: function (cls) {
      var ret = null;
      this.$doms.forEach(function (dom, index) {
        if (dom.cls == cls) {
          ret = {
            stat: dom.stat,
            cls: dom.cls,
            dom: dom.dom,
            index: index,
          };
        } else {
          ret = false;
        }
      });
      return ret;
    },
    preventFn: function (e) {
      e.preventDefault();
    },
    prevent: function (cls) {
      var self = this,
        clsStat = this.has(cls);
      if (!clsStat) return;
      if (clsStat && clsStat.stat) return;
      self.$doms[clsStat.index].stat = true;
      // console.log('prevent', this.has(cls), clsStat.dom, self.preventFn)
      // clsStat.dom.addEventListener('touchmove', function (e) { self.preventFn(e, callback) }, {
      clsStat.dom.addEventListener('touchmove', self.preventFn, {
        passive: false,
      });
    },
    reset: function (cls) {
      var self = this,
        clsStat = this.has(cls);
      if (!clsStat) return;
      if (clsStat && !clsStat.stat) return;
      self.$doms[clsStat.index].stat = false;
      // console.log('reset', this.has(cls), clsStat.dom, self.preventFn)
      // clsStat.dom.removeEventListener('touchmove', function (e) { self.preventFn(e, callback) }, {
      clsStat.dom.removeEventListener('touchmove', self.preventFn, {
        passive: false,
      });
    },
  },
};
jtool.menusCompat();
