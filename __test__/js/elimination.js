/**
 * @description: 消除类游戏
 * @author: liejiayong(809206619@qq.com)
 * @Date: 2022-01-15 11:58:49
 * @LastEditTime: 2022-01-14 11:01:12
 * @FilePath: \business-logic\template\js\index.js
 * @warning:
 */
class Elimination {
  constructor(element = null /* 挂载元素 */, options) {
    super();
    this.playing = false; /* 正在游戏标识 */
    this.selected = null; /* 已选卡片。Object */
    this.list = options.list || Elimination.options.list;
    this.namespaceClass = this._extend(options.namespaceClass, to.namespaceClass);
    this.$parent = document.querySelector(element);

    this.init();
  }
  init() {
    const { onBefore } = this.options;
    isFunction(onBefore) ? onBefore(this) : null;
  }
  start() {
    this.playing = true;

    /* 后期可考虑添加游戏倒计时 */
  }
  turn(cb) {
    if (!this.playing) return;
    if (!isFunction(cb)) {
      const err = new Error('the parameter of turn must be function');
      throw err;
    }
  }
  _extend(from, to) {
    const ret = {};
    for (let key in to) {
      if (from[key]) {
        ret[key] = from[key];
      } else {
        ret[key] = to[key];
      }
    }
    return ret;
  }
}
Elimination.options = Object.freeze({
  list: [] /* 卡片数据。Array<{string?:any}> */,
  namespaceClass: {
    container: 'elimination-container',
    wrapper: 'elimination-wrapper',
    item: 'elimination-item',
  } /* 类名空间 */,
  onBefore: () => {} /* 开始游戏前 */,
  onFinished: () => {} /* 开始游戏后 */,
});

function shuffle(arr) {
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = jyBus.getRandom(0, i);
    let n = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = n;
  }
  return _arr;
}

function isFunction(value) {
  var type = Object.prototype.toString.call(value);

  return type === '[object Function]';
}
