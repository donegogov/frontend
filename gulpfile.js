var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var purify = require('gulp-purifycss');
var gzip = require('gulp-gzip');
var gulpBrotli = require('gulp-brotli');
var zlib = require('zlib');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');

 
gulp.task('compress-js', function () {
  return pipeline(
        gulp.src('./dist/*.js'),
        uglify(),
        gulp.dest('./dist')
  );
});

gulp.task('compress-js-terser', async function () {
    gulp.src('./dist/*.js')
    .pipe(terser({
      keep_fnames: true,
      mangle: {
        keep_classnames: false,
        keep_fnames: /magic-menu/,
        toplevel: true,
        safari10: true
      },
      toplevel: true,
      ie8: true,
      safari10: true,
      compress: {
        defaults: true,
        dead_code: true, 
        unused: true,
        arrows: true,
        booleans: true,
        drop_console: true,
        ecma: 2015,
        keep_fargs: false,
        module: true,
        passes: 1,
        side_effects: true,
        toplevel: true,
      }
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compress-css', async function() {
    gulp.src('./dist/*.css')
    .pipe(purify(['./dist/*.js', './dist/*.html']))
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify-css', function() {
  return gulp.src('./dist/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('compress-gzip', async function() {
  gulp.src('./dist/*.*')
  .pipe(gzip())
  .pipe(gulp.dest('./dist'));
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
    .pipe(gulp.dest(`./dist`))
});
