const { series, parallel, src, dest, task } = require('gulp');
const spritesmith = require('gulp.spritesmith');
const through2 = require('through2');
const { CONFIG_TERMINAL, getImg2CssWap, getImg2CssPC, getFileName } = require('./sprite-utils');

// gulp雪碧图插件：根据图片导出图路径
const cssPath = `../img/`; // 生成css图片的路径
const CONFIG_TMP = {
  terminal: CONFIG_TERMINAL.wap, // pc or wap
  spriteImgGutter: 60, // 合并时两个图片的间距
  outputPath: 'spritesmith/.dist/',
  imgMatchExt: '{jpg,jpeg,png}' /* 匹配图片格式 */,
  imgMatchIgnore: '{sp/}' /* img 生成文件名称列表时使用 */,
  imgRootPath: 'spritesmith/',
  imgOutputName: 'sprite.js',
  cssExt: 'scss' /* css输出格式 */,
  // 保存合并后对于css样式的地址
  get cssSpName() {
    return `${this.terminal}_css_sp.${this.cssExt}`;
  },
  get cssSingleName() {
    return `${this.terminal}_css.${this.cssExt}`;
  },
  // 保存合并后图片的地址
  get imgSpName() {
    return `${this.terminal}_ico.png`;
  },
  get imgSingleName() {
    return `${this.terminal}_ico_single.png`;
  },
  get pathImgSp() {
    return `${this.imgRootPath}sp/`;
  },
  get pathImgSingle() {
    return `${this.imgRootPath}/`;
  },
};
let CONFIG;

function genSpriteImg2Css() {
  var isSprite = true,
    path = `${cssPath}`;
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
    path = `${cssPath}`;
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

exports.sprite2pc = function (opts) {
  CONFIG = Object.assign({}, CONFIG_TMP, opts, { terminal: CONFIG_TERMINAL.pc });

  return [genSpriteImg2Css, genSingleImg2Css, spritejs];
};

exports.sprite2wap = function (opts) {
  CONFIG = Object.assign({}, CONFIG_TMP, opts, { terminal: CONFIG_TERMINAL.wap });

  return [genSpriteImg2Css, genSingleImg2Css, spritejs];
};
