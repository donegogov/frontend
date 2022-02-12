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
    gulp.src('./dist/*.js', '!./dist/custom.js', '!./dist/assets/js/custom.js')
    .pipe(terser({
      keep_fnames: true,
      keep_classnames: /magic_menu/,
      mangle: {
        keep_classnames: /magic_menu/,
        keep_fnames: /magic_menu/,
        toplevel: true,
        safari10: true,
        reserved: ['magic_menu'],
      },
      toplevel: true,
      ie8: true,
      safari10: true,
      compress: {
        defaults: false,
        keep_classnames: /magic_menu/,
        pure_funcs: [ 'magic_menu' ],
        dead_code: true,
        unused: false,
        arrows: false,
        booleans: false,
        drop_console: true,
        ecma: 2015,
        keep_fargs: false,
        module: true,
        passes: 1,
        side_effects: true,
        toplevel: true,
        keep_fnames: true,
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
