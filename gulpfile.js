var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var purify = require('gulp-purifycss');
var gzip = require('gulp-gzip');
var gulpBrotli = require('gulp-brotli');
var zlib = require('zlib');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');
const closureCompiler = require('google-closure-compiler').gulp();
var concat = require('gulp-concat');
var plumber = require('gulp-plumber')


gulp.task('scripts', function() {
  return gulp.src('./dist/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist'));
});
 
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
      keep_classnames: true,
      mangle: {
        keep_classnames: true,
        keep_fnames: true,
        toplevel: true,
        safari10: true,
        reserved: [''],
      },
      toplevel: true,
      ie8: true,
      safari10: true,
      compress: {
        defaults: false,
        keep_classnames: true,
        pure_funcs: [ '' ],
        dead_code: true,
        unused: true,
        arrows: false,
        booleans: false,
        drop_console: true,
        ecma: 2020,
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


gulp.task('js-compile', function () {
  return gulp.src('./dist/*.js', {base: './'})
      .pipe(plumber())
      .pipe(closureCompiler({
          compilation_level: 'ADVANCED',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          output_wrapper: '(function(){\n%output%\n}).call(this)',
          js_output_file: 'output.min.js',
          ignoreFailingProcessing: true
        }, {
          platform: ['native', 'java', 'javascript']
        }))
      .pipe(gulp.dest('./dist'));
});


gulp.task('purgecss', () => {
  return gulp.src('./dist/*.css')
      .pipe(purgecss({
          content: ['./dist/*.html'],
          safelist: {
            standard: [/owl/, /ng-star/, /row/, /container/, /col/, /slideInUp/, /fadeIn/, /fadeInDown/],
            deep: [/owl/, /ng-star/, /row/, /container/, /col/, /slideInUp/, /fadeIn/, /fadeInDown/],
            greedy: [/owl/, /ng-star/, /row/, /container/, /col/, /slideInUp/, /fadeIn/, /fadeInDown/],
          }
      }))
      .pipe(gulp.dest('./dist'))
})

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
