const gulp = require('gulp');
const postcss = require('gulp-postcss');
const potcssPxtorem = require('postcss-pxtorem');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');

const processors = [
  potcssPxtorem({
    rootValue: 100,
    unitPrecision: 4,
    selectorBlackList: [],
    propList: ['*'],
    replace: true,
  }),
];
/**
 *
 * @param {object} opts
 * @returns
 */
exports.cpFiles = function (opts) {
  const {
    inputPath = '',
    outputPath = '',
    renameOpts = null /* { extname = '', prefix = '', suffix = '', basename='' } */,
    isSourceMap = false,
    isAutoprefixer = false,
    isPxtorem = false,
    isSass = false,
  } = opts;

  return gulp
    .src(`${inputPath}`)
    .pipe(gulpif(isSourceMap, sourcemaps.init()))
    .pipe(gulpif(isSass, sass().on('error', sass.logError)))
    .pipe(gulpif(isPxtorem, postcss(processors)))
    .pipe(gulpif(isAutoprefixer, autoprefixer()))
    .pipe(gulpif(!!renameOpts, rename(renameOpts)))
    .pipe(gulpif(isSourceMap, sourcemaps.write('.')))
    .pipe(gulp.dest(`${outputPath}`));
};

exports.concatFiles = function concatFiles(opts) {
  const { files, toName = '', toPath = '', isAutoprefixer = false, isPxtorem = false } = opts;

  return gulp
    .src(files)
    .pipe(gulpif(isPxtorem, postcss(processors)))
    .pipe(gulpif(isAutoprefixer, autoprefixer()))
    .pipe(concat(toName))
    .pipe(gulp.dest(toPath));
};
