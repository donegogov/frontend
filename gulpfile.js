var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var purify = require('gulp-purifycss');
var gzip = require('gulp-gzip');
var gulpBrotli = require('gulp-brotli');
var zlib = require('zlib');

 
gulp.task('compress-js', function () {
  return pipeline(
        gulp.src('./dist/*.js'),
        uglify(),
        gulp.dest('./dist')
  );
});

gulp.task('compress-css', function() {
  return gulp.src('./dist/*.css')
    .pipe(purify(['./dist/*.js', './dist/*.html']))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compress-gzip', async function() {
  gulp.src('./dist/*.*')
  .pipe(gzip())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('compress-brotli', async function() {
    gulp.src(`./dist/*.*`)
    .pipe(gulpBrotli.compress({
      extension: 'br',
      skipLarger: true,
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
      },
    }))
    .pipe(gulp.dest(`./dist/`))
});
