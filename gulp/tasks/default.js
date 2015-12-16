var gulp   = require('gulp');

gulp.task('compile', ['sass', 'browserify']);

gulp.task('build', ['compile']);

gulp.task('dev', ['watch', 'browserSync', 'compile']);

gulp.task('default', ['dev']);
