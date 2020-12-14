"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const cleanCSS = require('gulp-clean-css');

sass.compiler = require("node-sass");

function makeCSS() {
  return gulp
    .src("./src/scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest("./www/css"));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./www/",
    },
  });
  gulp.watch("./src/scss/*.scss", makeCSS);
  gulp.watch("./www/").on("change", browserSync.reload);
}

module.exports.makeCSS = makeCSS;
module.exports.watch = watch;