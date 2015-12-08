var gulp   = require('gulp');
var config = require('../config');

gulp.task('compile', ['styles:dev', 'browserify:dev']);

// gulp.task('watch', ['browserSync:standalone', 'compile', 'reload']);

gulp.task('server', ['browserSync:server', 'compile']);

// gulp.task('build', ['styles:build', 'browserify:build']);

// gulp.task('test', ['watch', 'browserify:dev']);

gulp.task('default', ['watch']);
