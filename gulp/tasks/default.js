var gulp   = require('gulp');
var config = require('../config');

gulp.task('compile', ['sass', 'browserify:dev']);

gulp.task('server', ['browserSync:server', 'compile']);

gulp.task('default', ['watch']);
