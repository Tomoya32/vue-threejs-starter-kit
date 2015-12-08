var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var nodemonCfg = require('../config').nodemon;

gulp.task('nodemon', function (cb) {
  
  var started = false;
  
  return nodemon( nodemonCfg ).on('start', function () {
    if (!started) {
      cb();
      started = true; 
    } 
  });
});