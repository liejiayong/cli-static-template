const fs = require('fs');
const path = require('path');
const { series, parallel, src, dest, task } = require('gulp');
const spritesmith = require('gulp.spritesmith');
const through2 = require('through2');
const { CONFIG_TERMINAL, getImg2CssWap, getImg2CssPC, getFileName } = require('./sprite-utils');

function mapConcat(from, to) {
  for (let key in from) {
    to[key] = from[key];
  }
}

function getOutputImgName(outputName, terminal) {
  if (!outputName || typeof outputName === 'string') {
    return `${outputName}_${terminal}`;
  }

  const { prefix, base, suffix, symbol } = outputName;
  return `${prefix}${symbol}${base}${symbol}${terminal}${symbol}${suffix}`;
}

// CONFIG_GETTER弃用，改用为getOutputImgName
const CONFIG_GETTER = {
    get outputUniImgName() {
      const outputName = CONFIG.outputUniImgCssName;
      if (!outputName || typeof outputName === 'string') {
        return `${outputName}_${this.terminal}`;
      }

      const { prefix, base, suffix, symbol } = outputName;
      return `${prefix}${symbol}${base}${symbol}${this.terminal}${symbol}${suffix}`;
    },
    get outputSpImgName() {
      const outputName = CONFIG.outputSpImgCssName;
      if (!outputName || typeof outputName === 'string') {
        return `${outputName}_${this.terminal}`;
      }

      const { prefix, base, suffix, symbol } = outputName;
      return `${prefix}${symbol}${base}${symbol}${this.terminal}${symbol}${suffix}`;
    },
  },
  CONFIG_OPTIONS = {
    cssPath: `../img/`, // 生成css图片的路径
    cssExt: 'scss' /* css输出格式 */,

    terminal: CONFIG_TERMINAL.pc, // 终端：pc or wap
    spriteImgGutter: 60, // 合并时两个图片的间距

    outputPath: 'spritesmith/.dist/',
    outputImgExt: 'png',

    imgMatchExt: '{jpg,jpeg,png}' /* 匹配图片格式 */,
    imgMatchIgnore: '{sp/}' /* img 生成文件名称列表时使用 */,
    imgBasePath: 'spritesmith/',
    imgOutputName: 'sprite.js',
    outputUniImgCssName: {
      prefix: '',
      base: '',
      suffix: '',
      symbol: '',
    },
    outputSpImgCssName: {
      prefix: '',
      base: '',
      suffix: '',
      symbol: '',
    },
  };
let CONFIG;

async function genSpriteImg2Css() {
  const isSprite = true,
    { imgBasePath, cssPath, terminal, cssExt, outputImgExt, spriteImgGutter } = CONFIG,
    rootPath = `${cssPath}`;

  const fileArr = fs.readdirSync(imgBasePath);

  for (let file of fileArr) {
    const cpath = path.join(imgBasePath, file, '/'),
      state = fs.statSync(cpath);

    if (state.isDirectory() && cpath.includes('sp')) {
      let outputName = getOutputImgName(CONFIG.outputSpImgCssName, terminal);
      outputName = `${outputName}${file}`;

      await src(`${cpath}*.${CONFIG.imgMatchExt}`)
        .pipe(
          spritesmith({
            cssName: `${outputName}.${cssExt}`,
            imgName: `${outputName}.${outputImgExt}`,
            padding: spriteImgGutter,
            algorithm: 'binary-tree', // 注释1
            cssTemplate: function (data) {
              // 移动端
              if (terminal == CONFIG_TERMINAL.wap) {
                return getImg2CssWap(data, rootPath, isSprite);
              }
              // PC端
              else if (terminal == CONFIG_TERMINAL.pc) {
                return getImg2CssPC(data, rootPath, isSprite);
              }
            },
          })
        )
        .pipe(dest(CONFIG.outputPath));
    }
  }
}

function genSingleImg2Css() {
  var isSprite = false,
    { imgBasePath, cssPath, imgMatchExt, terminal, outputUniImgName, cssExt, outputImgExt, spriteImgGutter } = CONFIG,
    rootPath = `${cssPath}`;
  return src(`${imgBasePath}*.${imgMatchExt}`)
    .pipe(
      spritesmith({
        cssName: `${outputUniImgName}.${cssExt}`,
        imgName: `${outputUniImgName}.${outputImgExt}`,
        padding: spriteImgGutter,
        algorithm: 'binary-tree', // 注释1
        cssTemplate: function (data) {
          // 移动端
          if (terminal == CONFIG_TERMINAL.wap) {
            return getImg2CssWap(data, rootPath, isSprite);
          }
          // PC端
          else if (terminal == CONFIG_TERMINAL.pc) {
            return getImg2CssPC(data, rootPath, isSprite);
          }
        },
      })
    )
    .pipe(
      through2.obj(function (file, enc, callback) {
        /* 过滤单图片雪碧图 */
        const filename = file.path;
        if (!new RegExp(`.*_uni_.*\\.${outputImgExt}`, 'g').test(filename)) {
          this.push(file);
        }
        callback();
      })
    )
    .pipe(dest(CONFIG.outputPath));
}

function spritejs() {
  return src(`${CONFIG.imgBasePath}*.${CONFIG.imgMatchExt}`)
    .pipe(
      getFileName({
        currentDirPath: CONFIG.imgBasePath,
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
