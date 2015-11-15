var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var open = require('gulp-open');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var scsslint = require('gulp-scss-lint');
var eslint = require('gulp-eslint');
var argv = require('yargs').argv;



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


// ----------------------------------------------------------------------------
// Styles - Sass compilation and minification
// ----------------------------------------------------------------------------
gulp.task('styles', function(){
  var processors = [
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano
  ];
  gulp.src(config.styles.srcDirectory + config.styles.srcFile)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(rename(config.styles.distFile))
    .pipe(gulp.dest(config.styles.distDirectory))
    .pipe(connect.reload());
  gutil.log(gutil.colors.grey('---------------------------------------'));
  gutil.log(gutil.colors.yellow('Reactor:'), gutil.colors.green('✓ Style compilation completed'));
  gutil.log(gutil.colors.grey('---------------------------------------'));
});


// ----------------------------------------------------------------------------
// Scripts - Module loading via browserify and minification
// ----------------------------------------------------------------------------
gulp.task('scripts', function() {
  gulp.src(config.scripts.srcDirectory + config.scripts.srcFile)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(browserify({ transform: 'reactify', debug: true }))
    .pipe(concat(config.scripts.distFile))
    // .pipe(uglify())
    .pipe(gulp.dest(config.scripts.distDirectory))
    .pipe(connect.reload());
  gutil.log(gutil.colors.grey('---------------------------------------'));
  gutil.log(gutil.colors.yellow('Reactor:'), gutil.colors.green('✓ Script compilation completed'));
  gutil.log(gutil.colors.grey('---------------------------------------'));
});

// ----------------------------------------------------------------------------
// Markup - Copies the only html file from source to build folder
// ----------------------------------------------------------------------------
gulp.task('copy', function(){
  gulp.src('source/**/*.html')
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});


// ----------------------------------------------------------------------------
// JS Lint - Enforcing coding practices
// ----------------------------------------------------------------------------
gulp.task('jslint', function () {
  gulp.src(['source/js/**/*.*', 'gulpfile.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(connect.reload());
  gutil.log(gutil.colors.grey('---------------------------------------'));
  gutil.log(gutil.colors.yellow('Reactor:'), gutil.colors.green('✓ JS lint complete'));
  gutil.log(gutil.colors.grey('---------------------------------------'));
});


// ----------------------------------------------------------------------------
// SCSS Lint - Enforcing coding practices
// ----------------------------------------------------------------------------
gulp.task('scsslint', function () {
  gulp.src('source/scss/**/*.scss')
    .pipe(scsslint({'config': '.sass-lint.yml'}));
  gutil.log(gutil.colors.grey('---------------------------------------'));
  gutil.log(gutil.colors.yellow('Reactor:'), gutil.colors.green('✓ SCSS lint complete'));
  gutil.log(gutil.colors.grey('---------------------------------------'));
});


// ----------------------------------------------------------------------------
// Server - Start a server for development
// ----------------------------------------------------------------------------
gulp.task('server', function() {
  connect.server({
    root: 'build',
    port: 9000,
    livereload: true
  });
});


// ----------------------------------------------------------------------------
// Open - Open the site in the browser [--open]
// ----------------------------------------------------------------------------
gulp.task('open', function(){
  var options = {
    uri: 'http://localhost:9000',
    app: 'Google Chrome'
  };
  gulp.src('')
  .pipe(gulpif(argv.open, open(options)));
});


// ----------------------------------------------------------------------------
// Watch - Watches files for changes and triggers tasks
// ----------------------------------------------------------------------------
gulp.task('watch', function() {
  gulp.watch(config.styles.srcDirectory + '**/*.*', ['styles']);
  gulp.watch([config.scripts.srcDirectory + '**/*.*', 'gulpfile.js'], ['scripts']);
  gulp.watch(config.markup.srcDirectory+'**/*.html', ['copy']);
  gutil.log(gutil.colors.grey('---------------------------------------'));
  gutil.log(gutil.colors.yellow('Reactor:'), gutil.colors.green('Watching for changes'));
  gutil.log(gutil.colors.grey('---------------------------------------'));
});


// ----------------------------------------------------------------------------
// Internal Tasks
// ----------------------------------------------------------------------------
gulp.task('lint', ['scsslint', 'jslint']);


// ----------------------------------------------------------------------------
// Main Gulp Task - `gulp go` accepts a `--open` flag to open in browser
// ----------------------------------------------------------------------------
gulp.task('go', ['lint', 'server', 'watch', 'open']);
