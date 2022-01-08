/* 
  Fixed https://www.gulpjs.com.cn/docs/getting-started/async-completion/
  如果任务（task）不返回任何内容，则必须使用 callback 来指示任务已完成。不然会报错Did you forget to signal async completion? 
*/

const { series } = require('gulp');
const { cpFiles, concatFiles } = require('./script/gen');
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

exports.wap = series(exceBefore, setEnvWap, genScss, genScssUtil, genHTML, genMedia, genJS, exceAfter);

exports.pc = series(exceBefore, setEnvPc, genScss, genScssUtil, genHTML, genMedia, genJS, exceAfter);

// exports.default = series(genScss, genHTML);
