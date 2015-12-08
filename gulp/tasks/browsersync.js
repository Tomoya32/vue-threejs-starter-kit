var gulp        = require('gulp');
var browserSync = require('browser-sync');
var notify      = require('gulp-notify');
var config      = require('../config').browserSync;

gulp.task('browserSync:standalone', function() {
  return browserSync(config.standalone);
});

gulp.task('browserSync:server', ['nodemon'], function() {
  return browserSync( config.server );
});

