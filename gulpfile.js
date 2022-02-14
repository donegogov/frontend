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
var gulpReplace = require('gulp-replace');
var del = require('del');


gulp.task('concat', function() {
  return gulp.src('./dist/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('compress-js-uglify', function () {
  return pipeline(
        gulp.src('./dist/bundle.min.js'),
        uglify({
          compress: {
            dead_code: true,
            global_defs: {
                DEBUG: false
            },
            unused: true,
            side_effects: true,
        }
        }),
        gulp.dest('./dist')
  );
});

gulp.task('compress-js-terser', async function () {
    gulp.src('./dist/bundle*.js*')
    .pipe(terser({
      keep_fnames: false,
      keep_classnames: false,
      mangle: {
        keep_classnames: false,
        keep_fnames: false,
        toplevel: true,
        safari10: true,
      },
      toplevel: true,
      ie8: true,
      safari10: true,
      compress: {
        defaults: true,
        keep_classnames: false,
        dead_code: true,
        unused: true,
        arrows: true,
        booleans: true,
        drop_console: true,
        ecma: 2020,
        keep_fargs: false,
        module: true,
        passes: 1,
        side_effects: true,
        toplevel: true,
        keep_fnames: false,
      }
    }))
    .pipe(gulp.dest('./dist'));
});


gulp.task('js-compile-closure', function () {
  return gulp.src('./dist/bundle.js', {base: './'})
      .pipe(closureCompiler({
          compilation_level: 'SIMPLE',
          warning_level: 'DEFAULT',
          language_in: 'ECMASCRIPT_2020',
          language_out: 'ECMASCRIPT_2021',
          output_wrapper: '(function(){\n%output%\n}).call(this)',
          js_output_file: 'bundle.min.js',
        }, {
          platform: ['native', 'java', 'javascript'],
          ignore_failing_processing: true,
          manage_closure_dependencies: true,
        }))
        .on('error', console.log)
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

gulp.task('replace-script-tags', function() {
return gulp.src('./dist/index.html', { base: './' })
        .pipe(gulpReplace('<script src="runtime.js" type="module">', '<script src="bundle.min.js" type="module"></script>'))
        .pipe(gulpReplace('</script><script src="polyfills.js" type="module"></script>', ''))
        .pipe(gulpReplace('<script src="scripts.js" defer></script>', ''))
        .pipe(gulpReplace('<script src="vendor.js" type="module"></script>', ''))
        .pipe(gulpReplace('<script src="main.js" type="module"></script>', ''))
        .pipe(gulp.dest('./'));
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

gulp.task('delete', async function() {
  del(['dist/vendor.js', 'dist/scripts.js', 'dist/runtime.js', 'dist/polyfills.js', 'dist/main.js', 'dist/bundle.js']);
});