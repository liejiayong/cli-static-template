const { series, parallel, src, dest, task } = require('gulp');
const spritesmith = require('gulp.spritesmith');
const through2 = require('through2');
const { CONFIG_TERMINAL, getImg2CssWap, getImg2CssPC, getFileName } = require('./sprite-utils');

function mapConcat(from, to) {
  for (let key in from) {
    to[key] = from[key];
  }
}
// gulp雪碧图插件：根据图片导出图路径
const CONFIG_GETTER = {
    // 保存合并后对于css样式的地址
    get cssSpName() {
      return `css_sp-${this.terminal}.${this.cssExt}`;
    },
    get cssSingleName() {
      return `css-${this.terminal}.${this.cssExt}`;
    },
    // 保存合并后图片的地址
    get imgSpName() {
      return `ico_sp_${this.terminal}.png`;
    },
    get imgSingleName() {
      return `ico_single_${this.terminal}.png`;
    },
    get pathImgSp() {
      return `${this.imgRootPath}sp/`;
    },
    get pathImgSingle() {
      return `${this.imgRootPath}/`;
    },
  },
  CONFIG_OPTIONS = {
    cssPath: `../img/`, // 生成css图片的路径
    // terminal: CONFIG_TERMINAL.pc, // pc or wap
    spriteImgGutter: 60, // 合并时两个图片的间距
    outputPath: 'spritesmith/.dist/',
    imgMatchExt: '{jpg,jpeg,png}' /* 匹配图片格式 */,
    imgMatchIgnore: '{sp/}' /* img 生成文件名称列表时使用 */,
    imgRootPath: 'spritesmith/',
    imgOutputName: 'sprite.js',
    cssExt: 'scss' /* css输出格式 */,
  };
let CONFIG;

function genSpriteImg2Css() {
  var isSprite = true,
    path = `${CONFIG.cssPath}`;
  return src(`${CONFIG.pathImgSp}*.${CONFIG.imgMatchExt}`)
    .pipe(
      spritesmith({
        cssName: CONFIG.cssSpName,
        imgName: CONFIG.imgSpName,
        padding: CONFIG.spriteImgGutter,
        algorithm: 'binary-tree', // 注释1
        cssTemplate: function (data) {
          // 移动端
          if (CONFIG.terminal == CONFIG_TERMINAL.wap) {
            return getImg2CssWap(data, path, isSprite);
          }
          // PC端
          else if (CONFIG.terminal == CONFIG_TERMINAL.pc) {
            return getImg2CssPC(data, path, isSprite);
          }
        },
      })
    )
    .pipe(dest(CONFIG.outputPath));
}

function genSingleImg2Css() {
  var isSprite = false,
    path = `${CONFIG.cssPath}`;
  return src(`${CONFIG.pathImgSingle}*.${CONFIG.imgMatchExt}`)
    .pipe(
      spritesmith({
        cssName: CONFIG.cssSingleName,
        imgName: CONFIG.imgSingleName,
        padding: CONFIG.spriteImgGutter,
        algorithm: 'binary-tree', // 注释1
        cssTemplate: function (data) {
          // 移动端
          if (CONFIG.terminal == CONFIG_TERMINAL.wap) {
            return getImg2CssWap(data, path, isSprite);
          }
          // PC端
          else if (CONFIG.terminal == CONFIG_TERMINAL.pc) {
            return getImg2CssPC(data, path, isSprite);
          }
        },
      })
    )
    .pipe(
      through2.obj(function (file, enc, callback) {
        /* 过滤单图片雪碧图 */
        const filename = file.path;
        if (!/single/g.test(filename)) {
          this.push(file);
        }
        callback();
      })
    )
    .pipe(dest(CONFIG.outputPath));
}

function spritejs() {
  return src(`${CONFIG.imgRootPath}*.${CONFIG.imgMatchExt}`)
    .pipe(
      getFileName({
        currentDirPath: CONFIG.imgRootPath,
        extMatch: CONFIG.imgMatchExt,
        outputPath: CONFIG.imgOutputName,
        ignorePath: CONFIG.imgMatchIgnore,
      })
    )
    .pipe(dest(CONFIG.outputPath));
}

/* pc端生成雪碧图 */
exports.initPcParams = function initPcParams(opts = {}) {
  mapConcat({ ...opts, terminal: CONFIG_TERMINAL.pc }, CONFIG_GETTER);
  const description = Object.getOwnPropertyDescriptors(CONFIG_GETTER);
  CONFIG = Object.create(CONFIG_OPTIONS, description);
};
exports.runSp2pc = function () {
  return [genSpriteImg2Css, genSingleImg2Css, spritejs];
};

/* wap端生成雪碧图 */
exports.initWapParams = function initWapParams(opts = {}) {
  mapConcat({ ...opts, terminal: CONFIG_TERMINAL.wap }, CONFIG_GETTER);
  const description = Object.getOwnPropertyDescriptors(CONFIG_GETTER);
  CONFIG = Object.create(CONFIG_OPTIONS, description);
};
exports.runSp2wap = function () {
  return [genSpriteImg2Css, genSingleImg2Css, spritejs];
};
