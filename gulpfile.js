/* 
  Fixed https://www.gulpjs.com.cn/docs/getting-started/async-completion/
  如果任务（task）不返回任何内容，则必须使用 callback 来指示任务已完成。不然会报错Did you forget to signal async completion? 
*/

const { series, task } = require('gulp');
const { cpFiles, concatFiles } = require('./script/gen');
const { initPcParams, initWapParams, runSp2pc, runSp2wap } = require('./script/sprite');
const { mkDir } = require('./script/fs');
const del = require('del');
const path = require('path');

// 设置环境变量
const NODE_ENV_MAP = {
  wap: 'wap',
  pc: 'pc',
};
const whitelist = ['_util_size'].concat(Object.values(NODE_ENV_MAP))

let NODE_ENV = '';
function SET_ENV(type) {
  NODE_ENV = process.env.NODE_ENV = type;
}
function setEnvWap(cb) {
  SET_ENV(NODE_ENV_MAP['wap']);
  cb();
}
function setEnvPc(cb) {
  SET_ENV(NODE_ENV_MAP['pc']);
  cb();
}
async function delFiles(...files) {
  return await del(files);
}

async function exceBefore(cb) {
  await initDir();
  await delFiles('./src');
  cb();
}
async function exceAfter(cb) {
  cb();
}
async function exceSpriteBefore(cb) {
  await delFiles('./spritesmith/.dist*');
  cb();
}
async function exceSpriteAfter(cb) {
  cb();
}

async function genScss(cb) {
  await cpFiles({
    inputPath: `./template/scss/!(${whitelist.join('|')})*.scss`,
    outputPath: './src/scss/',
    renameOpts: { prefix: '' },
    isAutoprefixer: false,
    isPxtorem: false,
    isSass: false,
  });
  await cpFiles({
    inputPath: `./template/scss/lib_${NODE_ENV}/**`,
    outputPath: `./src/scss/lib_${NODE_ENV}/`,
    renameOpts: { prefix: '' },
    isAutoprefixer: false,
    isPxtorem: false,
    isSass: false,
  });
  await cpFiles({
    inputPath: `./template/scss/${NODE_ENV}.scss`,
    outputPath: './src/scss/',
    renameOpts: { prefix: '' },
    isAutoprefixer: false,
    isPxtorem: false,
    isSass: false,
  });
  await concatFiles({
    files: ['./template/scss/complier/_util_size.scss'],
    toPath: './src/scss/',
    toName: '_util_size.scss',
    renameOpts: { basename: '_util_size' },
    isAutoprefixer: NODE_ENV === NODE_ENV_MAP['wap'],
    isPxtorem: NODE_ENV === NODE_ENV_MAP['wap'],
    isSass: false,
   });
  cb();
}

async function genHTML() {
  await cpFiles({
    inputPath: `./template/index-${NODE_ENV}*.html`,
    outputPath: './src/',
    renameOpts: { basename: 'index' },
    isAutoprefixer: false,
    isPxtorem: false,
    isSass: false,
  });
}

async function genMedia() {
  // const imgExp = NODE_ENV === NODE_ENV_MAP['pc'] ? '**' : '!(ico-dice*)*';
  const imgExp = '!(ico-dice*)*';
  await cpFiles({
    inputPath: `./template/img/${imgExp}`,
    outputPath: './src/img/',
    renameOpts: { prefix: '' },
    isAutoprefixer: false,
    isPxtorem: false,
    isSass: false,
  });
  await cpFiles({
    inputPath: './template/media/**',
    outputPath: './src/media/',
    renameOpts: { prefix: '' },
    isAutoprefixer: false,
    isPxtorem: false,
    isSass: false,
  });
}

async function genJS() {
  await cpFiles({
    inputPath: './template/js/**',
    outputPath: './src/js/',
    renameOpts: { prefix: '' },
    isAutoprefixer: false,
    isPxtorem: false,
    isSass: false,
  });
}

/* 生成雪碧图目录 */
async function initDir() {
  await mkDir('./spritesmith');
  await mkDir('./font');
}

/* 生成wap端模板 */
exports.wap = series(exceBefore, setEnvWap, genScss, genHTML, genMedia, genJS, exceAfter);
/* 生成pc端模板 */
exports.pc = series(exceBefore, setEnvPc, genScss, genHTML, genMedia, genJS, exceAfter);

async function concatSpriteFile(cb) {
  // scss
  concatFiles({
    files: ['spritesmith/.dist/**.scss'],
    toName: '_sprite.scss',
    toPath: './src/scss/',
    isAutoprefixer: true,
  });
  // img
  await cpFiles({
    inputPath: 'spritesmith/*.{png,jpeg,jpg,gif,webp}',
    outputPath: './src/img/',
    renameOpts: { prefix: '' },
    isAutoprefixer: false,
    isPxtorem: false,
    isSass: false,
  });
  await cpFiles({
    inputPath: 'spritesmith/.dist/**.png',
    outputPath: './src/img/',
    renameOpts: { prefix: '' },
    isAutoprefixer: false,
    isPxtorem: false,
    isSass: false,
  });
  cb();
}
/* 生成pc端雪碧图 */
exports.sprite2pc = series(
  exceSpriteBefore,
  async function (cb) {
    initPcParams({
      cssPath: `../img/`,
      cssExt: 'scss',
      spriteImgGutter: 60,
      outputPath: 'spritesmith/.dist/',
      outputImgExt: 'png',
      imgMatchExt: '{jpg,jpeg,png}',
      imgMatchIgnore: '{sp/}',
      imgBasePath: 'spritesmith/',
      imgOutputName: 'sprite.js',
      outputUniImgCssName: {
        prefix: 'ico',
        base: 'uni',
        suffix: '',
        symbol: '_',
      },
      outputSpImgCssName: {
        prefix: 'ico',
        base: 'sp',
        suffix: '',
        symbol: '_',
      },
    });
    cb();
  },
  runSp2pc(),
  concatSpriteFile,
  exceSpriteAfter
);
/* 生成wap端雪碧图 */
exports.sprite2wap = series(
  exceSpriteBefore,
  async function (cb) {
    initWapParams({
      cssPath: `../img/`,
      cssExt: 'scss',
      spriteImgGutter: 60,
      outputPath: 'spritesmith/.dist/',
      outputImgExt: 'png',
      imgMatchExt: '{jpg,jpeg,png}',
      imgMatchIgnore: '{sp/}',
      imgBasePath: 'spritesmith/',
      imgOutputName: 'sprite.js',
      outputUniImgCssName: {
        prefix: 'ico',
        base: 'uni',
        suffix: '',
        symbol: '_',
      },
      outputSpImgCssName: {
        prefix: 'ico',
        base: 'sp',
        suffix: '',
        symbol: '_',
      },
    });
    cb();
  },
  runSp2wap(),
  concatSpriteFile,
  exceSpriteAfter
);

exports.dir = series(async function (cb) {
  await initDir();
  cb();
});
