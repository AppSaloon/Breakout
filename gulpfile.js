var gulp = require('gulp'),
			livereload = require('gulp-livereload');

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['js/**','index.html']).on('change', livereload.changed);
});