'use strict';

var gulp = require('gulp');
// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
var $ = require('gulp-load-plugins')();
// BrowserSync isn't a gulp package, and needs to be loaded manually
var browserSync = require('browser-sync');
// define a variable that BrowserSync uses in it's function
var bs;
// command for reloading webpages using BrowserSync
var reload = browserSync.reload;

gulp.task('start-metalsmith', function () {
  var started = false;

  return $.nodemon({
    script: 'index.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('start-browserSync',['start-metalsmith', 'styles:sass', 'scripts'], function () {
  bs = browserSync({
    notify: true,
    // tunnel: '',
    server: {
      baseDir: 'build'
    }
  });
});

// Compiles the SASS files and moves them into the 'build/stylesheets' directory
gulp.task('styles:sass', function () {
  return gulp.src('src/stylesheets/**/*.scss')
    .pipe($.sass({outputStyle: 'compressed'}))
    .pipe($.autoprefixer('last 1 version', { cascade: true }))
    .pipe(gulp.dest('build/stylesheets/'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', function() {
  return gulp.src(['src/javascripts/**/*.js'])
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe($.plumber())
    .pipe($.concat('app.js'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.uglify())
    .pipe(gulp.dest('build/javascripts'))
    .pipe(reload({stream: true}));
});


// Watch content and templates to rebuild on change
gulp.task('watch', function () {
  gulp.watch(['src/stylesheets/**/*.scss'], ['styles:sass', reload]);
  gulp.watch(['src/javascripts/**/*.js'], ['scripts', reload]);
  gulp.watch(['build/stylesheets/*.css', 'build/javascripts/**/*.js'], reload);
  gulp.watch(['build/**/*.html'], reload);
});

// Default task to start site and serve it
gulp.task('default', ['start-browserSync', 'styles:sass', 'scripts', 'watch']);
