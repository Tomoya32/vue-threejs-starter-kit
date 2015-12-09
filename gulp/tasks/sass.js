var gulp       = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var glob       = require('glob');
var gulpif     = require('gulp-if');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var config     = require('../config').styles;

gulp.task('sass', function(){
    compile( config.options.dev );
});

gulp.task('sass:build', function(){
    compile( config.options.build );
});

function compile( options ) {

  gulp.src( config.src )
      .pipe(sass().on('error', sass.logError))
      .pipe(gulpif( options.concat, concat( options.concatTarget )) )
      .pipe(gulpif( options.minify, minifyCss({
        compatibility: config.compatibility
      })))
      .pipe(gulpif( options.minify, rename({
        suffix: '.min'
      })))
      .pipe(gulp.dest( config.dest ));
}
