var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', ['browserSync:standalone', 'compile'], function(){
  gulp.watch(config.styles.src, ['sass']);
  gulp.watch(config.watch.files, ['compile']);
});
