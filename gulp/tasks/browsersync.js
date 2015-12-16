var gulp        = require('gulp');
var browserSync = require('browser-sync');
var notify      = require('gulp-notify');
var config      = require('../config').browserSync;
var util = require('gulp-util');
var server = ":";

gulp.task('browserSync', function() {

  console.log(util.env.server, util.env.server == undefined);
  server += util.env.server == undefined ? "standalone" : util.env.server;
  gulp.run("browserSync" + server );

});

gulp.task('browserSync:standalone', function() {
  return browserSync(config.standalone);
});

gulp.task('browserSync:api', ['nodemon'], function() {
  return browserSync(config.standalone);
});

gulp.task('browserSync:server', ['nodemon'], function() {
  return browserSync( config.server );
});
