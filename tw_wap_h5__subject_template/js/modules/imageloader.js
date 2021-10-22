/*
 * @Description: canvas图片加载器
 * @version: 0.0.1
 * @Author: liejiayong(809206619@qq.com)
 * @Date: 2021-10-19 17:07:47
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2021-10-22 16:51:30
 * @FilePath: \tool-library\business-logic\tw_wap_h5__subject_template\js\modules\imageloader.js

  var imgLoader = new ImgLoader({
    scale: 1,
    baseURL: jtool.imgCrossPath,
    urls: [
      'bg2.jpg',
      'ico-role-name.png',
      'ico-role-avatar-1.png',
      'ico-role-avatar-2.png',
      'ico-role-avatar-3.png',
      'ico-role-avatar-4.png',
      'ico-role-avatar-5.png',
      'ico-role-avatar-6.png',
      'ico-role-avatar-7.png',
      'logo.png',
      'p2.png',
      'qr.png',
    ],
  });
  
 */

var isUndef = function isUndef(str) {
  return typeof str == 'undefined';
};
var ImgLoader = function (opts) {
  this.opts = opts || {};
  this.urls = opts.urls;
  this.maps = {};
  this.scale = opts.scale || 1;
  this.baseURL = opts.baseURL || '';
  this.ext = opts.ext ? '(' + opts.ext + ')' : '(jpg|jpeg|png|gif)';
  this.isAppend = isUndef(opts.isAppend) ? true : opts.isAppend;
  this.init();
};
ImgLoader.prototype.load = function (filename, success) {
  var t = this,
    baseURL = t.baseURL;
  var img = new Image(),
    url = baseURL + filename + '?t=' + Date.now(),
    fid = t.getName(filename);
  img.id = fid;
  img.src = url;
  img.setAttribute('crossOrigin', 'Anonymous');
  img.onload = function () {
    var name = fid,
      width = img.width * t.scale,
      height = img.height * t.scale;
    img.width = width;
    img.height = height;
    if (t.isAppend) {
      img.style.cssText = 'visibility: hidden; opacity:0; pointer-events: none; position: absolute;';
      document.body.appendChild(img);
    }
    success &&
      success({
        name: name,
        url: url,
        el: img,
        width: width,
        height: height,
        scale: t.scale,
      });
  };
  return this;
};
ImgLoader.prototype.init = function (urls) {
  urls = urls || this.urls;
  var t = this;
  var toString = Object.prototype.toString,
    isArray = toString.call(urls) === '[object Array]',
    isObj = toString.call(urls) === '[object Object]';
  this.urls = isArray ? urls : [url];
  if (isArray) {
    this.urls.forEach(function (filename) {
      t.load(filename, function (obj) {
        t.maps[obj.name] = obj;
      });
    });
  }
  return this;
};
ImgLoader.prototype.get = function (name) {
  return this.maps[name];
};
ImgLoader.prototype.toCamel = function (str) {
  return str.replace(/-(\w)/g, function (m, k) {
    return k ? k.toUpperCase() : '';
  });
};
/**
 * 获取文件名称
 * @param {String} url
 * @returns
 */
ImgLoader.prototype.getName = function (url) {
  var t = this;
  /* prettier-ignore */
  var pattern = new RegExp('[\\/]*([-\\.\\w]*)\\.' + t.ext + '$');
  var name = String(url).match(pattern);
  name = name ? name[1] : '';
  name = t.toCamel(name);
  return name;
};
