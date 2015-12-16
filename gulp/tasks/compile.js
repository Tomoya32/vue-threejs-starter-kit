var gulp   = require('gulp');
var util = require('gulp-util');

gulp.task('compile', ['sass', 'browserify']);

gulp.task('compile:build', ['sass:build', 'browserify:build']);
