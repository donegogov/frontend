var gulp = require('gulp');
var closureCompiler = require('gulp-closure-compiler');

gulp.task('default', function() {
  return gulp.src('dist/*.js')
    .pipe(closureCompiler({
      compilerPath: './node_modules/gulp-closure-compiler/node_modules/google-closure-compiler/compiler.jar',
      fileName: 'build.js',
      maxBuffer: Infinity
    }))
    .pipe(gulp.dest('dist'));
});