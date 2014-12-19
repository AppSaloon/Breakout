var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['js/**','css/**','index.html']).on('change', livereload.changed);
});

gulp.task('compress', function() {
  gulp.src(['./bower_components/jquery/dist/jquery.js','./js/crypto.js','./js/breakout.js','./js/game.js'])
  	.pipe(concat('breakout_game.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('dist'));
});