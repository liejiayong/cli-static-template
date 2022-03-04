var gulp = require('gulp');
var fontSpider = require('gulp-font-spider');

exports.initFont = async function initFont(enteryPath) {};

exports.genFont = async function genFont() {
  return gulp.src('../font/index.html').pipe(fontSpider());
};
