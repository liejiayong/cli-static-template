/* 
  Fixed https://www.gulpjs.com.cn/docs/getting-started/async-completion/
  如果任务（task）不返回任何内容，则必须使用 callback 来指示任务已完成。不然会报错Did you forget to signal async completion? 
*/

const { series } = require('gulp');
const { cpFiles, concatFiles } = require('./script/gen');
const { initPcParams, initWapParams, runSp2pc, runSp2wap } = require('./script/sprite');
const { mkDir } = require('./script/fs');
const del = require('del');

// 设置环境变量
const NODE_ENV_MAP = {
  wap: 'wap',
  pc: 'pc',
};
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
  await initSpriteDir();
  await delFiles('./src');
  cb();
}
async function exceAfter(cb) {
  cb();
}

async function genScss(cb) {
  await cpFiles({
    inputPath: `./template/scss/_!(_)*.scss`,
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
    inputPath: `./template/scss/index-${NODE_ENV}*.scss`,
    outputPath: './src/scss/',
    renameOpts: { prefix: '' },
    isAutoprefixer: false,
    isPxtorem: false,
    isSass: false,
  });
  cb();
}
function genScssUtil(cb) {
  concatFiles({
    files: ['./template/scss/__util.scss'],
    toName: '__util.scss',
    toPath: './src/scss/',
    isAutoprefixer: true,
    isPxtorem: NODE_ENV === NODE_ENV_MAP['wap'],
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
  const imgExp = NODE_ENV === NODE_ENV_MAP['pc'] ? '**' : '!(ico-dice*)*';
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
async function initSpriteDir() {
  await mkDir('spritesmith');
  await mkDir('spritesmith/sp');
}

/* 生成wap端模板 */
exports.wap = series(exceBefore, setEnvWap, genScss, genScssUtil, genHTML, genMedia, genJS, exceAfter);
/* 生成pc端模板 */
exports.pc = series(exceBefore, setEnvPc, genScss, genScssUtil, genHTML, genMedia, genJS, exceAfter);

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
  function (cb) {
    del('spritesmith/.dist*');
    initPcParams({
      spriteImgGutter: 60,
      outputPath: 'spritesmith/.dist/',
      imgMatchExt: '{jpg,jpeg,png}',
      imgMatchIgnore: '{sp/}',
      imgRootPath: 'spritesmith/',
      imgOutputName: 'sprite.js',
      cssExt: 'scss',
    });
    cb();
  },
  runSp2pc(),
  concatSpriteFile
);
/* 生成wap端雪碧图 */
exports.sprite2wap = series(
  function (cb) {
    del('spritesmith/.dist*');
    initWapParams({
      spriteImgGutter: 60,
      outputPath: 'spritesmith/.dist/',
      imgMatchExt: '{jpg,jpeg,png}',
      imgMatchIgnore: '{sp/}',
      imgRootPath: 'spritesmith/',
      imgOutputName: 'sprite.js',
      cssExt: 'scss',
    });
    cb();
  },
  runSp2wap(),
  concatSpriteFile
);

exports.dir = series(async function (cb) {
  await initSpriteDir();
  cb();
});
