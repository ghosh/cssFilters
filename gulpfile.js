var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    willChange = require('postcss-will-change'),
    vmin = require('postcss-vmin'),
    mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano'),
    rename      = require('gulp-rename'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    browserSync = require('browser-sync'),
    gulpif = require('gulp-if'),
    scsslint = require('gulp-scss-lint'),
    scssLintStylish = require('gulp-scss-lint-stylish'),
    cache = require('gulp-cached'),

    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    reactify = require('reactify'),

    argv        = require('yargs').argv,
    reload      = browserSync.reload;



// ----------------------------------------------------------------------------
// Config - Paths to basic assets
// ----------------------------------------------------------------------------
var config = {

  styles: {
    srcDirectory: 'source/scss/',
    srcFile: 'inbox.scss',
    distDirectory: 'build/styles/',
    distFile: 'main.css'
  },

  scripts: {
    srcDirectory: 'source/js/',
    srcFile: 'inbox.js',
    distDirectory: 'build/scripts/',
    distFile: 'main.js'
  },

  images: {
    srcDirectory: 'source/images/',
    distDirectory: 'assets/images/'
  },

  markup: {
    srcDirectory: 'source/'
  }

};


gulp.task('styles', function() {
  var processors = [
    willChange(),
    vmin(),
    mqpacker(),
    autoprefixer({ browsers: ['last 2 versions'] })
  ];
  gulp.src(config.styles.srcDirectory + config.styles.srcFile)
    .pipe(plumber({
      errorHandler: notify.onError({ title: 'Error: Styles Task', message: '<%= error.message %>' })
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulpif(argv.build, postcss([cssnano()])))
    .pipe(rename(config.styles.distFile))
    .pipe(gulp.dest(config.styles.distDirectory))
    .pipe(reload({ stream:true }));
});


gulp.task('scripts', function () {
  var b = browserify({
    entries: './source/js/inbox.js',
    debug: true,
    transform: [reactify]
  });
  // b.external('react')
  // b.external('react-dom')

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpif(argv.build, uglify()))
    .on('error', notify.onError({ message: 'Error: <%= error.message %>'}))
        // .on('error', gutil.log)
    .pipe(sourcemaps.write(config.scripts.distDirectory))
    .pipe(rename(config.scripts.distFile))
    .pipe(gulp.dest(config.scripts.distDirectory))
    .pipe(reload({ stream:true }));
});


gulp.task('lint:styles', function() {
  return gulp.src('source/scss/**/*.scss')
    .pipe(cache('scsslint'))
    .pipe(scsslint({
      'config': '.scss-lint.yml',
      customReport: scssLintStylish
    }));
});


gulp.task('lint', ['lint:styles'])
gulp.task('compile', ['styles', 'scripts'])

gulp.task('go', ['compile', 'lint'],function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
    open: argv.open == 1 ? true : false
  });

  // gulp.watch('source/**/*.hbs', ['hbs']);
  // gulp.watch('source/assets/svg/**/*.svg', ['svg']);
  // gulp.watch('source/assets/images/*', ['images']);
  gulp.watch(config.scripts.srcDirectory + '*', ['scripts']);
  gulp.watch(config.styles.srcDirectory + '**/*.scss', ['styles', 'lint:styles']);
});
